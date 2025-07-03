// app/screens/TutorListScreen.js
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TutorCard from '../components/TutorCard';
import tutors from '../data';

const TutorListScreen = () => {
  const { subject } = useLocalSearchParams();

  const filteredTutors = tutors.filter(
    (tutor) => tutor.subject.toLowerCase() === subject.toLowerCase()
  );

  const getSubjectIcon = (subject) => {
    const lower = subject.toLowerCase();
    if (lower.includes('chemistry')) return <MaterialCommunityIcons name="flask" size={28} color="#7C8BA5" />;
    if (lower.includes('math')) return <Feather name="activity" size={28} color="#7C8BA5" />;
    if (lower.includes('biology')) return <FontAwesome5 name="dna" size={28} color="#7C8BA5" />;
    if (lower.includes('physics')) return <Feather name="zap" size={28} color="#7C8BA5" />;
    if (lower.includes('english')) return <Feather name="book-open" size={28} color="#7C8BA5" />;
    return <Feather name="user" size={28} color="#7C8BA5" />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {getSubjectIcon(subject)}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{filteredTutors.length}+ Tutors</Text>
          <Text style={styles.subTitle}>for {subject}</Text>
        </View>
      </View>

      <FlatList
        data={filteredTutors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TutorCard tutor={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TutorListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#7C8BA5',
    padding: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  subTitle: {
    fontSize: 14,
    color: 'white',
  },
});
