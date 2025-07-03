import { FontAwesome6, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TutorCard from '../components/TutorCard';
import tutors from '../data';

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
        onPress={() => router.push('/screens/EditProfile')}
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

      {/* Categories Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <MaterialCommunityIcons name="apps" size={20} color="#333" />
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <View style={styles.categoriesRow}>
          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({
                pathname: '/screens/TutorListScreen',
                params: { subject: 'Chemistry' },
              })
            }
          >
            <SimpleLineIcons name="chemistry" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Chemistry</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({
                pathname: '/screens/TutorListScreen',
                params: { subject: 'Math' },
              })
            }
          >
            <MaterialCommunityIcons name="math-compass" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Math</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({
                pathname: '/screens/TutorListScreen',
                params: { subject: 'Biology' },
              })
            }
          >
            <FontAwesome6 name="dna" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Biology</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesRow}>
          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({
                pathname: '/screens/TutorListScreen',
                params: { subject: 'Language' },
              })
            }
          >
            <FontAwesome6 name="language" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Language</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({
                pathname: '/screens/TutorListScreen',
                params: { subject: 'Philosophy' },
              })
            }
          >
            <FontAwesome6 name="book-open-reader" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Philosophy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push({
                pathname: '/screens/TutorListScreen',
                params: { subject: 'Physics' },
              })
            }
          >
            <FontAwesome6 name="atom" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Physics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recommended Teachers Section */}
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
    backgroundColor: '#B6BED0',
    borderRadius: 10,
    height: 35,
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
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
    marginBottom: 20,
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
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  categoryBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
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
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  horizontalCardWrapper: {
    width: 280,
    marginRight: 16,
  },
});
