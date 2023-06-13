import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    dark: boolean
}
const initialState: initialStateType = {
    dark: false
}
const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:
    {
        
        changeTheme: (state) => {
            state.dark = !state.dark
        }
    }
})

export const { changeTheme } = ThemeSlice.actions
export default ThemeSlice.reducer