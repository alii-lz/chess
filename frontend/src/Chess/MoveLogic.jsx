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
    const checkDirection = (rowIncrement, colIncrement) => {
        let r = row + rowIncrement;
        let c = col + colIncrement;

        while (r >= 1 && r <= 8 && c >= 1 && c <= 8) {
            const boardPosition = getBoardPositionFromRowCol(r, c);

            if (isSquareOccupied(board, boardPosition)) {
                break;
            }
            moves.push(boardPosition);

            r += rowIncrement;
            c += colIncrement;
        }
    };

    checkDirection(0, 1); // col is incrementing by 1 - check right moves
    checkDirection(0, -1); // col is decrementing by -1 - check left moves
    checkDirection(1, 0); // row is incrementing by 1 - check up moves
    checkDirection(-1, 0); // row is decrementing by -1 - check down moves

    return moves;
};

const getKnightMoves = (moves, board, row, col) => {
    /*
        
        At any position - the knight can make 8 valid moves
        4 moves to its left side
        Given (row, col)

        1. (row - 1, col - 2)
        2. (row - 2, col - 1)
        3. (row + 1, col - 2)
        4. (row + 2, col - 1)
    
        4 moves to its right side 

        1. (row - 1, col + 2)
        2. (row - 2, col + 1)
        3. (row + 1, col + 2)
        4. (row + 2, col + 1)
     */

    const positions = [];

    const p1 = getBoardPositionFromRowCol(row - 1, col - 2);
    const p2 = getBoardPositionFromRowCol(row - 2, col - 1);
    const p3 = getBoardPositionFromRowCol(row + 1, col - 2);
    const p4 = getBoardPositionFromRowCol(row + 2, col - 1);

    const p5 = getBoardPositionFromRowCol(row - 1, col + 2);
    const p6 = getBoardPositionFromRowCol(row - 2, col + 1);
    const p7 = getBoardPositionFromRowCol(row + 1, col + 2);
    const p8 = getBoardPositionFromRowCol(row + 2, col + 1);

    positions.push(p1);
    positions.push(p2);
    positions.push(p3);
    positions.push(p4);
    positions.push(p5);
    positions.push(p6);
    positions.push(p7);
    positions.push(p8);

    for (const position of positions) {
        console.log(position);
        if (position >= 0 && position <= 63) {
            moves.push(position);
        }
    }
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
        default:
            break;
    }

    return moves;
};

export { getValidMoves };
