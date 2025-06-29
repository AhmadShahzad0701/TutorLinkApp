import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TutorCard = (props) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/TutorDetails',
      params: { ...props },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: props.imageUrl }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.subject}>{props.subject}</Text>
        <Text style={styles.details}>⭐ {props.rating}   |   📍 {props.location}</Text>
        <Text style={styles.price}>Rs. {props.price}/hr</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TutorCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: '1%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#dcdcdc',
  },
  info: {
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  subject: {
    fontSize: 12,
    color: '#4b4b4b',
    marginTop: 2,
  },
  details: {
    fontSize: 11,
    color: '#777',
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 6,
  },
});
