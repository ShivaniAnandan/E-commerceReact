import { configureStore } from "@reduxjs/toolkit";
import productReducer from './ProductSlice';
import userReducer from './UserSlice';

export const store = configureStore({
    reducer: {
        cart: productReducer,
        user: userReducer,
    }
});
