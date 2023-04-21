import { createSlice } from '@reduxjs/toolkit';

const initialExpenseState = {
    expense: [],
    totalSpent: 0,
    isForm: false,
    leaderboardData: []
};

const expenseSlice = createSlice({
    name: 'dailyexpense',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            state.expense = action.payload.newExpense;
            state.totalSpent = action.payload.totalSpent;
        },
        setLeaderBoardData(state, action) {
            state.leaderboardData = action.payload
        }
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;