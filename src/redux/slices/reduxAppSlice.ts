import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface reduxAppSlice {
  isGlobalLoading: boolean,
  language: string,
}

const initialState: reduxAppSlice = {
  isGlobalLoading: true,
  language: "en"
}

const reduxApp = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.isGlobalLoading = action.payload;
    }
  }
});

export const {setGlobalLoading} = reduxApp.actions;

export default reduxApp.reducer
