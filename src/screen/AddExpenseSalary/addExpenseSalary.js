import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';
import random from 'random-key-generator';
import {
  ExpenseOnPress,
  IncomeOnPress,
  AmountFocused,
  DescFocused,
  DateFocused,
  AddExpense,
  AddIncome,
} from './components';

const ExpenseSalaryComponent = ({navigation}) => {
  const values = useSelector(state => state.Numbers.value);
  const [selected, setSelected] = useState('income');
  const [inputSelected, setInputSelected] = useState({
    amount: 'false',
    desc: 'false',
    date: 'false',
  });
  const [amount, setAmount] = useState('');
  const [desc, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    function getTodayDate() {
      var dateObj = new Date();
      var month = dateObj.toLocaleString('default', {month: 'long'});
      var monthint = dateObj.getMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      const currentdate = month + ' ' + day + ',' + year;
      const timestamp = monthint + '-' + day + '-' + year;
      setDate(currentdate.toString());
      setTimestamp(timestamp.toString());
    }

    getTodayDate();
  }, []);

  const newExpense = {
    content: desc,
    amt: amount,
    date: date,
    timestamp: timestamp,
    deducted: selected == 'expense' ? true : false,
  };

  return (
    <View style={styles.rootView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Income/Expense</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cross}>x</Text>
          </TouchableOpacity>
        </View>

        {/* //Segmented Button */}

        <View style={styles.button}>
          <TouchableOpacity onPress={() => IncomeOnPress(setSelected)}>
            <View
              style={
                selected == 'income'
                  ? styles.incomeView_selected
                  : styles.incomeView_unselected
              }>
              <Text
                style={
                  selected == 'income'
                    ? styles.income_selected
                    : styles.income_unselected
                }>
                Income
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ExpenseOnPress(setSelected)}>
            <View
              style={
                selected == 'expense'
                  ? styles.expenseView_selected
                  : styles.expenseView_unselected
              }>
              <Text
                style={
                  selected == 'expense'
                    ? styles.expense_selected
                    : styles.expense_unselected
                }>
                Expense
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TextInput
          style={
            inputSelected.amount == 'false'
              ? styles.input_unselected
              : styles.input_selected
          }
          placeholder="Amount"
          placeholderTextColor="#D3D3D3"
          underlineColorAndroid="transparent"
          onFocus={() => AmountFocused(setInputSelected)}
          keyboardType="numeric"
          onChangeText={value => setAmount(value)}
        />
        <TextInput
          style={
            inputSelected.desc == 'false'
              ? styles.input_unselected
              : styles.input_selected
          }
          placeholder="Description"
          placeholderTextColor="#D3D3D3"
          underlineColorAndroid="transparent"
          onFocus={() => DescFocused(setInputSelected)}
          onChangeText={value => setDescription(value)}
        />
        <TextInput
          style={
            inputSelected.date == 'false'
              ? styles.input_unselected
              : styles.input_selected
          }
          placeholder="Date"
          placeholderTextColor="#D3D3D3"
          underlineColorAndroid="transparent"
          onFocus={() => DateFocused(setInputSelected)}
          value={date}
          onChangeText={value => setDate(value)}
        />
        <TouchableOpacity
          onPress={() => {
            amount == '' || desc == '' || date == '' || isNaN(amount)
              ? console.warn('please enter a valid input')
              : selected === 'expense'
              ? AddExpense(
                  newExpense,
                  selected,
                  values,
                  amount,
                  navigation,
                  timestamp,
                  random,
                )
              : AddIncome(
                  newExpense,
                  selected,
                  values,
                  amount,
                  navigation,
                  timestamp,
                  random,
                );
          }}>
          <Text style={styles.save_button}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExpenseSalaryComponent;
