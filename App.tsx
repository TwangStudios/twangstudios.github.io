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



const getItems:()=>{id: string, name: string}[] = () => {
  var archive = [],
      keys = Object.keys(localStorage),
      i = 0, key;

  for (; key = keys[i]; i++) {
        archive.push({id: key, 
                      name: JSON.parse(localStorage.getItem(key)!).name, 
                      image: JSON.parse(localStorage.getItem(key)!).image
                    });
    }

  if(archive.length == 0){
    localStorage.setItem(uuid.v4(), JSON.stringify({
      name: "New Item",
      isBag: false,
      image: "",
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
  const [selectedOption, setSelectedOption] = useState<string>(items.at(0)!.name);
  
  const makeNewItem = () => {
    const id = uuid.v4()
    localStorage.setItem(id, JSON.stringify({
      name: "New Item",
      isBag: false,
      image: "",
      description: "",
      weight: 0,
      cost: 0,
    }))

    setItems(getItems);
    setSelectedOption(id)
  }
  
  const onSave = () => {
    setItems(getItems());
  }

  return (
    <SafeAreaView style={styles.backgroundMain} >
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <Image source={{uri:tblight}} style={styles.tblogo} />
            
            <Text style={styles.textLight}> The TTRPG Inventory Manager</Text>
        </View>
        <View style={{flexDirection:'row', }}>
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.textDark} onPress={makeNewItem}>New Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.textDark}>New Character</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {items.map((item) => {
            return (
              <TouchableOpacity style={styles.itemContainer} >
                <CanvasDraw 
                            disabled
                            hideGrid
                            saveData={item.image} 
                            immediateLoading
                            style={{zoom:'25%'}}
                             />
                <Text style={styles.textDark}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
                  
        </ScrollView>
      </View>
      <View style={styles.backgroundEditItem}>
        <View style={{alignItems:'flex-end'}}>
          <Image source={{uri:tslogo}} style={styles.tslogo} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
    marginLeft: 20,
    marginRight: 10,
    marginVertical: 20,
    backgroundColor:'#593F62',
    width: '67%',
    borderRadius:10,
    
  },
  backgroundMain: {
    backgroundColor: '#8499B1',
    flex:1,
    flexDirection: 'row',
    height: '100%'
  },
  backgroundEditItem: {
    backgroundColor: '#593F62',
    marginRight: 20,
    marginLeft: 10,
    marginVertical:20,
    width: '33%',
    borderRadius: 10,

  },
  textLight: {
    color: '#DBDBDB',
    margin: 10,
  },
  textDark: {
    color: '#272727',
    margin: 10,
  },
  buttons: {
    backgroundColor: '#8499B1',
    margin: 20,
    borderRadius: 5,
    borderColor: '#36151E',
    borderWidth: 3,
  },
  itemContainer: {
    backgroundColor: '#7B6D8D',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 5,

  },
  itemIcon: {
    canvasWidth: '50%',
    canvasHeight: '50%',
    marginHorizontal: 5,
  },
  tslogo:{
    height: 200,
    width: 200,
    alignItems: 'flex-end'
  },
  tblogo:{
    height: 200,
    width: 300,
    padding: 5,
  },

});
