import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

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
            if (state.whiteTurn) {
                state.whiteTurn = false;
            } else {
                state.whiteTurn = true;
            }
        },
    },
});

export const { swapTurn } = turnSlice.actions;

export default turnSlice.reducer;
