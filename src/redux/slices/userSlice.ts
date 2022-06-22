import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface userData {
  providerId: string,
  uid: string,
  displayName: string | null,
  email: string | null,
  emailVerified: boolean,
  phoneNumber: string | null,
  photoURL: string | null,
  isAnonymous: boolean,
}

const initialState: userData = {
  providerId: "",
  uid: "",
  displayName: null,
  email: null,
  emailVerified: false,
  phoneNumber: "",
  photoURL: null,
  isAnonymous: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<userData | null>) {
      const userData = action.payload
      return state = {
        ...state,
        ...userData
      }
    },
  }
});

export const { setUserData } = userSlice.actions


export default userSlice.reducer;
