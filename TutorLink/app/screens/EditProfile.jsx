import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const EditProfile = () => {
  const router = useRouter();

  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [education, setEducation] = useState('');
  const [subjects, setSubjects] = useState('');
  const [fee, setFee] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Camera roll access is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name || !email || !phone || !education || !subjects || !location || !fee) {
      Alert.alert('Missing Info', 'Please fill all the fields.');
      return;
    }

    router.replace({
      pathname: '/screens/Profile',
      params: {
        name,
        email,
        phone,
        education,
        subjects,
        location,
        fee,
        image: profileImage,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header} />
        <View style={styles.card}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require('../../assets/images/placeholder.jpeg')
              }
              style={styles.avatar}
            />
            <Text style={styles.changeText}>Change Photo</Text>
          </TouchableOpacity>

          <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} />
          <TextInput
            placeholder="Describe your background, education, experience, etc."
            value={education}
            onChangeText={setEducation}
            style={styles.descriptionInput}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <View style={styles.pickerWrapper}>
            <Picker selectedValue={subjects} onValueChange={setSubjects} style={styles.picker}>
              <Picker.Item label="Select Subject" value="" />
              <Picker.Item label="Math" value="Math" />
              <Picker.Item label="Physics" value="Physics" />
              <Picker.Item label="Chemistry" value="Chemistry" />
              <Picker.Item label="Biology" value="Biology" />
              <Picker.Item label="Language" value="Language" />
              <Picker.Item label="Philosophy" value="Philosophy" />
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker selectedValue={location} onValueChange={setLocation} style={styles.picker}>
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

          <View style={styles.inputWithIcon}>
            <Feather name="dollar-sign" size={20} color="#6b7280" style={styles.inputIcon} />
            <TextInput
              placeholder="Fee"
              value={fee}
              onChangeText={setFee}
              style={styles.inputWithIconText}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Feather name="save" size={18} color="#fff" />
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { alignItems: 'center', paddingBottom: 40, backgroundColor: '#f9fafb' },
  header: {
    height: 120,
    width: '100%',
    backgroundColor: '#4f46e5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginTop: -70,
    padding: 25,
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#4f46e5',
    marginBottom: 10,
  },
  changeText: {
    color: '#4f46e5',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  descriptionInput: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  saveText: { color: '#fff', marginLeft: 8 },
  pickerWrapper: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    width: '100%',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
    width: '100%',
  },
  inputIcon: { marginRight: 10 },
  inputWithIconText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
});

export default EditProfile;
