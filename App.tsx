import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DrawModal from './drawModal/drawModal';
import Select from 'react-select';

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string|undefined>(undefined);


  function getItems() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push({value: key, label: JSON.parse(localStorage.getItem(key)!).name});
    }

    return archive;
}

  const items = getItems();

  return (
    <View style={styles.container}>
      <Text>ZingBong</Text>
      <Text>🍺 Cheers!</Text>
      <StatusBar style="auto" />
      <Select 
        options={items}
        onChange={(item) => setSelectedOption(item?.value)}
      />
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
