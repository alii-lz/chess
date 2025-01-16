import React from "react";
import { boardInit } from "./InitializeBoard.tsx";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getValidMoves } from "./MoveLogic.jsx";
import { ItemTypes, pieceComponents } from "./Helpers.tsx";

// Renders a draggable piece
const Piece = ({ pieceType, Component, position, color, onDragStart }) => {
    const [, drag] = useDrag({
        type: ItemTypes.PIECE,
        item: { position, pieceType, color },
        begin: (item) => {
            // When piece is picked up, show valid moves
            onDragStart(item.position);
            return { position, pieceType, color };
        },
    });

    return (
        <div ref={drag}>
            <Component color={color} />
        </div>
    );
};

// Represents a single square on the board
const Square = ({
    position,
    cell,
    movePiece,
    onSquareClick,
    isValidMove,
    validMoves,
}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.PIECE /* Only makes items of type {ItemTypes.PIECE} draggable */,
        canDrop: (item) => {
            return validMoves.includes(item.position);
        },
        drop: (item) => {
            if (validMoves.includes(item.position)) {
                movePiece(item.position, position);
            }
        } /* Handles what happens after you drop the piece */,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
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
                onDragStart={onSquareClick}
            />
        );
    };

    const hasPiece = cell.currentPiece && cell.currentPiece.type;

    // Calculate background color based on drag state
    const getBackgroundColor = () => {
        if (isOver && canDrop) {
            return "rgba(0, 255, 0, 0.5)"; // Green highlight for valid drop
        }
        if (isOver && !canDrop) {
            return "rgba(255, 0, 0, 0.5)"; // Red highlight for invalid drop
        }
        return cell.color === "white" ? "#cdb081" : "#483624";
    };

    return (
        <div
            ref={drop}
            className='border flex justify-center items-center w-full h-full'
            style={{
                background: getBackgroundColor(),
                // background: cell.color === "white" ? "#cdb081" : "#483624",
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
    const [selectedPiecePosition, setSelectedPiecePosition] =
        React.useState(null);

    const movePiece = (from, to) => {
        const newBoard = [...board];

        const targetPiece = newBoard[from].currentPiece;
        if (targetPiece) {
            newBoard[from].currentPiece = null;
            newBoard[to].currentPiece = targetPiece;
            setValidMoves([]);
            setBoard(newBoard);
        }
    };

    /*  useCallback ensures the function reference for ${handleSquareClick} remains the same
        items in the dependency array determine when a new function is going to be created

        * Needed when a function is passed as a prop *

        If ${handleSquareClick} changes on every render, it would cause all {Square} components
        to re-render unnecessarily, even if the props or state havent changed.

        Without useCallback - whenever the board renders, it passes a new singular function 
        reference to the all 64 Squares  

        With useCallback - a new function reference is only created when something in the dependency
        array changes
    
        Logic flow:
                1. Initial board render - a function reference is created
                2. On subsequent renders - function reference remains same unless dependency array
                changes  
    
    */

    const handleSquareClick = React.useCallback(
        (cell) => {
            console.log(cell);

            // currentCellPosition is the cell that's been clicked
            const clickedSquarePosition = cell.position;

            // Moves piece to another cell if that cell is part of the piece's
            // valid moves
            if (
                validMoves.length &&
                validMoves.includes(clickedSquarePosition)
            ) {
                movePiece(selectedPiecePosition, clickedSquarePosition);
                setSelectedPiecePosition(null);
                return;
            }

            // If we click the same cell - hide its moves && unselect the cell
            if (selectedPiecePosition === clickedSquarePosition) {
                setValidMoves([]);
                setSelectedPiecePosition(null);
                return;
            }

            // If we clicked a piece - show its validMoves && select that cell
            if (cell.currentPiece) {
                const moves = getValidMoves(cell, board);
                setValidMoves(moves);
                setSelectedPiecePosition(clickedSquarePosition);
            }

            // Else we clicked empty cell
        },
        [board, validMoves]
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
                        validMoves={validMoves}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default Board;
