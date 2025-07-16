import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import auth from '../lib/firebase';

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/screens/(hidden)/HomeScreen');
      } else {
        router.replace('/screens/(hidden)/Login');
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007acc" />
      </View>
    );
  }

  return null;
};

export default Index;
