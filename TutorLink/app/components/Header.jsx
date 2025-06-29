// components/Header.jsx
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const Header = () => {
  const navigation = useNavigation(); 
  const router = useRouter();         

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialIcons name="menu" size={28} color="#0B60B0" />
        </TouchableOpacity>

        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />

        <TouchableOpacity onPress={() => router.push('/screens/Login')}>
          <MaterialIcons name="login" size={28} color="#0B60B0" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search tutor..."
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F0FA',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1000,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
});
