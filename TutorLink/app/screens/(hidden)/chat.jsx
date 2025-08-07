// app/screens/ChatScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

const API_URL = 'https://40f782d6d35f.ngrok-free.app/chat'; // Replace with actual ngrok URL

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: 'student123',
          message: message,
        }),
      });

      const data = await response.json();
      const botMessage = { role: 'bot', content: data.response };
      setChatHistory(prev => [...prev, botMessage]);
      setMessage('');
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'bot', content: 'Error: Could not reach server.' }]);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding' })}>
      <View style={styles.header}>
        <FontAwesome6 name="robot" size={20} color="#007acc" />
        <Text style={styles.headerText}>AI Tutor Chat</Text>
      </View>

      <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
        {chatHistory.map((msg, index) => (
          <View key={index} style={[styles.message, msg.role === 'user' ? styles.user : styles.bot]}>
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask a question..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.button}>
          <FontAwesome6 name="paper-plane" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f4ff',
    borderBottomColor: '#d1d5db',
    borderBottomWidth: 1,
    gap: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  chatContainer: {
    padding: 10,
    flex: 1,
  },
  message: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#daf5dc',
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 15,
    height: 45,
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#007acc',
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
