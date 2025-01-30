import { getRowColfromBoardPosition, toBoardPosition } from "./Helpers.tsx";

const isSquareOccupied = (board, position) => {
    const hasPiece = board[position]?.currentPiece?.type;
    return !!hasPiece;
};

const getPawnMoves = (pieceColor, moves, row, col, board) => {
    const direction = pieceColor === "white" ? -1 : 1;
    const oneStepPosition = toBoardPosition(row + direction, col);

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
            const twoStepsPosition = toBoardPosition(row + direction * 2, col);
            if (!isSquareOccupied(board, twoStepsPosition)) {
                moves.push(twoStepsPosition);
            }
        }
    }

    return moves;
};

const getRookMoves = (moves, row, col, board) => {
    // Add its horizontal moves
    for (let i = 1; i <= 8; i++) {
        if (i !== col) {
            const boardPosition = toBoardPosition(row, i);
            console.log("I gt here");

            console.log(isSquareOccupied(board, boardPosition));
            if (isSquareOccupied(board, boardPosition)) {
                // the square has a piece - break because we cannot move to the next squares
                // since this piece blocks the rook
                console.log("breaking");
                break;
            }
            moves.push(boardPosition);
        }
    }

    // Add its vertical moves
    for (let i = 1; i <= 8; i++) {
        if (i !== row) {
            const boardPosition = toBoardPosition(i, col);

            if (isSquareOccupied(board, boardPosition)) {
                // the square has a piece - break because we cannot move to the next squares
                // since this piece blocks the rook
                break;
            }
            moves.push(boardPosition);
        }
    }

    console.log(moves);
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
            moves = getPawnMoves(pieceColor, moves, row, col, board);
            break;
        case "Rook":
            console.log("hi");
            moves = getRookMoves(moves, row, col, board);
            break;
        default:
            break;
    }

    return moves;
};

export { getValidMoves };
