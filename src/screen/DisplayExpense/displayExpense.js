import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteExpense} from '../../features/items';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadData} from '../../features/items';
import {updateAfterDel} from '../../features/numbers';

const ExpenseDisplay = props => {
  const {id} = props.route.params;
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState({});
  const data = useSelector(state => state.ItemCard.value);
  const values = useSelector(state => state.Numbers.value);

  useEffect(() => {
    function getdata(data) {
      data.forEach(item => {
        if (item.timestamp === id) {
          setExpenseData({
            amt: item.info.amt,
            title: item.info.content,
            date: item.info.date,
          });
        }
      });
    }

    getdata(data);
  }, []);

  const DelExpense = () => {
    dispatch(deleteExpense(id));
    dispatch(updateAfterDel({amount: expenseData.amt}));
    props.navigation.goBack();
  };

  const ValuesAfterDel = async () => {
    let balance = parseInt(values.balance) + parseInt(expenseData.amt);
    let expense = parseInt(values.expense) - parseInt(expenseData.amt);
    const val = {
      balance: balance.toString(),
      income: values.income,
      expense: expense.toString(),
    };
    try {
      const jsonValue = JSON.stringify(val);
      await AsyncStorage.mergeItem('values', jsonValue);
    } catch (e) {
      console.log(e);
    }
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

  const RemoveValue = async key => {
    try {
      await AsyncStorage.removeItem(key);
      DelExpense();
      GetData();
      ValuesAfterDel();
    } catch (e) {
      console.log(e);
    }
    console.log('Item removed.');
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Expense</Text>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.cross}>x</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.amount}>{expenseData.amt}</Text>
        <View style={styles.desc}>
          <Text style={styles.desc_title}>{expenseData.title}</Text>
          <Text style={styles.desc_date}>{expenseData.date}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditTask', {
                id: id,
                amt: expenseData.amt,
              })
            }>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => RemoveValue(id)}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'darkorange',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    alignItems: 'center',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#626058',
    textAlign: 'center',
    flex: 1,
  },
  cross: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#626058',
  },
  amount: {
    fontSize: 35,
    color: '#D10000',
    fontWeight: 'bold',
    marginTop: 55,
  },
  desc: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  desc_title: {
    fontSize: 18,
    color: '#626058',
  },
  desc_date: {
    fontSize: 14,
    color: '#626058',
    marginTop: 10,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  edit: {
    color: '#F9C201',
    fontSize: 14,
  },
  delete: {
    color: '#626058',
    fontSize: 14,
    marginTop: 20,
  },
});

export default ExpenseDisplay;
