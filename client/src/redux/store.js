import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from "./slices/postSliceReducer"
const store = configureStore({
    reducer:{
        post:postSliceReducer,
    }
})

export default store;