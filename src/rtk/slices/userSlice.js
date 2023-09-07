import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: null,
};


export const userSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    signOutUser: (state) => {
      state.userInfo = null
    },
  },
});

export const {
  setUserInfo,
  signOutUser
} = userSlice.actions;
export default userSlice.reducer;
