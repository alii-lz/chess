import React from "react";
// import Pawn from "../Images/Pawn.svg";
// import Rook from "../Images/Rook.svg";
import { Cell, Piece } from "../Types/Cell.ts";

const initialBoard = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const boardInit = () => {
    const chessBoard: Cell[] = [];

    for (let i = 1; i <= 64; i++) {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const isWhiteSquare = (row + col) % 2 === 0;
        const isWhitePiece = row >= 7;

        let pieceType = "";

        if (row === 2 || row === 7) {
            pieceType = "Pawn";
        }

        if (row === 1 || row === 8) {
            if (col === 1 || col === 8) {
                pieceType = "Rook";
            } else if (col === 2 || col === 7) {
                pieceType = "Knight";
            } else if (col === 3 || col === 6) {
                pieceType = "Bishop";
            }

            // Set black King and Queen
            if (row === 1) {
                if (col === 4) {
                    pieceType = "Queen";
                } else if (col === 5) {
                    pieceType = "King";
                }
            }

            // Set white King and Queen
            if (row === 8) {
                if (col === 4) {
                    pieceType = "King";
                } else if (col === 5) {
                    pieceType = "Queen";
                }
            }
        }

        const piece: Piece = {
            color: isWhitePiece ? "#cdb081" : "#483624",
            type: pieceType,
        };

        const cell: Cell = {
            color: isWhiteSquare ? "#cdb081" : "#483624",
            currentPiece: piece,
            position: i,
        };

        chessBoard.push(cell);
    }
};

export default boardInit;
