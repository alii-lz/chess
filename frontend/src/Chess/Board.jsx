import React from "react";
import {
    KingIcon,
    QueenIcon,
    BishopIcon,
    KnightIcon,
    RookIcon,
    PawnIcon,
} from "./Icons.jsx";
import boardInit from "./InitializeBoard.tsx";

const pieceComponents = {
    Pawn: PawnIcon,
    Rook: RookIcon,
    Knight: KnightIcon,
    Bishop: BishopIcon,
    Queen: QueenIcon,
    King: KingIcon,
};

const Board = () => {
    const chessBoard = boardInit();

    const renderPiece = (piece) => {
        const PieceIcon = pieceComponents[piece.type];
        return PieceIcon ? <PieceIcon color={piece.color} /> : null;
    };

    return (
        <div className='grid grid-cols-8 grid-rows-8 w-1/2 h-3/4 border'>
            {chessBoard.map((cell, index) => (
                <div
                    key={index}
                    className='border flex justify-center items-center'
                    style={{
                        background:
                            cell.color === "white" ? "#cdb081" : "#483624",
                    }}
                >
                    {renderPiece(cell.currentPiece)}
                </div>
            ))}
        </div>
    );
};

export default Board;
