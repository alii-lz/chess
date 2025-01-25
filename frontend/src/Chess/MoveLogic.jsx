import { getRowColfromBoardPosition, toBoardPosition } from "./Helpers.tsx";

const getPawnMoves = (pieceColor, moves, row, col) => {
    const direction = pieceColor === "white" ? -1 : 1;

    // Checks if its the pawn's first move
    if (row === 2 || row === 7) {
        const oneStepPosition = toBoardPosition(row + direction * 1, col);
        const twoStepsPosition = toBoardPosition(row + direction * 2, col);

        moves.push(oneStepPosition);
        moves.push(twoStepsPosition);
    } else {
        // its a regular foward pawn move
        const newPosition = toBoardPosition(row + direction * 1, col);

        moves.push(newPosition);
    }
    return moves;
};

const getRookMoves = (moves, row, col) => {
    console.log(`row: ${row}, col: ${col}`);

    // Given the current position
    // Check its left and right
    // so row +- 8
    // and col +- 8

    return moves;
};

const getValidMoves = (cell, board) => {
    const pieceType = cell.currentPiece.type;
    const pieceColor = cell.currentPiece.color;
    const position = cell.position;

    const { row, col } = getRowColfromBoardPosition(position);
    let moves = [];

    switch (pieceType) {
        case "Pawn":
            moves = getPawnMoves(pieceColor, moves, row, col);
        case "Rook":
            moves = getRookMoves(moves, row, col);
        default:
            break;
    }

    return moves;
};

export { getValidMoves };
