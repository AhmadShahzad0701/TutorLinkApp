import { FontAwesome } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Header from '../components/Header';

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
        name="screens/(hidden)/SignUp"
        options={{
          drawerItemStyle: { display: 'none' },
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="screens/(hidden)/HomeScreen"
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
          name="screens/(hidden)/BecomeTutor"
          options={{
            drawerItemStyle: { display: 'none' },
            headerShown: false,
          }}
      />
      <Drawer.Screen
        name="screens/(hidden)/TutorProfile"
        options={{
          title: 'My Tutor Profile',
          drawerLabel: 'My Tutor Profile',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
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
        name="screens/(hidden)/DeleteAccount"
        options={{
          title: 'Delete Account',
          drawerLabel: 'Delete Account',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="trash" size={size} color={color} />
          ),
          headerShown: false, 
        }}
      />



      <Drawer.Screen
        name="screens/(hidden)/TutorDataFetcherScreen"
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }}
      />
      <Drawer.Screen
        name="screens/(hidden)/TutorDetails"
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }}
      />

      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: 'none' },
          header: () => <Header />,
        }}
      />

    </Drawer>
  );
}
