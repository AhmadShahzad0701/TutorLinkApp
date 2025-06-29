import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const Header = () => {
  const router = useRouter();
  // const Drawer = createDrawerNavigator()

  return (
    <View style={styles.container}>

      {/* <View style={styles.topBar}>

        <TouchableOpacity onPress={() => {}}>
          <Feather name="menu" size={28} color="#0B60B0" />
        </TouchableOpacity>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>



        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
        />

        <TouchableOpacity onPress={() => router.push('/screens/Login')}>
          <MaterialIcons name="login" size={28} color="#0B60B0" />
        </TouchableOpacity>
      </View>


      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#666" />
        <TextInput
          placeholder="Search tutor..."
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F0FA',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
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
