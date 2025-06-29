import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Login Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: '#0B60B0',
    fontWeight: 'bold',
  },
});
