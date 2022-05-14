import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  containerMain: {
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
  contentEditor: {
    flexDirection: 'column',
  },
  textInput: {
    backgroundColor: '#DBDBDB'

  },
  textInputShort: {
    backgroundColor: '#DBDBDB',
    width:'80%'
    
  },
  textInputContainerShort:{
    backgroundColor: '#DBDBDB',
    marginRight: '80%' ,
    padding: 5,
    borderRadius: 5,
    marginVertical:2,
    flexDirection:'row',
  },
  textInputContainerMed:{
    backgroundColor: '#DBDBDB',
    marginRight: '50%' ,
    padding: 5,
    borderRadius: 5,
    marginVertical:2
  },
  textInputContainer: {  
    backgroundColor: '#DBDBDB',
    padding: 5,
    borderRadius: 5,
    marginVertical:2,
  },
  canvas: {

  },
  slogan: {
    
  }
})