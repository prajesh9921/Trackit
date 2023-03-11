import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loadData } from '../../../features/items';
import { loadValues } from '../../../features/numbers';

const AppBar = props => {

  const dispatch = useDispatch();

  const setObjectValue = async () => {
    const value = {balance: '0', income: '0', expense: '0'};
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('values', jsonValue);
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };

  const GetData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const data = result.map(item => {
        return {timestamp: item[0], info: JSON.parse(item[1])};
      });
      dispatch(loadData(data));
    } catch (error) {
      console.error(error);
    }
  };

  const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('values');
      const valueObject = jsonValue != null ? JSON.parse(jsonValue) : null;
      dispatch(loadValues(valueObject));
    } catch (e) {
      console.log(e);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setObjectValue();
      GetData();
      getMyObject();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.appbar}>
      <Text style={styles.appbar_title}>Home</Text>
      <FontAwesome5
        name={'trash-alt'}
        size={20}
        style={{marginRight: 20}}
        color="white"
        onPress={clearAll}
      />
      <FontAwesome5
        name={'user-circle'}
        size={20}
        color="white"
        onPress={() => props.navigation.navigate('UserInfo')}
      />
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
  },
});

export default AppBar;
