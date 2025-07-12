import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteUser } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../lib/firebase';

const DeleteAccount = () => {
  const router = useRouter();

  const handleDelete = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'No user is currently logged in.');
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
              await deleteDoc(doc(db, 'User', user.uid));
              await deleteUser(user);

              Alert.alert('Account Deleted', 'Your account has been permanently removed.');
              router.replace('/screens/(hidden)/SignUp');
            } catch (error) {
              console.error('Delete error:', error.message);
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="delete-forever" size={100} color="#EF4444" style={styles.icon} />
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.warning}>
        This will permanently delete your account and all related data.
      </Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete My Account</Text>
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
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#991B1B',
    marginBottom: 10,
  },
  warning: {
    fontSize: 16,
    color: '#7f1d1d',
    textAlign: 'center',
    marginBottom: 30,
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
