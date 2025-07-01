import { Feather } from '@expo/vector-icons'; // optional for icons
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
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
  const [profileImage, setProfileImage] = useState(require('../../assets/images/placeholder.jpeg'));

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
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    Alert.alert('Success', 'Your profile has been updated!');
    router.replace('/screens/Profile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header} />

      {/* Profile Edit Card */}
      <View style={styles.card}>
        <TouchableOpacity onPress={handleImagePick}>
          <Image source={profileImage} style={styles.avatar} />
          <Text style={styles.changeText}>Change Photo</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Feather name="save" size={18} color="#fff" />
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
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
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 16,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#4f46e5',
  },
  changeText: {
    color: '#4f46e5',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default EditProfile;
