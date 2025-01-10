interface Piece {
    color: string;
    type: string;
}

interface Cell {
    color: string;
    currentPiece: Piece;
    position: number;
    notation: string;
}

export type { Cell, Piece };
