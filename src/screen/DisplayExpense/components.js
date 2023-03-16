import AsyncStorage from '@react-native-async-storage/async-storage';

const ValuesAfterItemIsDeleted = async(expenseData, values) => {
    if (expenseData.deducted){
      const expense =  parseInt(values.expense) - parseInt(expenseData.amt);
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
      const income = parseInt(values.income) - parseInt(expenseData.amt);
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
  };

  const RemoveValue = async (key, expenseData, values, navigation) => {
    try {
      await AsyncStorage.removeItem(key);
      ValuesAfterItemIsDeleted(expenseData, values);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
    console.log('Item removed.');
  };

  export {RemoveValue};