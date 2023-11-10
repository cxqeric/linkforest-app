import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
    },
    uid: ""
};

export const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
        setUid: (state, action) => {
            state.uid = action.payload;
        }
    }
});

export const { setData, setUid } = userSlice.actions;

export default userSlice.reducer;
