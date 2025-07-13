import { Feather, FontAwesome6, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TutorCard from '../../../components/TutorCard';
import tutors from '../../../data';

const HomeScreen = () => {
  const router = useRouter();

  const topRatedTutors = [...tutors]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 10);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.subHeading}>Welcome to Tutor Link</Text>
      <Text style={styles.heading}>Find the Right Tutor For You!</Text>

      <TouchableOpacity
        style={styles.tutorCard}
        onPress={() => router.push('/screens/(hidden)/BecomeTutor')}
      >
        <FontAwesome6 name="user-plus" size={22} color="black" />
        <View style={styles.tutorCardTextWrapper}>
          <Text style={styles.tutorCardTitle}>Become a Tutor</Text>
          <Text style={styles.tutorCardSubtitle}>
            Register as a tutor and start teaching now.
          </Text>
        </View>
        <FontAwesome6 name="chevron-right" size={18} color="#6b7280" />
      </TouchableOpacity>

      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <MaterialCommunityIcons name="apps" size={20} color="#333" />
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <View style={styles.categoriesGrid}>
          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({ pathname: '/screens/(hidden)/TutorListScreen', params: { search: '' } })
            }
          >
            <Feather name="users" size={33} color="#007acc" />
            <Text style={styles.categoryText}>All Tutors</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({ pathname: '/screens/(hidden)/TutorListScreen', params: { subject: 'Chemistry' } })
            }
          >
            <SimpleLineIcons name="chemistry" size={33} color="#007acc" />
            <Text style={styles.categoryText}>Chemistry</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({ pathname: '/screens/(hidden)/TutorListScreen', params: { subject: 'Math' } })
            }
          >
            <MaterialCommunityIcons name="math-compass" size={33} color="#007acc" />
            <Text style={styles.categoryText}>Math</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({ pathname: '/screens/(hidden)/TutorListScreen', params: { subject: 'Biology' } })
            }
          >
            <FontAwesome6 name="dna" size={33} color="#007acc" />
            <Text style={styles.categoryText}>Biology</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({ pathname: '/screens/(hidden)/TutorListScreen', params: { subject: 'Philosophy' } })
            }
          >
            <FontAwesome6 name="book-open-reader" size={33} color="#007acc" />
            <Text style={styles.categoryText}>Philosophy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({ pathname: '/screens/(hidden)/TutorListScreen', params: { subject: 'Physics' } })
            }
          >
            <FontAwesome6 name="atom" size={33} color="#007acc" />
            <Text style={styles.categoryText}>Physics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recommended Tutors */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <FontAwesome6 name="user-graduate" size={20} color="#333" />
          <Text style={styles.sectionTitle}>Recommended Teachers</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {topRatedTutors.map((tutor, index) => (
            <View key={index} style={styles.horizontalCardWrapper}>
              <TutorCard tutor={tutor} />
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  subHeading: {
    fontSize: 14,
    color: 'grey',
    fontWeight: '600',
    marginBottom: 5,
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  section: {
    marginTop: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    paddingHorizontal: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  tutorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEFF5',
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-between',
  },
  tutorCardTextWrapper: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  tutorCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  tutorCardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  categoryBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%', 
    height : '60%',
    aspectRatio : 1,
    marginBottom: 15,
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    padding : 1,
  },
  horizontalCardWrapper: {
    width: 280,
    marginRight: 11,
  },
});
