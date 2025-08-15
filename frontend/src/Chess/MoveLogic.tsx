import {
  getRowColfromBoardPosition,
  getBoardPositionFromRowCol,
  //   getChessNotationFromPosition,
} from "./Helpers.tsx";
import { Cell } from "../types/Cell.ts";

const isSquareOccupied = (
  board: Cell[],
  position: number,
  attackingPieceColor = null
) => {
  const piece = board[position].currentPiece;
  if (!piece || !piece.type) return false;

  // If we're checking for capture possibility
  if (attackingPieceColor !== null) {
    return piece.color === attackingPieceColor;
  }

  return true;
};

const canMoveTo = (
  board: Cell[],
  position: number,
  attackingPieceColor: string
) => {
  const targetSquare = board[position];
  if (!targetSquare.currentPiece || targetSquare.currentPiece.type === "") {
    return true;
  }

  return targetSquare.currentPiece.color !== attackingPieceColor;
};

const doesPositionHaveOpponentPiece = (
  board: Cell[],
  positionToCheck: number,
  attackingPieceColor: string
) => {
  const squareToCheck = board[positionToCheck];

  if (!squareToCheck.currentPiece || squareToCheck.currentPiece.type === "") {
    return false;
  }

  const color = squareToCheck.currentPiece.color;

  return attackingPieceColor !== color;
};

const getPawnMoves = (
  pieceColor: string,
  moves: number[],
  row: number,
  col: number,
  board: Cell[]
) => {
  const direction = pieceColor === "white" ? -1 : 1;
  const oneStepPosition = getBoardPositionFromRowCol(row + direction, col);

  // Check if one-step forward is within bounds and not occupied
  if (
    row + direction > 0 &&
    row + direction < 9 &&
    !isSquareOccupied(board, oneStepPosition)
  ) {
    moves.push(oneStepPosition);

    // Check if pawn's first move allows for a two-step forward move
    if (
      (pieceColor === "white" && row === 7) ||
      (pieceColor === "black" && row === 2)
    ) {
      const twoStepsPosition = getBoardPositionFromRowCol(
        row + direction * 2,
        col
      );
      if (!isSquareOccupied(board, twoStepsPosition)) {
        moves.push(twoStepsPosition);
      }
    }

    const pawnCaptureLeft = getBoardPositionFromRowCol(
      row + direction,
      col - 1
    );
    const pawnCaptureRight = getBoardPositionFromRowCol(
      row + direction,
      col + 1
    );

    if (doesPositionHaveOpponentPiece(board, pawnCaptureLeft, pieceColor)) {
      moves.push(pawnCaptureLeft);
    }

    if (doesPositionHaveOpponentPiece(board, pawnCaptureRight, pieceColor)) {
      moves.push(pawnCaptureRight);
    }
  }

  return moves;
};

const getRookMoves = (
  moves: number[],
  row: number,
  col: number,
  board: Cell[]
) => {
  const calculateMovesForDirection = (
    rowIncrement: number,
    colIncrement: number
  ) => {
    let r = row + rowIncrement;
    let c = col + colIncrement;
    const rookPosition = getBoardPositionFromRowCol(row, col);
    const rookColor = board[rookPosition].currentPiece.color;

    while (r >= 1 && r <= 8 && c >= 1 && c <= 8) {
      const nextPosition = getBoardPositionFromRowCol(r, c);

      // Check if the current position is enemy piece
      // if yes - then add the move and then break

      if (doesPositionHaveOpponentPiece(board, nextPosition, rookColor)) {
        moves.push(nextPosition);
        break;
      }

      if (!canMoveTo(board, nextPosition, rookColor)) {
        break;
      }

      moves.push(nextPosition);

      r += rowIncrement;
      c += colIncrement;
    }
  };

  calculateMovesForDirection(0, 1); // col is incrementing by 1 - check right moves
  calculateMovesForDirection(0, -1); // col is decrementing by -1 - check left moves
  calculateMovesForDirection(1, 0); // row is incrementing by 1 - check up moves
  calculateMovesForDirection(-1, 0); // row is decrementing by -1 - check down moves

  return moves;
};

