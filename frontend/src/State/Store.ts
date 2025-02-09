import { configureStore } from "@reduxjs/toolkit";
import { TurnState } from "./TurnSlice";

export const store = configureStore({
    reducer: {
        turn: TurnState,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
