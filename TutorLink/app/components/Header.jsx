// components/Header.jsx
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Header = () => {
  const navigation = useNavigation();
  const router = useRouter();   

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialIcons name="menu" size={27} color="black" />
        </TouchableOpacity>
         <Text style={styles.heading}>Home</Text>
        {/* <Image source={require('../../assets/images/Logo.png')} style={styles.logo} /> */}

        <TouchableOpacity onPress={() => router.push('/screens/Profile')}>
        <FontAwesome6 name="user-gear" size={20} color="black" />
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
  heading: {
    alignItems: 'center',
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15,
  },
  container: {
    backgroundColor: '#7C8BA5',
    paddingTop: 50,
    paddingBottom: 17,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 800,
    borderRadius : 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 9,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
  input: {
    marginLeft: 5,
    fontSize: 16,
    flex : 1,
    color: '#333',
  },
});
