import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  email: string;
  password: string;
  isAuth: boolean;
}

const initialState: IAuthState = {
  email: "",
  password: "",
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAuth = true;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
