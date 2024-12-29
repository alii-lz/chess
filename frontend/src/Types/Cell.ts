interface Piece {
    color: string;
    type: string;
}

interface Cell {
    color: string;
    currentPiece: Piece;
    position: number;
}

export type { Cell, Piece };
