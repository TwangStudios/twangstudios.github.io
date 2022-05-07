import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DrawModal from './drawModal/drawModal';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>ZingBong</Text>
      <Text>🍺 Cheers!</Text>
      <StatusBar style="auto" />
      <DrawModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
