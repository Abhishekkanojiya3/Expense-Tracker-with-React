import { createSlice } from '@reduxjs/toolkit';

const initialExpenseState = {
    expense: [],
    totalSpent: 0,
    isForm: false,
    leaderboardData: [],
    downloadHistory: []
};

const expenseSlice = createSlice({
    name: 'dailyexpense',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            state.expense = action.payload.newExpense;
            state.totalSpent = action.payload.totalSpent;
            console.log(state)
        },
        setLeaderBoardData(state, action) {
            state.leaderboardData = action.payload
        },
        setDownloadHistory(state, action) {
            state.downloadHistory = action.payload
        },
        setIsForm(state, action) {
            state.isForm = action.payload
        },
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;