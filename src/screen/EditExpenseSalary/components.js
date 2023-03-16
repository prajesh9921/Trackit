import AsyncStorage from '@react-native-async-storage/async-storage';

  const AmountFocused = (setInputSelected) => {
    setInputSelected({
      amount: 'true',
      desc: 'false',
      date: 'false',
    });
  };

  const DescFocused = (setInputSelected) => {
    setInputSelected({
      amount: 'false',
      desc: 'true',
      date: 'false',
    });
  };

  const DateFocused = (setInputSelected) => {
    setInputSelected({
      amount: 'false',
      desc: 'false',
      date: 'true',
    });
  };

  const UpdateData = async (id, updatedvalue) => {
    try {
      await AsyncStorage.mergeItem(id, JSON.stringify(updatedvalue));
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateValuesAfterEdit = async(deducted, values, amt, amount) => {
    if (deducted){
      const expense =  (parseInt(values.expense) - parseInt(amt)) + parseInt(amount);
      const income = parseInt(values.income);
      const balance = income - expense;
      const val = {
        balance: balance.toString(),
        income: income.toString(),
        expense: expense.toString(),
      };
      try {
        const jsonValue = JSON.stringify(val);
        await AsyncStorage.mergeItem('values', jsonValue);
      } catch (e) {
        console.log(e);
      }
    } else {
      const expense =  parseInt(values.expense);
      const income = (parseInt(values.income) - parseInt(amt)) + parseInt(amount);
      const balance = income - expense;
      const val = {
        balance: balance.toString(),
        income: income.toString(),
        expense: expense.toString(),
      };
      try {
        const jsonValue = JSON.stringify(val);
        await AsyncStorage.mergeItem('values', jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
  }

  const UpdateExpense = (id, newExpense, deducted, values, amt, amount, navigation) => {  
    console.log("edit screen newexpense", newExpense)
    UpdateData(id, newExpense);
    UpdateValuesAfterEdit(deducted, values, amt, amount);
    navigation.navigate('home');
  };

  const UpdateIncome = (id, newExpense, deducted, values, amt, amount, navigation) => {
    console.log("edit screen newexpense", newExpense)
    UpdateData(id, newExpense);
    UpdateValuesAfterEdit(deducted, values, amt, amount);
    navigation.navigate('home');
  };

export {AmountFocused, DescFocused, DateFocused, UpdateExpense, UpdateIncome};
