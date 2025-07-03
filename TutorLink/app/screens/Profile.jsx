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
    <ScrollView contentContainerStyle={styles.container}>
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
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: 20,
  },
  header: {
    height: 140,
    width: '100%',
    backgroundColor: '#4f46e5',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  card: {
    backgroundColor: '#fff',
    marginTop: -80,
    padding: 30,
    borderRadius: 20,
    width: '88%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: '#4f46e5',
    marginBottom: 16,
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
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Profile;
