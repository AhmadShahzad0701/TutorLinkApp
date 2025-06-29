import React from 'react';
import { ScrollView, View } from 'react-native';
import TutorCard from '../components/TutorCard'; // adjust path if needed

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <TutorCard
          name="Fatima Khan"
          subject="Biology, Chemistry"
          rating="4.8"
          price="1500"
          location="Karachi"
          imageUrl="https://i.pravatar.cc/150?img=18"
        />
        <TutorCard
          name="Ali Raza"
          subject="English, History"
          rating="4.7"
          price="1000"
          location="Islamabad"
          imageUrl="https://i.pravatar.cc/150?img=25"
        />
        <TutorCard
          name="Ayesha Malik"
          subject="Computer Science"
          rating="5.0"
          price="2000"
          location="Lahore"
          imageUrl="https://i.pravatar.cc/150?img=30"
        />
        
        <TutorCard
          name="Fatima Khan"
          subject="Biology, Chemistry"
          rating="4.8"
          price="1500"
          location="Karachi"
          imageUrl="https://i.pravatar.cc/150?img=18"
        />
        <TutorCard
          name="Ali Raza"
          subject="English, History"
          rating="4.7"
          price="1000"
          location="Islamabad"
          imageUrl="https://i.pravatar.cc/150?img=25"
        />
        <TutorCard
          name="Ayesha Malik"
          subject="Computer Science"
          rating="5.0"
          price="2000"
          location="Lahore"
          imageUrl="https://i.pravatar.cc/150?img=30"
        />
        {/* ➕ Add more TutorCard components as needed */}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
