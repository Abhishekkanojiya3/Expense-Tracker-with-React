import { createSlice } from '@reduxjs/toolkit';

const initialExpenseState = {
    expense: [],
    totalSpent: 0
};

const expenseSlice = createSlice({
    name: 'dailyexpense',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            state.expense = action.payload.newExpense;
            state.totalSpent = action.payload.totalSpent;
        }
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;