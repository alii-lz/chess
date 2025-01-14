import {
    KingIcon,
    QueenIcon,
    BishopIcon,
    KnightIcon,
    RookIcon,
    PawnIcon,
} from "./Icons.jsx";

// For the drag-n-drop library to only accept items of type "Piece"
// So we can only drag and drop the chess pieces on the board
const ItemTypes = {
    PIECE: "PIECE",
};

// Maps piece names to their visual components
const pieceComponents = {
    Pawn: PawnIcon,
    Rook: RookIcon,
    Knight: KnightIcon,
    Bishop: BishopIcon,
    Queen: QueenIcon,
    King: KingIcon,
};

// Converts position to chess notation
const toChessNotation = (position: number) => {
    // Converts 0-7 to 1-8
    const row = 8 - Math.floor(position / 8);
    // Converts 0-7 to a-h
    const col = String.fromCharCode(97 + (position % 8));
    return `${col}${row}`;
};

// Converts row and col to the relevant position on the board. Returns (0-63)
const toBoardPosition = (row, col) => {
    const zeroBasedRow = row - 1;
    const zeroBasedCol = col - 1;
    return zeroBasedRow * 8 + zeroBasedCol;
};

// Converts a position to row and col. Returns row and col in (1-8)
const getRowColfromBoardPosition = (position) => {
    const zeroBasedRow = Math.floor(position / 8);
    const zeroBasedCol = position % 8;
    return { row: zeroBasedRow + 1, col: zeroBasedCol + 1 };
};

export {
    toChessNotation,
    toBoardPosition,
    getRowColfromBoardPosition,
    ItemTypes,
    pieceComponents,
};
