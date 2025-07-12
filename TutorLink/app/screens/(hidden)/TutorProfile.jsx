import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../lib/firebase';

const TutorProfile = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'User', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log('User document not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        console.log('No user logged in');
      }
    });

    return unsubscribe;
  }, []);

  if (!userDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 18, color: '#6b7280' }}>Loading profile...</Text>
      </View>
    );
  }

  const {
    name = 'N/A',
    email = 'N/A',
    phone = 'N/A',
    education = 'N/A',
    subjects = 'N/A',
    location = 'N/A',
    fee = 'N/A',
    profileImage = '',
  } = userDetails;

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
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/screens/(hidden)/HomeScreen')}>
        <MaterialIcons name="arrow-back" size={28} color="#007acc" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Tutor Profile</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../../assets/images/placeholder.jpeg')
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

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('/screens/(hidden)/EditProfile')}
        >
          <Feather name="edit" size={18} color="#fff" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TutorProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    paddingBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
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
  headerContainer: {
    backgroundColor: '#007acc',
    paddingTop: 80,
    paddingBottom: 35,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: -20,
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
    borderColor: '#007acc',
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
    backgroundColor: '#007acc',
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
