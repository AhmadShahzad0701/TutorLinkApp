// app/index.jsx
import React from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/(hidden)/HomeScreen';

const Index = () => {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen />
    </View>
  );
};

export default Index;