import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons'; // For the edit icon

const Profile = () => {
  const router = useRouter();

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+92 300 1234567',
    profileImage: require('../../assets/images/placeholder.jpeg'),
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header} />

      {/* Profile Card */}
      <View style={styles.card}>
        <Image source={user.profileImage} style={styles.avatar} />

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.info}>{user.email}</Text>
        <Text style={styles.info}>{user.phone}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('/screens/EditProfile')}
        >
          <Feather name="edit" size={18} color="#fff" />
          <Text style={styles.editText}>Edit Profile</Text>
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
    justifyContent: 'flex-start',
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
    marginTop: -60,
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 16,
    alignItems: 'center',
    width: '85%',
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
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#4f46e5',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  info: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Profile;
