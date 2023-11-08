import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {
        name: "",
        username: "",
        email: "",
        profile: "",
        uid: ""
    },
    data: {}
};

export const dataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
        },
        setData: (state, action) => {
            state.userData = action.payload;
        }
    }
});

export const { setUserData, setData } = dataSlice.actions;

export default dataSlice.reducer;
