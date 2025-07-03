import { Feather, MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tutors from '../data';

const TutorDataFetcherScreen = () => {
  const router = useRouter();
  const { tutorName } = useLocalSearchParams();

  const tutor = tutors.find(t => t.name.toLowerCase() === tutorName.toLowerCase());

  if (!tutor) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Tutor not found.</Text>
        <TouchableOpacity onPress={() => router.push('/screens/TutorListScreen')}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
    Alert.alert('Copied', `${value} copied to clipboard`);
  };

  const InfoRow = ({ icon, label, value, color, isCopyable }) => (
    <View style={styles.infoRow}>
      <Feather name={icon} size={20} color={color} style={styles.icon} />
      <View style={styles.infoBlock}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.copyRow}>
          <Text style={styles.info}>{value}</Text>
          {isCopyable && (
            <TouchableOpacity onPress={() => copyToClipboard(value)} style={styles.copyIcon}>
              <Feather name="copy" size={20} color="#4f46e5" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={28} color="#4f46e5" />
      </TouchableOpacity>

      <View style={styles.header} />

      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: tutor.imageUrl }} style={styles.avatar} />
        </View>

        <Text style={styles.name}>{tutor.name}</Text>
        <Text style={styles.role}>Verified Tutor</Text>

        <View style={styles.divider} />

        <View style={styles.section}>
          <InfoRow icon="mail" label="Email" value={tutor.email} color="#6366F1" isCopyable />
          <InfoRow icon="phone" label="Phone" value={tutor.phone} color="#10B981" isCopyable />
          <InfoRow icon="book-open" label="Education" value={tutor.education} color="#F59E0B" />
          <InfoRow icon="layers" label="Subject" value={tutor.subject} color="#EC4899" />
          <InfoRow icon="map-pin" label="Location" value={tutor.location} color="#3B82F6" />
          <InfoRow icon="dollar-sign" label="Fee" value={`Rs ${tutor.price}/hr`} color="#F43F5E" />
          <InfoRow icon="star" label="Rating" value={`${tutor.rating} ★`} color="#FACC15" />
        </View>
      </View>
    </ScrollView>
  );
};

export default TutorDataFetcherScreen;

const styles = StyleSheet.create({

  header: {
    height: 140,
    width: '100%',
    backgroundColor: '#4f46e5',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: -80,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
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
  card: {
    backgroundColor: '#fff',
    marginTop: -30,
    padding: 25,
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
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
    flexShrink: 1,
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  copyIcon: {
    padding: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    marginBottom: 10,
  },
  backLink: {
    color: '#3b82f6',
    fontSize: 16,
  },
});
