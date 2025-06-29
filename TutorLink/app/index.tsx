// app/index.jsx
import React from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';

const Index = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <Header /> */}
      <HomeScreen />
    </View>
  );
};

export default Index;
