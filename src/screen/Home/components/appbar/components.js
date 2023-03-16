import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadValues} from '../../../../features/numbers';
import {loadData} from '../../../../features/items';

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

const getMyObject = async dispatch => {
  try {
    const jsonValue = await AsyncStorage.getItem('values');
    const valueObject = jsonValue != null ? JSON.parse(jsonValue) : null;
    dispatch(loadValues(valueObject));
  } catch (e) {
    console.log(e);
  }
};

const GetData = async dispatch => {
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

const clearAll = async dispatch => {
  try {
    await AsyncStorage.clear();
    setObjectValue();
    getMyObject(dispatch);
    GetData(dispatch);
  } catch (e) {
    console.log(e);
  }
};

export {clearAll};
