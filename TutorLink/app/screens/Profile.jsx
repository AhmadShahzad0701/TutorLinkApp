import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const router = useRouter();
  const {
    name,
    email,
    phone,
    education,
    subjects,
    location,
    fee,
    image,
  } = useLocalSearchParams();

  const decodedImage = image ? decodeURIComponent(image) : null;

  const InfoRow = ({ icon, label, value, color }) => (
    <View style={styles.infoRow}>
      <Feather name={icon} size={18} color={color} style={styles.icon} />
      <View style={styles.infoBlock}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.info}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Back to Home Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
        <MaterialIcons name="arrow-back" size={28} color="#4f46e5" />
      </TouchableOpacity>

      <View style={styles.header} />

      <View style={styles.card}>
        <Image
          source={
            decodedImage
              ? { uri: decodedImage }
              : require('../../assets/images/placeholder.jpeg')
          }
          style={styles.avatar}
        />

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>Professional Tutor</Text>

        <View style={styles.divider} />

        <View style={styles.section}>
          <InfoRow icon="mail" label="Email" value={email} color="#6366F1" />
          <InfoRow icon="phone" label="Phone" value={phone} color="#10B981" />
          <InfoRow icon="book-open" label="Description" value={education} color="#F59E0B" />
          <InfoRow icon="layers" label="Subjects" value={subjects} color="#EC4899" />
          <InfoRow icon="dollar-sign" label="Fee" value={fee} color="#F43F5E" />
          <InfoRow icon="map-pin" label="Location" value={location} color="#3B82F6" />
        </View>

        <TouchableOpacity style={styles.editButton} onPress={() => router.push('/screens/EditProfile')}>
          <Feather name="edit" size={18} color="#fff" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 999,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
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
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  role: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 15,
  },
  section: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  icon: {
    marginRight: 12,
    marginTop: 5,
  },
  infoBlock: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  info: {
    fontSize: 16,
    color: '#4b5563',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    marginTop: 30,
  },
  editText: {
    color: '#fff',
    marginLeft: 8,
  },
});

export default Profile;
