import { configureStore } from "@reduxjs/toolkit";
import achievementsSlice from "./ac.slice";

const store = configureStore({
  reducer: {
    achievements: achievementsSlice,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
