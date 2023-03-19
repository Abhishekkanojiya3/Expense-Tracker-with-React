import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    theme: false
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        toggleTheme(state) {
            state.theme = !state.theme;
        },
        offTheme(state) {
            state.theme = false;
        },
        onTheme(state) {
            state.theme = true;
        },

    }
})
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;