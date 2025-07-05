import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export const options = {
  
  headerShown: false,
};

const TutorDetails = () => {
  const { name, subject, rating, price, location, imageUrl } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.subject}>Subjects: {subject}</Text>
      <Text style={styles.detail}>Rating: ⭐ {rating}</Text>
      <Text style={styles.detail}>Location: 📍 {location}</Text>
      <Text style={styles.price}>Rs. {price}/hour</Text>
    </View>
  );
};

export default TutorDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subject: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  detail: {
    fontSize: 15,
    color: '#666',
    marginVertical: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 10,
  },
});
