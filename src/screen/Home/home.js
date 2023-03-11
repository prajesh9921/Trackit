import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Card from './components/card';
import DashBoard from './components/dashboard';
import {useSelector, useDispatch} from 'react-redux';
import FloatingActionButton from './components/floatingActionButton';
import AppBar from './components/appbar';
import {loadData} from '../../features/items';
import {loadValues} from '../../features/numbers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const ItemsList = useSelector(state => state.ItemCard.value);
  const dispatch = useDispatch();

  useEffect(() => {
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

    GetData();
    getMyObject();
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppBar navigation={navigation} />
      <View style={styles.homeView}>
        <DashBoard />
        {ItemsList.length == 1 ? (
          <Text style={styles.text}>Nothing To Show </Text>
        ) : (
          <Card navigation={navigation} data={ItemsList} />
        )}
      </View>
      <FloatingActionButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    padding: 10,
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Home;
