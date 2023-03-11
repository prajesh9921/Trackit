import {createSlice} from '@reduxjs/toolkit';

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

export const {addExpense, updateExpense, deleteExpense, loadData} =
  ItemcardSlice.actions;

export default ItemcardSlice.reducer;
