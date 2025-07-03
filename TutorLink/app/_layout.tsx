// app/_layout.tsx

import { Drawer } from 'expo-router/drawer';
import Header from './components/Header';

export default function Layout() {
  return (
    <Drawer>

      <Drawer.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          header: () => <Header />  
        }}  
      />
      
      <Drawer.Screen 
        name="screens/Login" 
        options={{ 
          title: 'Login',
          headerShown: false        
        }}  
      />

      <Drawer.Screen 
        name="screens/SignUp" 
        options={{ 
          title: 'Sign Up',
          headerShown: false 
        }}  
      />

      <Drawer.Screen
        name="screens/Profile"
         options={{
          title: 'Profile'
          }}
       />
      
      <Drawer.Screen
        name="screens/EditProfile"
        options={{
          title: 'Edit Profile',
          drawerItemStyle: { display: 'none' } 
        }}
      />
    </Drawer>
  );
}
