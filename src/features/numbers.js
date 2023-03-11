import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATEVALUE = {balance: 0, income: 0, expense: 0};

export const NumbersSlice = createSlice({
    name: "Numbers",
    initialState: { value: {} },
    reducers: { 
        addIncome: (state, action) => {
            console.log(action.payload.income)
            const balance = parseInt(state.value.balance) + parseInt(action.payload.income);
            const income = parseInt(state.value.income) + parseInt(action.payload.income);
            state.value = {balance: balance.toString(), income: income.toString(), expense: state.value.expense}
        },

        updateIncome: (state, action) => {
            if(parseInt(state.value.income) > parseInt(action.payload.income)) {
                const balance = parseInt(state.value.balance) - (parseInt(state.value.income) - parseInt(action.payload.income))
                state.value.balance = balance.toString(); 
                state.value.income = action.payload.income;
            }
            else if(parseInt(state.value.income) < parseInt(action.payload.income)) {
                const balance = parseInt(state.value.balance) + (parseInt(action.payload.income) - parseInt(state.value.income));
                state.value.balance = balance.toString();
                state.value.income = action.payload.income;
            }
            else{
                state.value.income = action.payload.income;
            } 
        },

        addExpen: (state, action) => {
            state.value.balance = (parseInt(state.value.balance) - parseInt(action.payload.expense)).toString();
            state.value.expense = (parseInt(state.value.expense) + parseInt(action.payload.expense)).toString();
        },

        expenseUpdate: (state, action) => {
            if (action.payload.bal_add) {
                state.value.balance = (parseInt(state.value.balance) + parseInt(action.payload.amount)).toString();
                state.value.expense = (parseInt(state.value.expense) - parseInt(action.payload.amount)).toString();
            }
            else{
                state.value.balance = (parseInt(state.value.balance) - parseInt(action.payload.amount)).toString();
                state.value.expense = (parseInt(state.value.expense) + parseInt(action.payload.amount)).toString();
            }
        },

        loadValues: (state, action) => {
            state.value = action.payload
        }
    }
}) 

export const {addIncome, updateIncome, addExpen, expenseUpdate, loadValues} = NumbersSlice.actions;

export default NumbersSlice.reducer;



