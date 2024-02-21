import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import categorieReducer from "./categorieSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    categorie: categorieReducer,
  },
});

export default store;
