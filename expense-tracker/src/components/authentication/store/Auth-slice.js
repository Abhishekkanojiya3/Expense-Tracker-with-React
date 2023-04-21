import { createSlice } from "@reduxjs/toolkit";

const initialIsPremium = localStorage.getItem('isPremium')
console.log("initial ", typeof initialIsPremium)
const convertToBooleanIsPremium = (initialIsPremium === "true")

const initialAuthState = {

    token: localStorage.getItem("token"),
    //   email: localStorage.getItem("email"),
    isLoggedIn: !!localStorage.getItem("email"),
    isPremium: convertToBooleanIsPremium
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
                //    localStorage.setItem("email", state.email);
            state.isLoggedIn = true;
            //            console.log("Logged in with email:", state.email);

        },
        logout(state, action) {
            state.token = null;
            //   state.email = null;
            localStorage.removeItem("token");
            localStorage.removeItem('isPremium')
                //  localStorage.removeItem("email");
            state.isLoggedIn = false;
            state = null;

        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;