import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppBar = (props) => {

  const setObjectValue = async () => {
    const value = {balance: "0", income: "0", expense: "0"}
    // const value = {id: "8", content: "earphones", amt: "56", date: "March 10,2023", timestamp: "5-10-2023", deducted: true};
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('8', jsonValue)
    } catch(e) {
      console.log(e)
    }
    console.log('Done.')
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
      setObjectValue();
    } catch(e) {
      console.log(e)
    }
    console.log('All data has been cleared');
  }

  const GetData = async() => {
    try{
     const keys = await AsyncStorage.getAllKeys();
     const result = await AsyncStorage.multiGet(keys)

     const data = result.map((item) => {
       return {timestamp: item[0], info: JSON.parse(item[1])};
     })

     console.log(data);
    //  dispatch(loadData(data));
    } catch (error) {
        console.error(error);
     }
   }

  return (
    <View style={styles.appbar}>
      <Text style={styles.appbar_title}>Home</Text>
        <FontAwesome5 name={'database'} size={20} style={{marginRight: 10}} color="white" onPress={GetData}/>
        <FontAwesome5 name={'trash-alt'} size={20} style={{marginRight: 10}} color="white" onPress={clearAll}/>
        <FontAwesome5 name={'user-circle'} size={20} color="white" onPress={() => props.navigation.navigate('UserInfo')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: '#F9C201',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appbar_title: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppBar;
