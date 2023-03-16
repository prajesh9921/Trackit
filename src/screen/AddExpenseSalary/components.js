import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseOnPress = setSelected => {
  setSelected('expense');
};

const IncomeOnPress = setSelected => {
  setSelected('income');
};

const AmountFocused = setInputSelected => {
  setInputSelected({
    amount: 'true',
    desc: 'false',
    date: 'false',
  });
};

const DescFocused = setInputSelected => {
  setInputSelected({
    amount: 'false',
    desc: 'true',
    date: 'false',
  });
};

const DateFocused = setInputSelected => {
  setInputSelected({
    amount: 'false',
    desc: 'false',
    date: 'true',
  });
};

const AddValuesToStorage = async (selected, values, amount) => {
    if (selected == 'income'){
      const income = parseInt(values.income) + parseInt(amount);
      const expense = parseInt(values.expense);
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
    else {
      const income = parseInt(values.income);
      const expense = parseInt(values.expense) + parseInt(amount);
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

  const AddData = async (value, timestamp, random) => {
    const key = random.getRandom(4, timestamp, '-', 'front');
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  const AddExpense = (newExpense, selected, values, amount, navigation, timestamp, random) => {
    AddData(newExpense, timestamp, random);
    AddValuesToStorage(selected, values, amount);
    navigation.goBack();
  };

  const AddIncome = (newExpense, selected, values, amount, navigation, timestamp, random) => {
    AddData(newExpense, timestamp, random);
    AddValuesToStorage(selected, values, amount);
    navigation.goBack();
  };

export {ExpenseOnPress, IncomeOnPress, AmountFocused, DescFocused, DateFocused, AddExpense, AddIncome};
