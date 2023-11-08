import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./user";

export const store = configureStore({
    reducer: {
        dataSlice
    },
});