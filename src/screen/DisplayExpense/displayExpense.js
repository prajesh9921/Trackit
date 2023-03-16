import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {RemoveValue} from './components';

const ExpenseDisplay = ({navigation, route}) => {
  const {id} = route.params;
  const [expenseData, setExpenseData] = useState({});
  const values = useSelector(state => state.Numbers.value);

  useEffect(() => {
    async function getdata() {
      try {
        const jsonValue = await AsyncStorage.getItem(id);
        const valueObject = jsonValue != null ? JSON.parse(jsonValue) : null;
        setExpenseData(valueObject);
        console.log(valueObject);
      } catch (e) {
        console.log(e);
      }
    }

    getdata();
  }, []);

  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Expense</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cross}>x</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.amount}>{expenseData.amt}</Text>
        <View style={styles.desc}>
          <Text style={styles.desc_title}>{expenseData.content}</Text>
          <Text style={styles.desc_date}>{expenseData.date}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditTask', {
                id: id,
                amt: expenseData?.amt,
                deducted: expenseData?.deducted,
              })
            }>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => RemoveValue(id, expenseData, values, navigation)}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExpenseDisplay;
