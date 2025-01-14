import { getRowColfromBoardPosition, toBoardPosition } from "./Helpers.tsx";

const getValidMoves = (cell, board) => {
    const pieceType = cell.currentPiece.type;
    const pieceColor = cell.currentPiece.color;
    const position = cell.position;

    const { row, col } = getRowColfromBoardPosition(position);
    const moves = [];

    if (pieceType === "Pawn") {
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
    }

    return moves;
};

export { getValidMoves };
