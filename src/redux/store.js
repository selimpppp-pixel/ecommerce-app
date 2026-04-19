import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import cartReducer from "./slices/cartSlice"; // 👈 ضيفي ده

const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer, // 👈 ضيفي ده
  },
});

export default store;