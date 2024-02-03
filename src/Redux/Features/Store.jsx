import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import ProductSlice from "./ProductSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    Products: ProductSlice,
  },
});
