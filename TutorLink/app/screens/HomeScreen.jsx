// HomeScreen.js
import React from 'react';
import { ScrollView, View } from 'react-native';
import TutorCard from '../components/TutorCard';
import tutors from '../data.js';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {tutors.map((tutor, index) => (
          <TutorCard
            key={index}
            name={tutor.name}
            subject={tutor.subject}
            rating={tutor.rating}
            price={tutor.price}
            location={tutor.location}
            imageUrl={tutor.imageUrl}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
