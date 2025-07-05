import { FontAwesome } from '@expo/vector-icons'; // Icon package
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Header from '../components/Header';

// Prevent splash auto-hide
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return (
    <Drawer
      screenOptions={{
        drawerLabelStyle: {
          fontSize: 18, 
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          header: () => <Header />,
        }}
      />

      <Drawer.Screen
        name="screens/(hidden)/Profile"
        options={{
          title: 'My Profile',
          drawerLabel: 'My Profile',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      

      <Drawer.Screen
        name="screens/(hidden)/EditProfile"
        options={{
          title: 'Edit My Profile',
          drawerLabel: 'Edit My Profile',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="edit" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="screens/(hidden)/TutorListScreen"
        options={{
          title: 'Tutor List',
          drawerLabel: 'Tutor List',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          ),
          header: () => <Header />,
        }}
      />
      <Drawer.Screen
        name="screens/(hidden)/Login"
        options={{
          title: 'Login',
          drawerLabel: 'Login',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="sign-in" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="screens/(hidden)/SignUp"
        options={{
          title: 'Logout',
          drawerLabel: 'Logout',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="sign-out" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      {/* <Drawer.Screen
        name="screens/(hidden)/SignUp"
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }}
      /> */}
      <Drawer.Screen
        name="screens/(hidden)/TutorDataFetcherScreen"
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }}
      />
      <Drawer.Screen
        name="screens/(hidden)/TutorDetails"
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }}
      />
      <Drawer.Screen
        name="screens/(hidden)/HomeScreen"
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }}
      />


    </Drawer>
  );
}
