import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {

    token: localStorage.getItem("token"),
    //   email: localStorage.getItem("email"),
    isLoggedIn: !!localStorage.getItem("email")
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            //      state.email = action.payload.email;
            localStorage.setItem("token", state.token);
            //    localStorage.setItem("email", state.email);
            state.isLoggedIn = true;
            //            console.log("Logged in with email:", state.email);

        },
        logout(state, action) {
            state.token = null;
            //   state.email = null;
            localStorage.removeItem("token");
            //  localStorage.removeItem("email");
            state.isLoggedIn = false;
            state = null;

        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;