import { Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TutorCard from '../components/TutorCard';
import tutors from '../data';

const TutorListScreen = () => {
  const router = useRouter();
  const { search } = useLocalSearchParams();
  const query = search?.toLowerCase() || '';

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.subject.toLowerCase().includes(query) ||
      tutor.location.toLowerCase().includes(query)
  );

  const getSubjectIcon = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('chemistry')) return <MaterialCommunityIcons name="flask" size={28} color="#7C8BA5" />;
    if (lower.includes('math')) return <Feather name="activity" size={28} color="#7C8BA5" />;
    if (lower.includes('biology')) return <FontAwesome5 name="dna" size={28} color="#7C8BA5" />;
    if (lower.includes('physics')) return <Feather name="zap" size={28} color="#7C8BA5" />;
    if (lower.includes('english')) return <Feather name="book-open" size={28} color="#7C8BA5" />;
    return <Feather name="user" size={28} color="#7C8BA5" />;
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
        <MaterialIcons name="arrow-back" size={28} color="#4f46e5" />
      </TouchableOpacity>

      {/* Header Bar */}
      <View style={styles.header} />

      {/* Card-style Info Section */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconBox}>{getSubjectIcon(query)}</View>
          <View>
            <Text style={styles.title}>{filteredTutors.length}+ Tutors</Text>
            <Text style={styles.subtitle}>matching "{search}"</Text>
          </View>
        </View>

        {/* Tutor List */}
        <FlatList
          data={filteredTutors}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TutorCard tutor={item} />}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No tutors found.</Text>}
        />
      </View>
    </View>
  );
};

export default TutorListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
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
    padding: 20,
    borderRadius: 16,
    width: '90%',
    elevation: 5,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    backgroundColor: '#E4E8EF',
    padding: 12,
    borderRadius: 10,
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
