import { createSlice } from "@reduxjs/toolkit";

export interface TurnState {
    whiteTurn: boolean;
}

const initialState: TurnState = {
    whiteTurn: true,
};

export const turnSlice = createSlice({
    name: "turn",
    initialState,
    reducers: {
        swapTurn: (state) => {
            state.whiteTurn = !state.whiteTurn;
        },
    },
});

export const { swapTurn } = turnSlice.actions;

export default turnSlice.reducer;
