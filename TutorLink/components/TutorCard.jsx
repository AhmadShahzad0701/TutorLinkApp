import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo, useCallback, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TutorCard = ({ tutor }) => {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState(tutor.rating || 0);

  const handleImagePress = useCallback(() => {
    router.push({
      pathname: 'screens/(hidden)/TutorDataFetcherScreen',
      params: { tutorName: tutor.name },
    });
  }, [router, tutor.name]);

  const handleStarPress = useCallback((star) => {
    setSelectedRating(star);
    Alert.alert('Thank you!', `You rated ${star} star${star > 1 ? 's' : ''}`);
  }, []);

  return (
    <View style={styles.cardOuter}>
      <View style={styles.cardInner}>
        <TouchableOpacity onPress={handleImagePress} activeOpacity={0.85}>
          <View style={styles.imageHalf}>
            <Image
              source={
                tutor.imageUrl
                  ? { uri: tutor.imageUrl }
                  : require('../assets/images/placeholder.jpeg')
              }
              style={styles.avatar}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.infoHalf}>
          <Text style={styles.name}>{tutor.name}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Subject:</Text>
            <Text style={styles.value}>{tutor.subject}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{tutor.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Fee:</Text>
            <Text style={styles.price}>Rs {tutor.price} / hour</Text>
          </View>

          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                <Feather
                  name="star"
                  size={24}
                  color={star <= selectedRating ? '#FACC15' : '#D1D5DB'}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};


export default memo(TutorCard);

const styles = StyleSheet.create({
  cardOuter: {
    width: '100%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f9fafb',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    marginBottom: 20,
    elevation: 3,
    marginTop: 20,
  },
  cardInner: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  imageHalf: {
    width: '100%',
    height: 160,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoHalf: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    width: 80,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  starIcon: {
    marginHorizontal: 4,
  },
});
