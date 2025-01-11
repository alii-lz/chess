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

const toChessNotation = (position: number) => {
    // Converts 0-7 to 1-8
    const row = 8 - Math.floor(position / 8);
    // Converts 0-7 to a-h
    const col = String.fromCharCode(97 + (position & 8));
    return `${col}${row}`;
};

const fromChessNotation = (notation: string) => {
    // Converts 1-8 to 0-7
    const row = 8 - parseInt(notation[1]);
    // Convert a-h to 0-7
    const col = notation.charCodeAt(0) - 97;
    return row * 8 + col;
};

const boardInit = () => {
    const chessBoard: Cell[] = [];

    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const isWhiteSquare = (row + col) % 2 === 0;
        const pieceCode = initialBoard[row][col];

        let pieceType = "";
        let isWhitePiece = false;

        if (pieceCode) {
            isWhitePiece = pieceCode === pieceCode.toUpperCase();

            switch (pieceCode.toLowerCase()) {
                case "p":
                    pieceType = "Pawn";
                    break;
                case "r":
                    pieceType = "Rook";
                    break;
                case "n":
                    pieceType = "Knight";
                    break;
                case "b":
                    pieceType = "Bishop";
                    break;
                case "q":
                    pieceType = "Queen";
                    break;
                case "k":
                    pieceType = "King";
                    break;
                default:
                    pieceType = "";
            }
        }

        const piece: Piece = {
            color: isWhitePiece ? "white" : "black",
            type: pieceType,
        };

        const cell: Cell = {
            color: isWhiteSquare ? "white" : "black",
            currentPiece: piece,
            position: i,
            notation: toChessNotation(i),
        };

        chessBoard.push(cell);
    }

    return chessBoard;
};

export { boardInit, fromChessNotation, toChessNotation };
