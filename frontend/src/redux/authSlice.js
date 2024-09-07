import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  userDetails: {},
};

const AuthSlice = createSlice({
  name: "auth slice",
  initialState,
  reducers: {
    Loading(state, action) {
      console.log(action);
      state.isLoading = action.payload;
    },
    isError(state) {
      state.isLoading = false;
      state.isError = true;
    },
    userInfo(state, action) {
      console.log(action.payload);
      state.userDetails = action.payload;
    },
  },
});
export const { Loading, isError, userInfo } = AuthSlice.actions;

export default AuthSlice.reducer;
