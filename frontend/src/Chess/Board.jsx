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
// import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

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
        <DndProvider backend={HTML5Backend}>
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
                        <button>{renderPiece(cell.currentPiece)}</button>
                    </div>
                ))}
            </div>
        </DndProvider>
    );
};

export default Board;
