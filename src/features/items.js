import {createSlice} from '@reduxjs/toolkit';

export const ItemcardSlice = createSlice({
  name: 'ItemCard',
  initialState: {value: []},
  reducers: {
    loadData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {addExpense, updateExpense, deleteExpense, loadData} =
  ItemcardSlice.actions;

export default ItemcardSlice.reducer;
