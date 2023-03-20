import * as React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screen/Home/home';
import UserInfo from './src/screen/UserDetails/user';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpenseSalaryComponent from './src/screen/AddExpenseSalary/addExpenseSalary';
import EditExpenseSalaryComponent from './src/screen/EditExpenseSalary/editExpenseSalary';
import ExpenseDisplay from './src/screen/DisplayExpense/displayExpense';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ItemCardReducer from "./src/features/items";
import NumberReducer from "./src/features/numbers";

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: {
    ItemCard: ItemCardReducer,
    Numbers: NumberReducer,
  }
}); 

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="UserInfo" component={UserInfo} options={{headerShown: false}}/>
          <Stack.Screen name="AddTask" component={ExpenseSalaryComponent} options={{headerShown: false}}/>
          <Stack.Screen name="EditTask" component={EditExpenseSalaryComponent} options={{headerShown: false}}/>
          <Stack.Screen name="ExpenseDisplay" component={ExpenseDisplay} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
