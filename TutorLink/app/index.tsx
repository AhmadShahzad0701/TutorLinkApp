// app/index.jsx
import React from 'react';
import { View } from 'react-native';
import SignUp from './screens/(hidden)/SignUp';
// import HomeScreen from './screens/(hidden)/HomeScreen'; // comment out for now

const Index = () => {
  return (
    <View style={{ flex: 1 }}>
      <SignUp />
    </View>
  );
};

export default Index;
