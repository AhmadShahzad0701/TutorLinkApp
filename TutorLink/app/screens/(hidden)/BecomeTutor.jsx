// screens/(hidden)/BecomeTutor.jsx
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../../lib/firebase';

export default function BecomeTutor() {
  const router = useRouter();

  // form state
  const [education, setEducation] = useState('');
  const [subjects, setSubjects] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [fee, setFee] = useState('');

  // fetch existing tutor data (if any)
  useEffect(() => {
    const loadData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, 'User', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const d = snap.data();
        setEducation(d.education ?? '');
        setSubjects(d.subjects ?? '');
        setLocation(d.location ?? '');
        setPhone(d.phone ?? '');
        setFee(d.fee ?? '');
      }
    };
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!education || !subjects || !location || !phone || !fee) {
      Alert.alert('Missing info', 'Fill in all fields before saving.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not signed in');

      await setDoc(
        doc(db, 'User', user.uid),
        {
          uid: user.uid,
          isTutor: true,         // <— flag that marks user as tutor
          education,
          subjects,
          location,
          phone,
          fee,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }          // keep any other existing fields
      );

      Alert.alert('Success', 'Tutor profile saved!');
      router.replace('/screens/(hidden)/HomePage');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not save tutor profile.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/screens/(hidden)/HomeScreen')}>
                <MaterialIcons name="arrow-back" size={28} color="#007acc" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.heading}>Become a Tutor</Text>
        </View>

        <View style={styles.card}>
          {/* Education / Experience */}
          <TextInput
            placeholder="Describe your education & experience"
            value={education}
            onChangeText={setEducation}
            multiline
            style={styles.descriptionInput}
          />

          {/* Phone */}
          <TextInput
            placeholder="Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />

          {/* Subjects Picker */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={subjects}
              onValueChange={setSubjects}
              style={styles.picker}
            >
              <Picker.Item label="Select Subject" value="" />
              <Picker.Item label="Math" value="Math" />
              <Picker.Item label="Physics" value="Physics" />
              <Picker.Item label="Chemistry" value="Chemistry" />
              <Picker.Item label="Biology" value="Biology" />
              <Picker.Item label="Language" value="Language" />
              <Picker.Item label="Philosophy" value="Philosophy" />
            </Picker>
          </View>

          {/* Location Picker */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={location}
              onValueChange={setLocation}
              style={styles.picker}
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

          {/* Fee input */}
          <View style={styles.inputWithIcon}>
            <Feather name="dollar-sign" size={20} color="#6b7280" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Fee per session"
              value={fee}
              onChangeText={setFee}
              keyboardType="numeric"
              style={{ flex: 1, fontSize: 16, color: '#111827' }}
            />
          </View>

          {/* Submit button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Feather name="check-circle" size={18} color="#fff" />
            <Text style={styles.saveText}>Save Tutor Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 10,
    zIndex: 1000,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    marginTop: 20,
  },
  header: {
    backgroundColor: '#007acc',
    paddingTop: 80,
    paddingBottom: 35,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: -20,
    width: '90%',
    padding: 25,
    borderRadius: 16,
    elevation: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#111827',
  },
  descriptionInput: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 120,
    fontSize: 16,
    color: '#111827',
  },
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
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#007acc',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    marginTop: 5,
  },
  saveText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});