const getKnightMoves = (
  moves: number[],
  row: number,
  col: number,
  board: Cell[]
) => {
  const knightPosition = getBoardPositionFromRowCol(row, col);
  const knightPiece = board[knightPosition];
  const knightColor = knightPiece.currentPiece.color;

  const potentialMoves = [
    { r: row - 1, c: col - 2 },
    { r: row - 2, c: col - 1 },
    { r: row + 1, c: col - 2 },
    { r: row + 2, c: col - 1 },
    { r: row - 1, c: col + 2 },
    { r: row - 2, c: col + 1 },
    { r: row + 1, c: col + 2 },
    { r: row + 2, c: col + 1 },
  ];

  for (const move of potentialMoves) {
    const nextPosition = getBoardPositionFromRowCol(move.r, move.c);

    if (
      move.r > 0 &&
      move.r <= 8 &&
      move.c > 0 &&
      move.c <= 8 &&
      nextPosition >= 0 &&
      nextPosition < 64
    ) {
      if (canMoveTo(board, nextPosition, knightColor)) {
        moves.push(nextPosition);
      }
    }
  }

  return moves;
};

const getBishopMoves = (
  moves: number[],
  row: number,
  col: number,
  board: Cell[]
) => {
  const calculateMovesForDirection = (
    rowIncrement: number,
    colIncrement: number
  ) => {
    let curRow = row;
    let curCol = col;

    const bishopPosition = getBoardPositionFromRowCol(row, col);
    const bishopColor = board[bishopPosition].currentPiece.color;

    while (
      curRow + rowIncrement >= 1 &&
      curRow + rowIncrement <= 8 &&
      curCol + colIncrement >= 1 &&
      curCol + colIncrement <= 8
    ) {
      const newRow = curRow + rowIncrement;
      const newCol = curCol + colIncrement;
      const nextPosition = getBoardPositionFromRowCol(newRow, newCol);

      if (!(nextPosition >= 0 && nextPosition < 64)) {
        continue;
      }

      if (doesPositionHaveOpponentPiece(board, nextPosition, bishopColor)) {
        moves.push(nextPosition);
        break;
      }

      if (!canMoveTo(board, nextPosition, bishopColor)) {
        break;
      }

      moves.push(nextPosition);

      curRow += rowIncrement;
      curCol += colIncrement;
    }
  };

  calculateMovesForDirection(-1, +1); // moving top right
  calculateMovesForDirection(+1, +1); // moving bottom right
  calculateMovesForDirection(-1, -1); // moving top left
  calculateMovesForDirection(+1, -1); // moving bottom left

  return moves;
};

const getQueenMoves = (
  moves: number[],
  row: number,
  col: number,
  board: Cell[]
) => {
  getRookMoves(moves, row, col, board);
  getBishopMoves(moves, row, col, board);

  return moves;
};

const getKingMoves = (
  moves: number[],
  row: number,
  col: number,
  board: Cell[]
) => {
  const potentialMoves = [
    { r: row - 1, c: col },
    { r: row + 1, c: col },
    { r: row, c: col + 1 },
    { r: row, c: col - 1 },
    { r: row + 1, c: col + 1 },
    { r: row + 1, c: col - 1 },
    { r: row - 1, c: col + 1 },
    { r: row - 1, c: col - 1 },
  ];

  const kingPosition = getBoardPositionFromRowCol(row, col);
  const kingColor = board[kingPosition].currentPiece.color;

  for (const move of potentialMoves) {
    const nextPosition = getBoardPositionFromRowCol(move.r, move.c);
    if (
      move.r > 0 &&
      move.r <= 8 &&
      move.c > 0 &&
      move.c <= 8 &&
      nextPosition >= 0 &&
      nextPosition < 64 &&
      canMoveTo(board, nextPosition, kingColor)
    ) {
      moves.push(nextPosition);
    }
  }

  return moves;
};

const getValidMoves = (cell: Cell, board: Cell[]) => {
  const pieceType = cell.currentPiece.type;
  const pieceColor = cell.currentPiece.color;
  const position = cell.position;

  const { row, col } = getRowColfromBoardPosition(position);
  let moves: number[] = [];

  switch (pieceType) {
    case "Pawn":
      moves = getPawnMoves(pieceColor, moves, row, col, board);
      break;
    case "Rook":
      moves = getRookMoves(moves, row, col, board);
      break;
    case "Knight":
      moves = getKnightMoves(moves, row, col, board);
      break;
    case "Bishop":
      moves = getBishopMoves(moves, row, col, board);
      break;
    case "Queen":
      moves = getQueenMoves(moves, row, col, board);
      break;
    case "King":
      moves = getKingMoves(moves, row, col, board);
      break;
    default:
      break;
  }

  return moves;
};

export { getValidMoves };
