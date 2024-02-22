import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

// Async thunk to fetch the user's cart e
export const fetchCart = createAsyncThunk("cart/fetchCart", async (token) => {
  const fetchUrl = `${baseUrl}/cart`;
  try {
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
});

// Async thunk to add a product
export const addToCart = createAsyncThunk("cart/addToCart", async (data) => {
  const fetchUrl = `${baseUrl}/cart`;
  try {
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.token}`,
      },
      body: JSON.stringify(data?.body),
    });
    const res = await response.json();
    return res;
  } catch (e) {
    console.log(e);
  }
});

// Async thunk to delete a product
export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (token, productId = "") => {
    let fetchUrl = `${baseUrl}/cart`;
    if (productId) {
      fetchUrl = `${baseUrl}/cart?productId=${productId}`;
    }
    try {
      const response = await fetch(fetchUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      return res;
    } catch (e) {
      console.log(e);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {},
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
        state.cart = action.payload.data;
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
