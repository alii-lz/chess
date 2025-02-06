import {
    getRowColfromBoardPosition,
    getBoardPositionFromRowCol,
} from "./Helpers.tsx";

const isSquareOccupied = (board, position) => {
    const hasPiece = board[position]?.currentPiece?.type;
    return !!hasPiece;
};

const getPawnMoves = (pieceColor, moves, row, col, board) => {
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
    }

    return moves;
};

const getRookMoves = (moves, row, col, board) => {
    const calculateMovesForDirection = (rowIncrement, colIncrement) => {
        let r = row + rowIncrement;
        let c = col + colIncrement;

        while (r >= 1 && r <= 8 && c >= 1 && c <= 8) {
            const nextPosition = getBoardPositionFromRowCol(r, c);

            if (isSquareOccupied(board, nextPosition)) {
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

const getKnightMoves = (moves, row, col, board) => {
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
            moves.push(nextPosition);
        }
    }

    return moves;
};

const getBishopMoves = (moves, row, col, board) => {
    /*
        From current position
        We can either move:
        
        1. top right
            row - 1, col + 1

        2. bottom right
            row + 1, col + 1

        3. top left
            row - 1, col - 1

        4. bottom left
            row + 1, col - 1
            
        Loop condition: Continue looping until we reach row = 8 or col = 8

    */

    const calculateMovesForDirection = (rowIncrement, colIncrement) => {
        let curRow = row;
        let curCol = col;

        while (
            curRow + rowIncrement >= 1 &&
            curRow + rowIncrement <= 8 &&
            curCol + colIncrement >= 1 &&
            curCol + colIncrement <= 8
        ) {
            const newRow = curRow + rowIncrement;
            const newCol = curCol + colIncrement;
            const nextPosition = getBoardPositionFromRowCol(newRow, newCol);

            if (isSquareOccupied(board, nextPosition)) {
                break;
            }

            if (nextPosition >= 0 && nextPosition < 64) {
                moves.push(nextPosition);
            }

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
            moves = getRookMoves(moves, row, col, board);
            break;
        case "Knight":
            moves = getKnightMoves(moves, row, col, board);
            break;
        case "Bishop":
            moves = getBishopMoves(moves, row, col, board);
            break;
        default:
            break;
    }

    return moves;
};

export { getValidMoves };
