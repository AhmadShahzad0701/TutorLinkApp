import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../../lib/firebase';

const DeleteAccount = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'No user is currently logged in.');
      return;
    }

    if (!currentPassword) {
      Alert.alert('Error', 'Please enter your password to confirm.');
      return;
    }

    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);

              const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
              );
              await reauthenticateWithCredential(user, credential);

              await deleteDoc(doc(db, 'User', user.uid));

              await deleteUser(user);

              Alert.alert('Account Deleted', 'Your account has been permanently removed.');
              router.replace('/screens/(hidden)/SignUp');
            } catch (error) {
              console.error('Delete error:', error.message);
              Alert.alert('Error', error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace('/screens/(hidden)/HomeScreen')}
            >
              <MaterialIcons name="arrow-back" size={28} color="#fef2f2" />
            </TouchableOpacity>

      <MaterialIcons
        name="delete-forever"
        size={100}
        color="#EF4444"
        style={styles.icon}
      />
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.warning}>
        This will permanently delete your account and all related data.
      </Text>

      <TextInput
        placeholder="Enter your password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.deleteButton, loading && { opacity: 0.6 }]}
        onPress={handleDelete}
        disabled={loading}
      >
        <Text style={styles.deleteText}>
          {loading ? 'Deleting...' : 'Delete My Account'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
    backButton: {
    position: 'absolute',
    top: 25,
    left: 10,
    zIndex: 1000,
    backgroundColor: '#DC2626',
    borderRadius: 20,
    padding: 5,
    marginTop: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#991B1B',
    marginBottom: 10,
    textAlign: 'center',
  },
  warning: {
    fontSize: 16,
    color: '#7f1d1d',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
