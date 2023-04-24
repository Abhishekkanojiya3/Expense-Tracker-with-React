import { createSlice } from "@reduxjs/toolkit";

const initialIsPremium = localStorage.getItem('isPremium')
console.log("initial ", typeof initialIsPremium)
const convertToBooleanIsPremium = (initialIsPremium === "true")
const initialActivePage = localStorage.getItem('activePage')
const initialLimit = localStorage.getItem('limit')

const initialAuthState = {

    token: localStorage.getItem("token"),
    //   email: localStorage.getItem("email"),
    isLoggedIn: !!localStorage.getItem("email"),
    isPremium: convertToBooleanIsPremium,
    activePage: initialActivePage,
    limit: initialLimit,
    total: 0
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.isPremium = action.payload.isPremium;
            //      state.email = action.payload.email;
            localStorage.setItem("token", state.token);
            localStorage.setItem('isPremium', action.payload.isPremium)
            state.activePage = 1
            localStorage.setItem('activePage', state.activePage)
            localStorage.setItem('limit', 5)
            state.limit = 5;
            //    localStorage.setItem("email", state.email);
            state.isLoggedIn = true;
            //            console.log("Logged in with email:", state.email);

        },
        logout(state, action) {
            state.token = null;
            //   state.email = null;
            localStorage.removeItem("token");
            localStorage.removeItem('isPremium')
            localStorage.removeItem('activePage')
            localStorage.removeItem('limit')
                //  localStorage.removeItem("email");
            state.isLoggedIn = false;
            state = null;

        },
        setActivePage(state, action) {
            state.activePage = action.payload;
            localStorage.setItem('activePage', action.payload)
        },
        setLimit(state, action) {
            state.limit = action.payload
            localStorage.setItem('limit', action.payload)
        },
        setTotal(state, action) {
            state.total = action.payload
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;