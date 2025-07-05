import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TutorCard from '../../../components/TutorCard';
import tutors from '../../../data';

const TutorListScreen = () => {
  const router = useRouter();
  const { search, subject } = useLocalSearchParams();

  const querySearch = search?.toLowerCase() || '';
  const querySubject = subject?.toLowerCase() || '';

  const filteredTutors = tutors.filter((tutor) => {
    if (querySubject) {
      return tutor.subject.toLowerCase() === querySubject;
    } else if (querySearch) {
      return (
        tutor.subject.toLowerCase().includes(querySearch) ||
        tutor.location.toLowerCase().includes(querySearch)
      );
    } else {
      return true;
    }
  });

  const displayTitle = subject || search || 'All';

  const getSubjectIcon = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('chemistry')) return <MaterialCommunityIcons name="flask" size={28} color="#007acc" />;
    if (lower.includes('math')) return <Feather name="activity" size={28} color="#007acc" />;
    if (lower.includes('biology')) return <FontAwesome5 name="dna" size={28} color="#007acc" />;
    if (lower.includes('physics')) return <Feather name="zap" size={28} color="#007acc" />;
    if (lower.includes('english')) return <Feather name="book-open" size={28} color="#007acc" />;
    return <Feather name="users" size={28} color="#007acc" />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>{getSubjectIcon(displayTitle)}</View>
        <View>
          <Text style={styles.title}>{filteredTutors.length}+ Tutors</Text>
          <Text style={styles.subtitle}>matching "{displayTitle}"</Text>
        </View>
      </View>

      <FlatList
        data={filteredTutors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TutorCard tutor={item} />}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No tutors found.</Text>}
      />
    </View>
  );
};

export default TutorListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
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
