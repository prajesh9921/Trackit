import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Card from './components/card/card';
import DashBoard from './components/dashboard/dashboard';
import {useSelector, useDispatch} from 'react-redux';
import FloatingActionButton from './components/FAB/floatingActionButton';
import AppBar from './components/appbar/appbar';
import {loadData} from '../../features/items';
import {loadValues} from '../../features/numbers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { getTodayDate } from './homeComponents';

const Home = ({navigation}) => {
  const ItemsList = useSelector(state => state.ItemCard.value);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [DatesArray, setDatesArray] = useState();
  const [TodayDate, setTodayDate] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('USE EFFECT CALLED')

    const getDatesArray = (dateData) => {
      console.log("date array data", dateData)
      var unique = [];
      dateData.map((item) => {
          if (item.timestamp != "values"){
              if (!unique.includes(item.info.date)){
                  unique.push(item.info.date)
              };
      }});
      unique.sort()
      unique.reverse();
      console.log(unique); 
      setDatesArray(unique);
    };

    const GetData = async () => {
      try {
        setLoading(true)
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const data = result.map(item => {
          return {timestamp: item[0], info: JSON.parse(item[1])};
        });
        dispatch(loadData(data));
        setLoading(false)
        getDatesArray(data);

      } catch (error) {
        console.error(error);
      }
    };

    const getMyObject = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('values');
        const valueObject = jsonValue != null ? JSON.parse(jsonValue) : null;
        dispatch(loadValues(valueObject));
        console.log(valueObject);
      } catch (e) {
        console.log(e);
      }
    };

    getTodayDate(setTodayDate)
    GetData();
    getMyObject();
  }, [isFocused]);

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>Loading...</Text>
      </View>
    );
  } else {
  return (
    <View style={{flex: 1}}>
      <AppBar navigation={navigation} />
      <View style={styles.homeView}>
        <DashBoard />
        {ItemsList.length == 1 ? (
          <Text style={styles.text}>Nothing To Show </Text>
        ) : (
          <Card navigation={navigation} data={ItemsList} datesArray={DatesArray} todayDate={TodayDate}/>
        )}
      </View>
      <FloatingActionButton navigation={navigation} />
    </View>
  );}
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
