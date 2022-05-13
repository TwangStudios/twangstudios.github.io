import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DrawModal from './drawModal/drawModal';
import Select from 'react-select';

export default function App() {
  const [items, setItems] = useState(getItems())
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
  const onSave = () => {
    setItems(getItems());
  }

  return (
    <View style={styles.backgroundMain}>
      <View style={styles.container} >
        <Text style={styles.text}>ZingBong</Text>
        <Text style={styles.text}>🍺 Cheers!</Text>
        <StatusBar/>
        <Select 
          options={items}
          onChange={(item) => setSelectedOption(item?.value)}
        />
        <DrawModal id={selectedOption} onSave={onSave} />
      </View>
      <View style={styles.backgroundModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 20,
    marginRight: 10,
    marginVertical: 20,
    backgroundColor:'#36151E',
    width: '67%',
    borderRadius:10
    
  },
  backgroundMain: {
    backgroundColor: '#8499B1',
    flex:1,
    flexDirection: 'row'
  },
  backgroundModal: {
    backgroundColor: '#36151E',
    marginRight: 20,
    marginLeft: 10,
    marginVertical:20,
    width: '33%',
    borderRadius: 10

  },
  text: {
    color: '#DBDBDB',
    margin: 10,
  }
});
