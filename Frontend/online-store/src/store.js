import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./ReduxSlices/cartSlice";
import userReducer from "./ReduxSlices/userSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
