import { FontAwesome6, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>Welcome to Tutor Link</Text>
      <Text style={styles.heading}>Find the Right Tutor For You!</Text>

      <View style={styles.section}>
        {/* Categories Title with Icon */}
        <View style={styles.sectionTitleRow}>
          <MaterialCommunityIcons name="apps" size={20} color="#333" />
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <View style={styles.categoriesRow}>
          <TouchableOpacity style={styles.categoryBox}>
            <SimpleLineIcons name="chemistry" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Chemistry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox}>
            <MaterialCommunityIcons name="math-compass" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Math</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox}>
            <FontAwesome6 name="dna" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Biology</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesRow}>
          <TouchableOpacity style={styles.categoryBox}>
            <FontAwesome6 name="language" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Language</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox}>
            <FontAwesome6 name="book-open-reader" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Philosophy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox}>
            <FontAwesome6 name="atom" size={28} color="#7C8BA5" />
            <Text style={styles.categoryText}>Physics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recommended Teachers Title with Icon */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <FontAwesome6 name="user-graduate" size={20} color="#333" />
          <Text style={styles.sectionTitle}>Recommended Teachers</Text>
        </View>
        {/* Add teacher cards here */}
      </View>
    </View>
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
});
