import { getRowColfromBoardPosition, toBoardPosition } from "./Helpers.tsx";

const isSquareOccupied = (board, row, col) => {
    // Check if there is a piece on the position (row, col)
    console.log("hi");
    const position = toBoardPosition(row, col);

    const hasPiece = board[position].currentPiece;

    // returns true if the square has a piece on it
    return hasPiece ? true : false;
};

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

const getRookMoves = (moves, row, col, board) => {
    // Add its horizontal moves
    for (let i = 1; i <= 8; i++) {
        if (i !== col) {
            const boardPosition = toBoardPosition(row, i);

            if (!isSquareOccupied(board, row, col)) {
                // the square does not have a piece, so add it to moves
                moves.push(boardPosition);
            }
        }
    }

    // Add its vertical moves
    for (let i = 1; i <= 8; i++) {
        if (i !== row) {
            const boardPosition = toBoardPosition(i, col);

            if (!isSquareOccupied(board, row, col)) {
                // the square does not have a piece, so add it to moves
                moves.push(boardPosition);
            }
        }
    }

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
            break;
        case "Rook":
            moves = getRookMoves(moves, row, col, board);
            break;
        default:
            break;
    }

    return moves;
};

export { getValidMoves };
