import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch the user's cart e
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await fetch(`/cart/${userId}`);
  return response.data;
});

// Async thunk to add a product
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }) => {
    const response = await fetch(`/cart/${userId}/add`, { product });
    return response.data;
  }
);

// Async thunk to delete a product
export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async ({ userId, productId }) => {
    const response = await fetch(`/cart/${userId}/delete`, {
      data: { productId },
    });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      id: "3435353535",
      userId: 1,
      items: [
        {
          productId: 1,
          quantity: 3,
          size: "S",
          id: 1,
          title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          price: 109.95,
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          quantity: 4,
          size: "M",
        },
      ],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//export actions
export const { cartData } = cartSlice.actions;

export default cartSlice.reducer;
