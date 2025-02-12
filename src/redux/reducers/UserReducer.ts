import { createSlice } from "@reduxjs/toolkit";
import { LOGGED_IN_USER } from "../../data/constants";

function getInitialValue() {
  let username = sessionStorage.getItem(LOGGED_IN_USER);
  let parsedUserName = username ? JSON.parse(username) : null;
  return parsedUserName;
}

const initialState: any = {
  value: getInitialValue(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      sessionStorage.setItem(LOGGED_IN_USER, JSON.stringify(action.payload));
      state.value = action.payload;
    },
    handleLogout:(state)=> {
      sessionStorage.clear();
      state.value = null;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedInUser, handleLogout } = userSlice.actions;

export default userSlice.reducer;
