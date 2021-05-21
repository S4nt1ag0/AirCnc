import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './Routes';
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <View style={styles.container}>
       <AuthProvider>
        <Routes />
      </AuthProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
