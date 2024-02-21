import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    category: categoryReducer,
  },
});

export default store;
