import { Feather, MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../../lib/firebase';

const TutorDataFetcherScreen = () => {
  const router = useRouter();
  const { tutorId } = useLocalSearchParams();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        if (!tutorId) {
          setLoading(false);
          return;
        }
        const ref = doc(db, 'User', tutorId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setTutor(snap.data());
        } else {
          setTutor(null);
        }
      } catch (e) {
        console.error('Fetch tutor error:', e);
        setTutor(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [tutorId]);

  const copyToClipboard = async (value) => {
    if (!value) return;
    await Clipboard.setStringAsync(value.toString());
    Alert.alert('Copied', `${value} copied to clipboard`);
  };

  const InfoRow = ({ icon, label, value, color, isCopyable }) => (
    <View style={styles.infoRow}>
      <Feather name={icon} size={18} color={color} style={styles.icon} />
      <View style={styles.infoBlock}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.copyRow}>
          <Text style={styles.info}>{value || 'N/A'}</Text>
          {isCopyable && value ? (
            <TouchableOpacity onPress={() => copyToClipboard(value)} style={styles.copyIcon}>
              <Feather name="copy" size={18} color="#4f46e5" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007acc" />
      </View>
    );
  }

  if (!tutor) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Tutor not found.</Text>
        <TouchableOpacity onPress={() => router.push('/screens/(hidden)/TutorListScreen')}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/screens/(hidden)/TutorListScreen')}
      >
        <MaterialIcons name="arrow-back" size={28} color="#007acc" />
      </TouchableOpacity>

      <View style={styles.headerContainer} />

      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              tutor.imageUrl
                ? { uri: tutor.imageUrl }
                : require('../../../assets/images/placeholder.jpeg')
            }
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name}>{tutor.name || 'Unnamed Tutor'}</Text>
        <Text style={styles.role}>Verified Tutor</Text>

        <View style={styles.divider} />

        <View style={styles.section}>
          <InfoRow icon="mail" label="Email" value={tutor.email} color="#6366F1" isCopyable />
          <InfoRow icon="phone" label="Phone" value={tutor.phone} color="#10B981" isCopyable />
          <InfoRow icon="book-open" label="Education" value={tutor.education} color="#F59E0B" />
          <InfoRow icon="layers" label="Subject" value={tutor.subjects} color="#EC4899" />
          <InfoRow icon="map-pin" label="Location" value={tutor.location} color="#3B82F6" />
          <InfoRow icon="dollar-sign" label="Fee" value={tutor.fee ? `Rs ${tutor.fee}/hr` : ''} color="#F43F5E" />
          <InfoRow icon="star" label="Rating" value={tutor.rating ? `${tutor.rating} ★` : 'Not rated yet'} color="#FACC15" />
        </View>
      </View>
    </ScrollView>
  );
};

export default TutorDataFetcherScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: '#f9fafb', alignItems: 'center', paddingBottom: 50, flexGrow: 1 },
  backButton: { position: 'absolute', top: 30, left: 10, zIndex: 1000, backgroundColor: '#fff', borderRadius: 20, padding: 5, marginTop: 20 },
  headerContainer: { backgroundColor: '#007acc', paddingTop: 80, paddingBottom: 45, paddingHorizontal: 15, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', width: '100%' },
  card: { backgroundColor: '#fff', marginTop: -20, padding: 25, borderRadius: 16, width: '90%', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 3 }, shadowRadius: 5 },
  avatarContainer: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#007acc', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  name: { fontSize: 24, fontWeight: '700', color: '#1f2937' },
  role: { fontSize: 16, color: '#6b7280', marginBottom: 10 },
  divider: { width: '100%', height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },
  section: { width: '100%' },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 },
  icon: { marginRight: 12, marginTop: 5 },
  infoBlock: { flex: 1 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151' },
  info: { fontSize: 16, color: '#4b5563', flexShrink: 1 },
  copyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  copyIcon: { padding: 4, backgroundColor: '#E5E7EB', borderRadius: 6, marginLeft: 8 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 18, color: '#ef4444', marginBottom: 10 },
  backLink: { color: '#3b82f6', fontSize: 16 },
});
