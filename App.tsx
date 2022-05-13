import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, { useState } from 'react';
import DrawModal from './drawModal/drawModal';
import Select from 'react-select';
import CanvasDraw from 'react-canvas-draw';

export default function App() {
  const [items, setItems] = useState(getItems())
  const [selectedOption, setSelectedOption] = useState<string|undefined>(undefined);


  function getItems() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push({id: key, 
                      name: JSON.parse(localStorage.getItem(key)!).name, 
                      image: JSON.parse(localStorage.getItem(key)!).image
                    });
    }

    return archive;
}
  const onSave = () => {
    setItems(getItems());
  }

  return (
    <View style={styles.backgroundMain} >
      <View style={styles.container} >
        <Text style={styles.textLight}>ZingBong</Text>
        <View style={{flexDirection:'row', }}>
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.textDark}>New Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.textDark}>New Character</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {items.map((item) => {
            return (
              <TouchableOpacity style={styles.itemContainer} >
                <CanvasDraw disabled
                            hideGrid
                            saveData={item.image} 
                            immediateLoading
                             />
                <Text style={styles.textDark}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
                  
        </ScrollView>
        <DrawModal id={selectedOption} onSave={onSave} />
      </View>
      <View style={styles.backgroundEditItem} />
    </View>
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
    borderRadius:10
    
  },
  backgroundMain: {
    backgroundColor: '#8499B1',
    flex:1,
    flexDirection: 'row',
    height: '100%'
  },
  backgroundEditItem: {
    backgroundColor: '#7B6D8D',
    marginRight: 20,
    marginLeft: 10,
    marginVertical:20,
    width: '33%',
    borderRadius: 10

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
  },
  itemIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },

});
