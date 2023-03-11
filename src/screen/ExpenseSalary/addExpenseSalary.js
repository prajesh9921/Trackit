import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch , useSelector} from "react-redux";
import { addExpense, loadData } from '../../features/items';
import { addIncome } from '../../features/numbers';
import { addExpen } from '../../features/numbers';
import random from 'random-key-generator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseSalaryComponent = ({navigation}) => {

    const alldata = useSelector((state) => state.ItemCard.value);
    const values = useSelector((state) => state.Numbers.value);

    const dispatch = useDispatch();

    const [selected, setSelected] = useState("expense");
    const [inputSelected, setInputSelected] = useState({
        amount: "false",
        desc: "false",
        date: "false",
    });
    const [amount, setAmount] = useState("");
    const [desc, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [timestamp, setTimestamp] = useState("");

    useEffect(() => {
      function getTodayDate () {
        console.log("use effect called in add screen")
        var dateObj = new Date();
        var month = dateObj.toLocaleString('default', { month: 'long' });
        var monthint = dateObj.getMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        const currentdate = month + " " + day + "," + year;
        const timestamp = monthint + "-" + day + "-" + year;
        console.log(timestamp);
        setDate(currentdate.toString());
        setTimestamp(timestamp.toString());
      };

      getTodayDate();
    },[])

    const GetData = async() => {
     try{
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys)

      const data = result.map((item) => {
        return {timestamp: item[0], info: JSON.parse(item[1])};
      })
      dispatch(loadData(data));
     } catch (error) {
         console.error(error);
      }
    }

    const AddData = async(value) => {
      const key = random.getRandom(4, timestamp, '-', 'front');
      try{
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue);
        console.log("data added");
      } catch(err){
        console.log(err);
      }
    }

    const AddExpenseValues = async() => {
      console.log("add expense values invoked");
      const balance = parseInt(values.balance) - amount;
      const expense = parseInt(values.expense) + amount 
      const val = {balance: balance.toString(), income: values.income, expense: expense.toString()};
      try{
        const jsonValue = JSON.stringify(val);
        await AsyncStorage.mergeItem('values', jsonValue);
      }catch(e) {
        console.log(e);
      }
    };

    const AddIncomeValues = async() => {
      console.log("add income values invoked");
      const balance = parseInt(values.balance) + amount;
      const income = parseInt(values.income) + amount 
      const val = {balance: balance.toString(), income: income.toString(), expense: values.expense};
      try{
        const jsonValue = JSON.stringify(val);
        await AsyncStorage.mergeItem('values', jsonValue);
      }catch(e) {
        console.log(e);
      }
    };

    const AddExpense = () => {
      const idx = alldata.length;
      const newExpense = {id: idx, content: desc, amt: amount, date: date, timestamp: timestamp, deducted: true}
      AddData(newExpense)
      GetData();
      // dispatch(addExpense(newExpense));
      dispatch(addExpen({expense: amount.toString()}))
      AddExpenseValues();
      navigation.goBack();
    }

    const AddIncome = () => {
      const idx = alldata.length;
      const newExpense = {id: idx, content: desc, amt: amount, date: date, timestamp: timestamp, deducted: false}
      AddData(newExpense)
      GetData();
      // dispatch(addExpense(newExpense));
      dispatch(addIncome({income: amount.toString()}))
      AddIncomeValues();
      navigation.goBack();
    }

    const ExpenseOnPress = () => {
        setSelected("expense");
        console.log(selected)
    }

    const IncomeOnPress = () => {
        setSelected("income");
        console.log(selected)
    }

    const AmountFocused = () => {
        setInputSelected({
            amount: "true",
            desc: "false",
            date: "false"
        })
        console.log(inputSelected.amount);
    }

    const DescFocused = () => {
        setInputSelected({
            amount: "false",
            desc: "true",
            date: "false"
        })
        console.log(inputSelected.amount);
    }

    const DateFocused = () => {
        setInputSelected({
            amount: "false",
            desc: "false",
            date: "true"
        })
        console.log(inputSelected.amount);
    }

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
                <TouchableOpacity onPress={IncomeOnPress}>
                    <View style={selected == "income" ? styles.incomeView_selected : styles.incomeView_unselected}>
                        <Text style={selected == 'income' ? styles.income_selected : styles.income_unselected}>Income</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ExpenseOnPress}>
                    <View style={selected == 'expense' ? styles.expenseView_selected : styles.expenseView_unselected}>
                        <Text style={selected == 'expense' ? styles.expense_selected : styles.expense_unselected}>Expense</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TextInput 
                style= {inputSelected.amount == 'false' ? styles.input_unselected : styles.input_selected}
                placeholder="Amount"
                placeholderTextColor="#D3D3D3"
                underlineColorAndroid="transparent"
                onFocus={AmountFocused}
                keyboardType="numeric"
                onChangeText={(value) => setAmount(value)}  
            />
            <TextInput 
                style= {inputSelected.desc == 'false' ? styles.input_unselected : styles.input_selected}
                placeholder="Description"
                placeholderTextColor="#D3D3D3"
                underlineColorAndroid="transparent"  
                onFocus={DescFocused}
                onChangeText={(value) => setDescription(value)}  

            />
            <TextInput 
                style= {inputSelected.date == 'false' ? styles.input_unselected : styles.input_selected}
                placeholder="Date"
                placeholderTextColor="#D3D3D3"
                underlineColorAndroid="transparent"
                onFocus={DateFocused}
                value={date}
                onChangeText={(value) => setDate(value)}  
            />

            <TouchableOpacity
               onPress={selected === "expense" ? AddExpense : AddIncome}
              // onPress={GetData}
            >
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
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 25
  },

  // Button Selected 
  incomeView_selected: {
    padding: 12,
    backgroundColor: "#F9C201",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8
  },
  income_selected: {
    color: "white",
    fontSize: 14
  },
  expenseView_selected: {
    padding: 12,
    backgroundColor: "#F9C201",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8
  },
  expense_selected:{
    color: "white",
    fontSize: 14
  },

  // Button Unselected
  incomeView_unselected: {
    padding: 12,
    backgroundColor: "#E9E9E9",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8
  },
  income_unselected: {
    color: "#626058",
    fontSize: 14
  },
  expenseView_unselected: {
    padding: 12,
    backgroundColor: "#E9E9E9",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8
  },
  expense_unselected: {
    color: "#626058",
    fontSize: 14
  },

  // inputUnselected
  input_unselected: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    marginTop: 25,
    color: "black",
  },

  // input selected
  input_selected: {
    borderColor: "#F9C201",
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 16,
    marginTop: 25,
    color: "black",
  },

  // Save Button

  save_button: {
    color: "#F9C201",
    fontSize: 16,
    marginTop: 25,
    textAlign: "center",
  }
});

export default ExpenseSalaryComponent;
