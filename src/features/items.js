import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIALSTATEVALUE = [
  {
    id: 0,
    content: 'Added car fuel',
    amt: '256',
    date: 'March 9,2023',
    timestamp: '9-3-2023',
    deducted: true,
  },
  {
    id: 1,
    content: 'Removed car fuel',
    amt: '234',
    date: 'March 9,2023',
    timestamp: '9-3-2023',
    deducted: true,
  },
  {
    id: 2,
    content: 'bought groceries',
    amt: '56',
    date: 'March 9,2023',
    timestamp: '9-3-2023',
    deducted: true,
  },
];

export const ItemcardSlice = createSlice({
  name: 'ItemCard',
  initialState: {value: []},
  reducers: {
    addExpense: (state, action) => {
      state.value.push(action.payload);
    },

    updateExpense: (state, action) => {
      const index = state.value.findIndex(item => {
        return item.id === action.payload.id;
      });
      console.log(index);
      state.value[index] = action.payload;
    },

    deleteExpense: (state, action) => {
      const index = state.value.findIndex(item => {
        return item.id === action.payload.id;
      });
      state.value.splice(index, 1);
      console.log(state.value);
    },

    loadData: (state, action) => {
        state.value = action.payload;
    },
  },
});

export const {addExpense, updateExpense, deleteExpense, loadData} = ItemcardSlice.actions;

export default ItemcardSlice.reducer;
