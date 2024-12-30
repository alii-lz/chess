import React from "react";
import Pawn from "../Images/Pawn.svg";
import Rook from "../Images/Rook.svg";
import Knight from "../Images/Knight.svg";
import Bishop from "../Images/Bishop.svg";
import Queen from "../Images/Queen.svg";
import King from "../Images/King.svg";
import boardInit from "./InitializeBoard.tsx";

const pieceImages = {
    Pawn: Pawn,
    Rook: Rook,
    Knight: Knight,
    Bishop: Bishop,
    Queen: Queen,
    King: King,
};

const Board = () => {
    const chessBoard = boardInit();

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
                    {cell.currentPiece.type && (
                        <img
                            src={pieceImages[cell.currentPiece.type]}
                            className='scale-60 mb-2'
                            alt={cell.currentPiece.type}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Board;
