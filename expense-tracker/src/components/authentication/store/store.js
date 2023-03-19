import { configureStore } from "@reduxjs/toolkit";

import authReducer from './Auth-slice';
import expenseReducer from './Expense-slice'
import themeReducer from './Theme-slice';

const store = configureStore({
    reducer: { auth: authReducer, expense: expenseReducer, theme: themeReducer }
});

export default store;