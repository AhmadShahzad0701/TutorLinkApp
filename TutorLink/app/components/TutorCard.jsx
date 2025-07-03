import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
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

  const handleImagePress = () => {
    router.push({
      pathname: '/screens/TutorDataFetcherScreen',
      params: { tutorName: tutor.name },
    });
  };

  const handleStarPress = (star) => {
    setSelectedRating(star);
    Alert.alert('Thank you!', `You rated ${star} star${star > 1 ? 's' : ''}`);
  };



  return (
    <View style={styles.cardOuter}>
      <View style={styles.cardInner}>

        <TouchableOpacity onPress={handleImagePress} activeOpacity={0.85}>
          <View style={styles.imageHalf}>
            <Image source={{ uri: tutor.imageUrl }} style={styles.avatar} />
          </View>
        </TouchableOpacity>

        <View style={styles.infoHalf}>
          <Text style={styles.name}>{tutor.name}</Text>
          <Text style={styles.role}>{tutor.subject}</Text>
          <Text style={styles.detail}>{tutor.location}</Text>
          <Text style={styles.price}>Rs {tutor.price}/hr</Text>

          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                <Feather
                  name="star"
                  size={22}
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

export default TutorCard;

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
    height: 150,
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
    padding: 14,
    backgroundColor: '#ffffff',
  },
  name: {
    fontSize: 20,
    fontWeight: '1200',
    color: '#1f2937',
    marginBottom: 4,
  },
  role: {
    fontSize: 17,
    color: '#4b5563',
    marginBottom: 4,
  },
  detail: {
    fontSize: 18,
    color: '#9ca3af',
    marginBottom: 2,
  },
  price: {
    fontSize: 18,
    color: '#10b981',
    fontWeight: '600',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  starIcon: {
    marginHorizontal: 6,
  },
});
