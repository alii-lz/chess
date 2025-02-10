import { configureStore } from "@reduxjs/toolkit";
import turnReducer from "./TurnSlice.ts";

export const store = configureStore({
    reducer: {
        turn: turnReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
