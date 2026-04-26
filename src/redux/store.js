import { configureStore } from "@reduxjs/toolkit";

// slices الحالية
import searchReducer from "./slices/searchSlice";
import cartReducer from "./slices/cartSlice";

// ❤️ favorites
import favoritesReducer from "./slices/favoritesSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    favorites: favoritesReducer, // 👈 الجديد
  },
});

export default store;