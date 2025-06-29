import { Text, View } from 'react-native';
import Header from './components/Header';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to Tutor Link HomeScreen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
