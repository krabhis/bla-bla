import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
        post:postSliceReducer,
    }
})

export default store;