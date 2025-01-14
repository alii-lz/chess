import React from "react";
import { boardInit } from "./InitializeBoard.tsx";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getValidMoves } from "./MoveLogic.jsx";
import { ItemTypes, pieceComponents } from "./Helpers.tsx";

// Renders a draggable piece
const Piece = ({ pieceType, Component, position, color }) => {
    const [, drag] = useDrag({
        type: ItemTypes.PIECE,
        item: { position, pieceType, color },
    });

    return (
        <div ref={drag}>
            <Component color={color} />
        </div>
    );
};

// Represents a single square on the board
const Square = ({ position, cell, movePiece, onSquareClick, isValidMove }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.PIECE /* Only makes items of type {ItemTypes.PIECE} draggable */,
        drop: (item) =>
            movePiece(
                item.position,
                position
            ) /* Handles what happens after you drop the piece */,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const renderPiece = (piece) => {
        if (!piece || !piece.type) return null;
        const PieceIcon = pieceComponents[piece.type];
        return (
            <Piece
                pieceType={piece.type}
                Component={PieceIcon}
                position={position}
                color={piece.color}
            />
        );
    };

    const hasPiece = cell.currentPiece && cell.currentPiece.type;

    return (
        <div
            ref={drop}
            className='border flex justify-center items-center w-full h-full'
            style={{
                background: cell.color === "white" ? "#cdb081" : "#483624",
                opacity: isOver ? 0.5 : 1,
                cursor: hasPiece ? "pointer" : "default",
            }}
            onClick={() => onSquareClick(cell)}
        >
            {/* Renders a chess piece */}
            {hasPiece && renderPiece(cell.currentPiece)}

            {/* Renders a gray circle on the square 
                indicating that the square is valid for the piece to move to */}
            {isValidMove && (
                <div className='absolute w-4 h-4 rounded-full bg-gray-600 opacity-50' />
            )}
        </div>
    );
};

const Board = () => {
    const chessBoard = boardInit();
    const [board, setBoard] = React.useState(chessBoard);
    const [validMoves, setValidMoves] = React.useState([]);

    const movePiece = (from, to) => {
        const newBoard = [...board];

        const targetPiece = newBoard[from].currentPiece;
        if (targetPiece) {
            newBoard[from].currentPiece = null;
            newBoard[to].currentPiece = targetPiece;
            setBoard(newBoard);
            setValidMoves([]);
        }
    };

    const handleSquareClick = React.useCallback(
        (cell) => {
            console.log(cell);
            setValidMoves(getValidMoves(cell, board));
        },
        [board]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='grid grid-cols-8 grid-rows-8 w-1/2 h-3/4 border'>
                {board.map((cell, index) => (
                    <Square
                        key={index}
                        position={index}
                        cell={cell}
                        movePiece={movePiece}
                        onSquareClick={handleSquareClick}
                        isValidMove={validMoves.includes(index)}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default Board;
