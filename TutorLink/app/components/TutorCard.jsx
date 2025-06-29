import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TutorCard = ({
  name = "Ahmad Shehzad",
  subject = "Math, Physics",
  rating = "4.9",
  price = "1200",
  location = "Lahore",
  imageUrl = "https://i.pravatar.cc/150?img=12",
  onPress = () => alert('View Profile pressed!')
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.details}>⭐ {rating} | 📍 {location}</Text>
        <Text style={styles.price}>Rs. {price}/hr</Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TutorCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 260, // Slightly longer
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 28,
    marginHorizontal: '1%',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '65%',
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  info: {
    marginTop: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  subject: {
    fontSize: 11,
    color: '#555',
    marginTop: 2,
  },
  details: {
    fontSize: 11,
    color: '#777',
    marginTop: 2,
  },
  price: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginTop: 2,
  },
  button: {
    marginTop: 6,
    backgroundColor: '#3f51b5',
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});
