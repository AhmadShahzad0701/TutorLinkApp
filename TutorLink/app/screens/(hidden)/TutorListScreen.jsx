//List of tutor for Students

import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TutorCard from '../../../components/TutorCard';
import tutors from '../../../data';

const TutorListScreen = () => {
  const router = useRouter();
  const { search = '', subject = '', location = '' } = useLocalSearchParams();

  const [selectedSubject, setSelectedSubject] = useState(subject);
  const [selectedLocation, setSelectedLocation] = useState(location);

  useEffect(() => {
    setSelectedSubject(subject);
    setSelectedLocation(location);

    return () => {
      setSelectedSubject('');
      setSelectedLocation('');
    };
  }, [subject, location]);

  const filteredTutors = tutors.filter((tutor) => {
    const tutorSubject = tutor.subject?.toLowerCase() || '';
    const tutorLocation = tutor.location?.toLowerCase() || '';
    const tutorName = tutor.name?.toLowerCase() || '';

    const matchSubject = selectedSubject ? tutorSubject === selectedSubject.toLowerCase() : true;
    const matchLocation = selectedLocation ? tutorLocation === selectedLocation.toLowerCase() : true;
    const matchSearch = search
      ? tutorName.includes(search.toLowerCase()) ||
        tutorSubject.includes(search.toLowerCase()) ||
        tutorLocation.includes(search.toLowerCase())
      : true;

    return matchSubject && matchLocation && matchSearch;
  });

  const displayTitle = selectedSubject || selectedLocation || search || 'All';

  const getSubjectIcon = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('chemistry')) return <MaterialCommunityIcons name="flask" size={28} color="#007acc" />;
    if (lower.includes('math')) return <Feather name="activity" size={28} color="#007acc" />;
    if (lower.includes('biology')) return <FontAwesome5 name="dna" size={28} color="#007acc" />;
    if (lower.includes('physics')) return <Feather name="zap" size={28} color="#007acc" />;
    if (lower.includes('english')) return <Feather name="book-open" size={28} color="#007acc" />;
    return <Feather name="users" size={28} color="#007acc" />;
  };

  const handleResetFilters = () => {
    setSelectedSubject('');
    setSelectedLocation('');
    router.replace('/screens/(hidden)/TutorListScreen');
  };

  return (
    <View style={styles.container}>

      <View style={styles.filterRow}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue) => setSelectedSubject(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All Subjects" value="" />
            <Picker.Item label="Math" value="Math" />
            <Picker.Item label="Physics" value="Physics" />
            <Picker.Item label="Chemistry" value="Chemistry" />
            <Picker.Item label="Biology" value="Biology" />
            <Picker.Item label="English" value="English" />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(itemValue) => setSelectedLocation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All Locations" value="" />
            <Picker.Item label="Lahore" value="Lahore" />
            <Picker.Item label="Karachi" value="Karachi" />
            <Picker.Item label="Islamabad" value="Islamabad" />
            <Picker.Item label="Rawalpindi" value="Rawalpindi" />
            <Picker.Item label="Gujranwala" value="Gujranwala" />
          </Picker>
        </View>
      </View>

      {(selectedSubject || selectedLocation) && (
        <TouchableOpacity onPress={handleResetFilters} style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>Reset Filters</Text>
        </TouchableOpacity>
      )}

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
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
  resetBtn: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 5,
  },
  resetBtnText: {
    color: '#007acc',
    fontSize: 14,
    fontWeight: '600',
  },
});
