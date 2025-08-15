import { Cell, Piece } from "../types/Cell.ts";
import { getChessNotationFromPosition } from "./Helpers.tsx";

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
      notation: getChessNotationFromPosition(i),
    };

    chessBoard.push(cell);
  }

  return chessBoard;
};

export { boardInit };
