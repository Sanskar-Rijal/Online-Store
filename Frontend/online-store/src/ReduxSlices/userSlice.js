import { createSlice } from "@reduxjs/toolkit";

//just like reducer first we define initial state
const initialStateUser = {
  user: null,
  isAuthenticatd: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticatd = action.payload;
    },
  },
});

export const { setUser, setIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;
