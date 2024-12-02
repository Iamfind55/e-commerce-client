import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    address: "",
    balance: 0,
    createdAt: "",
    createdBy: "",
    email: "",
    firstName: "",
    gender: "",
    id: "",
    lastName: "",
    password: "",
    phone: "",
    profile: "",
    status: "",
    updatedAt: "",
    dob: "",
  },
};

export const Authslice = createSlice({
  name: "AuthSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
    auth: (state) => {
      state.user;
    },
  },
});

export const { login, logout, auth } = Authslice.actions;
export default Authslice.reducer;
