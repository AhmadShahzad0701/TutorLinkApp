// screens/(hidden)/EditProfile.js
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { auth, db, storage } from "../../../lib/firebase";

const EditProfile = () => {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [subjects, setSubjects] = useState("");
  const [fee, setFee] = useState("");
  const [location, setLocation] = useState("");
  
  // Image states
  const [profileImage, setProfileImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Error", "Please log in again.");
          router.replace("/screens/auth/LoginScreen");
          return;
        }

        console.log("Fetching user data for:", user.uid);
        
        const docRef = doc(db, "User", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("User data loaded:", data);
          
          // Set form data
          setName(data.name || "");
          setEmail(data.email || user.email || "");
          setPhone(data.phone || "");
          setEducation(data.education || "");
          setSubjects(data.subjects || "");
          setFee(data.fee || "");
          setLocation(data.location || "");
          
          // Set image data
          const existingImage = data.profileImage || null;
          setProfileImage(existingImage);
          setExistingImageUrl(existingImage);
          
          console.log("Existing profile image:", existingImage);
        } else {
          console.log("No user document found, creating new profile");
          setEmail(user.email || "");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        Alert.alert("Error", "Failed to load profile data.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Request image picker permissions
  const requestPermissions = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied', 
            'Sorry, we need camera roll permissions to upload images!'
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };

  // Handle image selection
  const handleImagePick = async () => {
    if (uploading || loading) return;
    
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      console.log("Starting image selection...");
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      console.log("ImagePicker result:", result);

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        
        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (asset.fileSize && asset.fileSize > maxSize) {
          Alert.alert('File Too Large', 'Please select an image smaller than 10MB');
          return;
        }
        
        console.log("Image selected:", asset.uri);
        setProfileImage(asset.uri);
        setIsImageChanged(true);
      }
    } catch (error) {
      console.error("Image selection error:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (uri, userId) => {
    try {
      console.log("Starting image upload...", { uri, userId });
      
      // Clean and decode URI
      const cleanUri = decodeURI(uri);
      console.log("Clean URI:", cleanUri);
      
      // Fetch the image
      const response = await fetch(cleanUri);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      }
      
      // Convert to blob
      const blob = await response.blob();
      console.log("Blob created:", {
        size: blob.size,
        type: blob.type
      });
      
      // Validate blob
      if (blob.size === 0) {
        throw new Error('Image file is empty');
      }
      
      // Create storage reference
      const timestamp = Date.now();
      const fileName = `${userId}_${timestamp}.jpg`;
      const storageRef = ref(storage, `profileImages/${fileName}`);
      
      console.log("Storage reference:", storageRef.fullPath);
      
      // Upload metadata
      const metadata = {
        contentType: 'image/jpeg',
        customMetadata: {
          userId: userId,
          uploadedAt: new Date().toISOString(),
        }
      };
      
      // Upload the file
      console.log("Uploading to Firebase Storage...");
      const uploadResult = await uploadBytes(storageRef, blob, metadata);
      console.log("Upload successful:", uploadResult.metadata.fullPath);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL obtained:", downloadURL);
      
      return downloadURL;
      
    } catch (error) {
      console.error("Image upload failed:", error);
      
      // Handle specific Firebase errors
      let errorMessage = 'Failed to upload image. Please try again.';
      
      if (error.code === 'storage/unauthorized') {
        errorMessage = 'You don\'t have permission to upload images. Please check Firebase Storage rules.';
      } else if (error.code === 'storage/canceled') {
        errorMessage = 'Upload was canceled.';
      } else if (error.code === 'storage/unknown') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message.includes('fetch')) {
        errorMessage = 'Failed to read the selected image. Please try selecting a different image.';
      }
      
      Alert.alert('Upload Error', errorMessage);
      throw error;
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = [];
    
    if (!name.trim()) errors.push("Name is required");
    if (!phone.trim()) errors.push("Phone number is required");
    if (!education.trim()) errors.push("Description is required");
    if (!subjects) errors.push("Subject selection is required");
    if (!location) errors.push("Location selection is required");
    if (!fee.trim()) errors.push("Fee is required");
    
    // Validate phone number format (basic)
    if (phone && !/^[0-9+\-\s()]+$/.test(phone)) {
      errors.push("Please enter a valid phone number");
    }
    
    // Validate fee is numeric
    if (fee && isNaN(fee.replace(/[^\d]/g, ''))) {
      errors.push("Fee must be a number");
    }
    
    if (errors.length > 0) {
      Alert.alert("Validation Error", errors.join("\n"));
      return false;
    }
    
    return true;
  };

  // Save profile data
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "Please log in again.");
        router.replace("/screens/auth/LoginScreen");
        return;
      }

      console.log("Starting save process...");
      console.log("Image changed:", isImageChanged);
      console.log("Current image:", profileImage);

      let finalImageUrl = existingImageUrl;

      // Upload new image if changed
      if (isImageChanged && profileImage && profileImage.startsWith('file://')) {
        console.log("Uploading new image...");
        setUploading(true);
        
        try {
          finalImageUrl = await uploadImage(profileImage, user.uid);
          console.log("New image uploaded:", finalImageUrl);
          
          // Delete old image if it exists
          if (existingImageUrl && existingImageUrl !== finalImageUrl) {
            try {
              console.log("Attempting to delete old image...");
              // Extract path from URL if it's a Firebase URL
              if (existingImageUrl.includes('firebase')) {
                const url = new URL(existingImageUrl);
                const pathToDelete = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
                const oldImageRef = ref(storage, pathToDelete);
                await deleteObject(oldImageRef);
                console.log("Old image deleted successfully");
              }
            } catch (deleteError) {
              console.warn("Failed to delete old image:", deleteError);
              // Don't fail the entire operation if old image deletion fails
            }
          }
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          setUploading(false);
          setLoading(false);
          return;
        }
        
        setUploading(false);
      }

      console.log("Saving profile data to Firestore...");

      // Prepare user data
      const userData = {
        uid: user.uid,
        email: user.email,
        name: name.trim(),
        phone: phone.trim(),
        education: education.trim(),
        subjects: subjects,
        location: location,
        fee: fee.trim(),
        profileImage: finalImageUrl || "",
        isTutor: true,
        emailVerified: user.emailVerified,
        updatedAt: new Date().toISOString(),
      };

      // Add createdAt if this is a new document
      const docRef = doc(db, "User", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        userData.createdAt = new Date().toISOString();
      }

      // Save to Firestore
      await setDoc(docRef, userData, { merge: true });

      console.log("Profile saved successfully");
      
      // Reset states
      setIsImageChanged(false);
      setExistingImageUrl(finalImageUrl);
      
      Alert.alert(
        "Success", 
        "Profile updated successfully!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/screens/(hidden)/HomeScreen")
          }
        ]
      );
      
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert(
        "Error", 
        `Failed to save profile: ${error.message}`
      );
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  // Show loading screen during initial load
  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007acc" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/screens/(hidden)/HomeScreen")}
          disabled={loading || uploading}
        >
          <MaterialIcons name="arrow-back" size={28} color="#007acc" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Edit Profile</Text>
        </View>

        <View style={styles.card}>
          {/* Profile Image Section */}
          <TouchableOpacity onPress={handleImagePick} disabled={loading || uploading}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../../../assets/images/placeholder.jpeg")
                }
                style={styles.avatar}
                onError={(error) => {
                  console.log('Image load error:', error.nativeEvent.error);
                }}
              />
              {(uploading) && (
                <View style={styles.uploadingOverlay}>
                  <ActivityIndicator size="small" color="#007acc" />
                </View>
              )}
            </View>
            <Text style={styles.changeText}>
              {uploading ? "Uploading..." : "Change Photo"}
            </Text>
          </TouchableOpacity>

          {/* Form Fields */}
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            editable={!loading && !uploading}
          />
          
          <TextInput
            placeholder="Email (read-only)"
            value={email}
            editable={false}
            style={[styles.input, styles.disabledInput]}
          />
          
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
            editable={!loading && !uploading}
          />
          
          <TextInput
            placeholder="Describe your background, education, experience, etc."
            value={education}
            onChangeText={setEducation}
            style={styles.descriptionInput}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            editable={!loading && !uploading}
          />

          {/* Subject Picker */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={subjects}
              onValueChange={setSubjects}
              style={styles.picker}
              enabled={!loading && !uploading}
            >
              <Picker.Item label="Select Subject" value="" />
              <Picker.Item label="Math" value="Math" />
              <Picker.Item label="Physics" value="Physics" />
              <Picker.Item label="Chemistry" value="Chemistry" />
              <Picker.Item label="Biology" value="Biology" />
              <Picker.Item label="Language" value="Language" />
              <Picker.Item label="Philosophy" value="Philosophy" />
              <Picker.Item label="Computer" value="Computer" />
              <Picker.Item label="Islamic Studies" value="Islamic" />
              <Picker.Item label="History" value="History" />
              <Picker.Item label="Psychology" value="Psychology" />
              <Picker.Item label="Business" value="Business" />
            </Picker>
          </View>

          {/* Location Picker */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={location}
              onValueChange={setLocation}
              style={styles.picker}
              enabled={!loading && !uploading}
            >
              <Picker.Item label="Select Location" value="" />
              <Picker.Item label="Lahore" value="Lahore" />
              <Picker.Item label="Karachi" value="Karachi" />
              <Picker.Item label="Islamabad" value="Islamabad" />
              <Picker.Item label="Rawalpindi" value="Rawalpindi" />
              <Picker.Item label="Gujranwala" value="Gujranwala" />
              <Picker.Item label="Multan" value="Multan" />
              <Picker.Item label="Faisalabad" value="Faisalabad" />
              <Picker.Item label="Peshawar" value="Peshawar" />
              <Picker.Item label="Quetta" value="Quetta" />
            </Picker>
          </View>

          {/* Fee Input */}
          <View style={styles.inputWithIcon}>
            <Feather name="dollar-sign" size={20} color="#6b7280" style={styles.inputIcon} />
            <TextInput
              placeholder="Fee per hour (PKR)"
              value={fee}
              onChangeText={setFee}
              style={styles.inputWithIconText}
              keyboardType="numeric"
              editable={!loading && !uploading}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={[
              styles.saveButton, 
              (loading || uploading) && styles.saveButtonDisabled
            ]} 
            onPress={handleSave}
            disabled={loading || uploading}
          >
            {(loading || uploading) ? (
              <ActivityIndicator size={18} color="#fff" />
            ) : (
              <Feather name="save" size={18} color="#fff" />
            )}
            <Text style={styles.saveText}>
              {uploading ? "Uploading..." : loading ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    alignItems: "center",
    paddingBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 10,
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 10,
    zIndex: 1000,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    marginTop: 20,
  },
  headerContainer: {
    backgroundColor: "#007acc",
    paddingTop: 80,
    paddingBottom: 35,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    marginTop: -20,
    padding: 25,
    borderRadius: 16,
    width: "90%",
    alignItems: "center",
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#007acc",
    backgroundColor: "#f3f4f6",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 114,
    height: 114,
    borderRadius: 57,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeText: {
    color: "#007acc",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#111827",
  },
  disabledInput: {
    backgroundColor: "#e5e7eb",
    color: "#6b7280",
  },
  descriptionInput: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#111827",
  },
  pickerWrapper: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    height: 60,
    width: "100%",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
    width: "100%",
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIconText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#007acc",
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#6b7280",
  },
  saveText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 16,
  },
});