// app/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Header from './components/Header';

// Prevent auto-hide
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // optional delay
      await SplashScreen.hideAsync(); // now hide it
    };
    prepare();
  }, []);

  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: 'Home', header: () => <Header /> }} />
      <Drawer.Screen name="screens/Login" options={{ title: 'Login', headerShown: false }} />
      <Drawer.Screen name="screens/SignUp" options={{ title: 'Sign Up', headerShown: false }} />
      <Drawer.Screen name="screens/Profile" options={{ title: 'Profile' }} />
      <Drawer.Screen
        name="screens/EditProfile"
        options={{ title: 'Edit Profile', drawerItemStyle: { display: 'none' } }}
      />
    </Drawer>
  );
}
