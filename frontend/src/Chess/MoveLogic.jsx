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
    /**
     * We have the position of the rook already.
     * From this position
     * 1. Check all rightt
     * 2. Check all left
     * 3. Check all up
     * 4. Check all down
     */

    console.log(row, col);

    // Check right moves
    if (col !== 8) {
        // if we are not at the edge
        // we can check right moves

        for (let i = col + 1; i <= 8; i++) {
            const boardPosition = toBoardPosition(row, i);

            if (isSquareOccupied(board, boardPosition)) {
                const { curRow, curCol } =
                    getRowColfromBoardPosition(boardPosition);
                console.log(`breaking because ${(curRow, curCol)} is occupied`);
                break;
            }

            moves.push(boardPosition);
        }
    }

    // Check left moves
    if (col !== 1) {
        // if we are not at the edge
        // we can check left moves

        for (let i = col - 1; i >= 1; i--) {
            const boardPosition = toBoardPosition(row, i);

            if (isSquareOccupied(board, boardPosition)) {
                const { curRow, curCol } =
                    getRowColfromBoardPosition(boardPosition);
                console.log(`breaking because ${(curRow, curCol)} is occupied`);
                break;
            }

            moves.push(boardPosition);
        }
    }

    // Check up moves
    if (row !== 1) {
        // if we are not at the edge
        // we can check up moves

        for (let i = row - 1; i >= 1; i--) {
            console.log(`current row is ${i}`);
            const boardPosition = toBoardPosition(row, i);
            if (isSquareOccupied(board, boardPosition)) {
                const { curRow, curCol } =
                    getRowColfromBoardPosition(boardPosition);
                console.log(`breaking because ${(curRow, curCol)} is occupied`);
                break;
            }

            moves.push(boardPosition);
        }
    }

    // Check down moves
    if (row !== 8) {
        // if we are not at the edge
        // we can check down moves

        for (let i = row + 1; i <= 8; i++) {
            const boardPosition = toBoardPosition(row, i);

            if (isSquareOccupied(board, boardPosition)) {
                const { curRow, curCol } =
                    getRowColfromBoardPosition(boardPosition);
                console.log(`breaking because ${(curRow, curCol)} is occupied`);
                break;
            }

            moves.push(boardPosition);
        }
    }

    // Add its horizontal moves
    // for (let i = 1; i <= 8; i++) {
    //     if (i !== col) {
    //         const boardPosition = toBoardPosition(row, i);

    //         console.log(isSquareOccupied(board, boardPosition));
    //         if (isSquareOccupied(board, boardPosition)) {
    //             // the square has a piece - break because we cannot move to the next squares
    //             // since this piece blocks the rook
    //             continue;
    //         }
    //         moves.push(boardPosition);
    //     }
    // }

    // // Add its vertical moves
    // console.log("entering the vertical moves for loop");
    // for (let i = 1; i <= 8; i++) {
    //     console.log(`current i is at row: ${i}`);
    //     if (i !== row) {
    //         const boardPosition = toBoardPosition(i, col);

    //         if (isSquareOccupied(board, boardPosition)) {
    //             // the square has a piece - break because we cannot move to the next squares
    //             // since this piece blocks the rook
    //             continue;
    //         }
    //         moves.push(boardPosition);
    //     }
    // }

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
            moves = getRookMoves(moves, row, col, board);
            break;
        default:
            break;
    }

    return moves;
};

export { getValidMoves };
