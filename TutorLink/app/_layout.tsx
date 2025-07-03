// app/_layout.tsx

import { Drawer } from 'expo-router/drawer';
import Header from './components/Header';

export default function Layout() {
  return (
    <Drawer>

      {/* Home */}
      <Drawer.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          header: () => <Header />  
        }}  
      />

      {/* Login */}
      <Drawer.Screen 
        name="screens/Login" 
        options={{ 
          title: 'Login',
          headerShown: false,
          drawerItemStyle: { display: 'none' } 
        }}  
      />

      {/* Sign Up */}
      <Drawer.Screen 
        name="screens/SignUp" 
        options={{ 
          title: 'Sign Up',
          headerShown: false,
          drawerItemStyle: { display: 'none' }
        }}  
      />

      {/* Profile */}
      <Drawer.Screen
        name="screens/Profile"
        options={{
          title: 'Tutor Profile',
          header: () => <Header />,
        }}
      />

      {/* Edit Profile */}
      <Drawer.Screen
        name="screens/EditProfile"
        options={{
          title: 'Edit Profile',
          header: () => <Header />,
          drawerItemStyle: { display: 'none' }
        }}
      />

      {/* Optional: Create Profile page for tutors */}
      <Drawer.Screen
        name="screens/CreateProfile"
        options={{
          title: 'Create Profile',
          header: () => <Header />,
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}
