import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from "../redux/slices/userSlice";
import appReducer from "../redux/slices/reduxAppSlice";

function saveToLocalStorage(state: any) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistentState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistentState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e)
    return undefined;
  }
}


export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
