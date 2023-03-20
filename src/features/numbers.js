import {createSlice} from '@reduxjs/toolkit';

export const NumbersSlice = createSlice({
  name: 'Numbers',
  initialState: {value: {}},
  reducers: {
    loadValues: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
  loadValues,
} = NumbersSlice.actions;

export default NumbersSlice.reducer;
