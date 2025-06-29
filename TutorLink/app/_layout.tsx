import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: 'Home' }} />
      <Drawer.Screen name="screens/Profile" options={{ title: 'Profile' }} />
    </Drawer>
  );
}
