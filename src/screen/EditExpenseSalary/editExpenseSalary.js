import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateExpense} from '../../features/items';
import {updateIncome} from '../../features/numbers';
import {expenseUpdate} from '../../features/numbers';
import {loadData} from '../../features/items';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditExpenseSalaryComponent = props => {
  const {id, amt} = props.route.params;

  const alldata = useSelector(state => state.ItemCard.value);
  const values = useSelector((state) => state.Numbers.value);

  const dispatch = useDispatch();

  const [selected, setSelected] = useState('expense');
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
      console.log('use effect called in add screen');
      var dateObj = new Date();
      var month = dateObj.toLocaleString('default', {month: 'long'});
      var monthint = dateObj.getMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      const currentdate = month + ' ' + day + ',' + year;
      const timestamp = monthint + '-' + day + '-' + year;
      console.log(timestamp);
      setDate(currentdate);
      setTimestamp(timestamp);
    }

    function getdata(data) {
      console.log('use effect called in expenses display page');
      data.forEach(item => {
        if (item.timestamp === id) {
          setAmount(item.info.amt);
          setDescription(item.info.content);
        }
      });
    }
    getTodayDate();
    getdata(alldata);
  }, []);

  const UpdateData = async(updatedvalue) => {
    try {
      await AsyncStorage.mergeItem(id, JSON.stringify(updatedvalue));
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateIncomeValues = async() => {
    console.log("update income value invoked");
    let balance = 0;
    let income = 0;

    if(parseInt(values.income) > amount) {
      balance = parseInt(values.balance) - (parseInt(values.income) - amount)
      income = amount;
    }
    else if(parseInt(values.income) < amount) {
        balance = parseInt(values.balance) + (amount - parseInt(values.income));
        income = amount;
    }
    else{
        balance = values.balance;
        income = amount;
    }; 
    const val = {balance: balance.toString(), income: income.toString(), expense: values.expense};
    try{
      const jsonValue = JSON.stringify(val);
      await AsyncStorage.mergeItem('values', jsonValue);
    }catch(e) {
      console.log(e);
    }
  };

  const UpdateExpenseValues = async(diff, bal_add) => {
    console.log("update expense value invoked");
    let balance = 0;
    let expense = 0;

    if (bal_add) {
      balance = (parseInt(values.balance) + diff);
      expense = (parseInt(values.expense) - diff);
  }
    else{
        balance = (parseInt(values.balance) - diff);
        expense = (parseInt(values.expense) + diff);
    }
    
    const val = {balance: balance.toString(), income: values.income, expense: expense.toString()};
    try{
      const jsonValue = JSON.stringify(val);
      await AsyncStorage.mergeItem('values', jsonValue);
    }catch(e) {
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

  const UpdateExpense = () => {
    const newExpense = {
      id: id,
      content: desc,
      amt: amount,
      date: date,
      timestamp: timestamp,
      deducted: true,
    };
    UpdateData(newExpense);
    GetData();
    // dispatch(updateExpense(newExpense));
    if (amt > amount) {
      const diff = parseInt(amt) - parseInt(amount);
      dispatch(expenseUpdate({amount: diff.toString(), bal_add: true}));
      UpdateExpenseValues(diff, true);
    } else if (amount > amt) {
      const diff = parseInt(amount) - parseInt(amt);
      dispatch(expenseUpdate({amount: diff.toString(), bal_add: false}));
      UpdateExpenseValues(diff, false);
    }
    props.navigation.navigate('home');
  };

  const UpdateIncome = () => {
    const newExpense = {
      id: id,
      content: desc,
      amt: amount,
      date: date,
      timestamp: timestamp,
      deducted: false,
    };
    UpdateData(newExpense);
    GetData();
    // dispatch(updateExpense(newExpense));
    dispatch(updateIncome({income: amount.toString()}));
    UpdateIncomeValues();
    props.navigation.navigate('home');
  };

  const ExpenseOnPress = () => {
    setSelected('expense');
    console.log(selected);
  };

  const IncomeOnPress = () => {
    setSelected('income');
    console.log(selected);
  };

  const AmountFocused = () => {
    setInputSelected({
      amount: 'true',
      desc: 'false',
      date: 'false',
    });
    console.log(inputSelected.amount);
  };

  const DescFocused = () => {
    setInputSelected({
      amount: 'false',
      desc: 'true',
      date: 'false',
    });
    console.log(inputSelected.amount);
  };

  const DateFocused = () => {
    setInputSelected({
      amount: 'false',
      desc: 'false',
      date: 'true',
    });
    console.log(inputSelected.amount);
  };

  return (
    <View style={styles.rootView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Income/Expense</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('home')}>
            <Text style={styles.cross}>x</Text>
          </TouchableOpacity>
        </View>

        {/* //Segmented Button */}

        <View style={styles.button}>
          <TouchableOpacity onPress={IncomeOnPress}>
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
          <TouchableOpacity onPress={ExpenseOnPress}>
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
          onFocus={AmountFocused}
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
          onFocus={DescFocused}
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
          onFocus={DateFocused}
          value={date}
          onChangeText={val => setDate(val)}
        />

        <TouchableOpacity
          onPress={selected === 'expense' ? UpdateExpense : UpdateIncome}>
          <Text style={styles.save_button}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: 'darkorange',
  },
  container: {
    backgroundColor: 'white',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#626058',
    fontSize: 18,
    width: '60%',
    flex: 1,
    textAlign: 'center',
  },
  cross: {
    color: '#626058',
    fontSize: 30,
    fontWeight: 'bold',
  },

  //Button
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 25,
  },

  // Button Selected
  incomeView_selected: {
    padding: 12,
    backgroundColor: '#F9C201',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  income_selected: {
    color: 'white',
    fontSize: 14,
  },
  expenseView_selected: {
    padding: 12,
    backgroundColor: '#F9C201',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  expense_selected: {
    color: 'white',
    fontSize: 14,
  },

  // Button Unselected
  incomeView_unselected: {
    padding: 12,
    backgroundColor: '#E9E9E9',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  income_unselected: {
    color: '#626058',
    fontSize: 14,
  },
  expenseView_unselected: {
    padding: 12,
    backgroundColor: '#E9E9E9',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  expense_unselected: {
    color: '#626058',
    fontSize: 14,
  },

  // inputUnselected
  input_unselected: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    marginTop: 25,
    color: 'black',
  },

  // input selected
  input_selected: {
    borderColor: '#F9C201',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 16,
    marginTop: 25,
    color: 'black',
  },

  // Save Button

  save_button: {
    color: '#F9C201',
    fontSize: 16,
    marginTop: 25,
    textAlign: 'center',
  },
});

export default EditExpenseSalaryComponent;
