import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import DrawModal from './drawModal/drawModal';
import Select from 'react-select';
import CanvasDraw  from 'react-canvas-draw';
import Canvas from 'react-native-canvas';
import tslogo from './assets/TwangStudios.png';
import tblight from './assets/TheBaggerLight.png';
import tbdark from './assets/TheBaggerDark.png';
import * as uuid from 'uuid';
import * as styles from './styles' ;

const addItemToChar = (id: string, char: string|null) => {
  const charName = char ? char : 'NOONE';
  if(!Object.keys(localStorage).includes(char ? char : 'NOONE')){
    localStorage.setItem(charName, JSON.stringify({items:[]}))
  }
  const {items} = JSON.parse(localStorage.getItem(charName)!)
  
  items.push(id)
  localStorage.setItem(charName, items)
  return;
}

const getItems:()=>{id: string, name: string, image: string|undefined}[] = () => {
  var archive = [],
  keys = Object.keys(localStorage),
  i = 0, key;
  
  for (; key = keys[i]; i++) {
    const stored = localStorage.getItem(key)
    if(!stored) {
      console.error('item {} could not be found in local storage', key);
    }
    const parsed = JSON.parse(stored!);
    archive.push({
      id: key,
      name: parsed.name, 
      image: parsed.image,
  });
  }
  
  if(archive.length == 0){
    localStorage.setItem(uuid.v4(), JSON.stringify({
      name: "New Item",
      isBag: false,
      image: undefined,
      description: "",
      weight: 0,
      cost: 0,
    }))
    archive = getItems();
  }
  return archive;
}

export default function App() {
  const [items, setItems] = useState(getItems())
  const [selectedOption, setSelectedOption] = useState<string>(items.at(0)!.id);
  
  const makeNewItem = () => {
    const id = uuid.v4()
    localStorage.setItem(id, JSON.stringify({
      name: "New Item",
      isBag: false,
      image: undefined,
      description: "",
      weight: 0,
      cost: 0,
    }))
    
    setItems(getItems);
    setSelectedOption(id);
    // addItemToChar(id, null);
  }
  
  const onSave = () => {
    setItems(getItems());
  }

  return ( 
    <SafeAreaView style={styles.styles.backgroundMain} >
      <View style={styles.styles.containerMain}>
        <View style={{flexDirection:'row'}}>
          <Image source={{uri:tblight}} style={styles.styles.tblogo} />
            
            <Text style={styles.styles.textLight}> The TTRPG Party Inventory Manager</Text>
        </View>
        <View style={{flexDirection:'row', }}>
          <TouchableOpacity style={styles.styles.buttons}>
            <Text style={styles.styles.textDark} onPress={makeNewItem}>New Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.styles.buttons}>
            <Text style={styles.styles.textDark}>New Character</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {items.map((item) => {
            console.log(item)
            return (
              <TouchableOpacity style={styles.styles.itemContainer} onPress={() => setSelectedOption(item.id)} >
                <CanvasDraw 
                            disabled
                            hideGrid
                            saveData={item.image}
                            immediateLoading
                            style={{zoom:'15%'}}
                             />
                <Text style={styles.styles.textDark}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
                  
        </ScrollView>
      </View>
      <View style={styles.styles.backgroundEditItem}>
        <View style={{alignItems:'flex-end'}} >
          <Image source={{uri:tslogo}} style={styles.styles.tslogo} />
        </View>
        <View style={{alignItems:'center'}}>
          <DrawModal id={selectedOption} onSave={onSave} />
        </View>
      </View>
    </SafeAreaView>
  );
}

