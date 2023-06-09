import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';
import {
  AmountFocused,
  DescFocused,
  DateFocused,
  UpdateExpense,
  UpdateIncome,
} from './components';

const EditExpenseSalaryComponent = ({navigation, route}) => {
  const {id, amt, deducted} = route.params;
  const alldata = useSelector(state => state.ItemCard.value);
  const values = useSelector(state => state.Numbers.value);
  const [inputSelected, setInputSelected] = useState({
    amount: 'false',
    desc: 'false',
    date: 'false',
  });
  const [amount, setAmount] = useState('');
  const [desc, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [selected, setSelected] = useState(deducted ? 'expense' : 'income');

  useEffect(() => {
    function getTodayDate() {
      var dateObj = new Date();
      var monthint = dateObj.getMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      const timestamp = monthint + '-' + day + '-' + year;
      console.log(timestamp);
      setTimestamp(timestamp);
    }

    function getdata(data) {
      data.forEach(item => {
        if (item.timestamp === id) {
          setAmount(item.info.amt);
          setDescription(item.info.content);
          setDate(item.info.date);
        }
      });
    }

    getTodayDate();
    getdata(alldata);
  }, []);

  const newExpense = {
    content: desc,
    amt: amount,
    date: date,
    timestamp: timestamp,
    deducted: deducted,
  };

  return (
    <View style={styles.rootView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Income/Expense</Text>
          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Text style={styles.cross}>x</Text>
          </TouchableOpacity>
        </View>

        {/* //Segmented Button */}

        <View style={styles.button}>
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
          value={amount}
          keyboardType="numeric"
          onChangeText={val => setAmount(val)}
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
          value={desc}
          onChangeText={val => setDescription(val)}
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
          onChangeText={val => setDate(val)}
        />

        <TouchableOpacity
          onPress={() => {
            isNaN(amount)
              ? console.warn('please enter a valid input')
              : deducted
              ? UpdateExpense(
                  id,
                  newExpense,
                  deducted,
                  values,
                  amt,
                  amount,
                  navigation,
                )
              : UpdateIncome(
                  id,
                  newExpense,
                  deducted,
                  values,
                  amt,
                  amount,
                  navigation,
                );
          }}>
          <Text style={styles.save_button}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditExpenseSalaryComponent;
