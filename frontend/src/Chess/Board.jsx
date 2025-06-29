import React from "react";
import { boardInit } from "./InitializeBoard.tsx";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getValidMoves } from "./MoveLogic.tsx";
import { ItemTypes, pieceComponents } from "./Helpers.tsx";
import { useDispatch, useSelector } from "react-redux";
import { swapTurn } from "../State/TurnSlice.ts";

// Renders a draggable piece
const Piece = ({ Component, position, color, board, setValidMoves }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.PIECE,
        item: () => {
            const piece = board[position].currentPiece;
            if (
                piece &&
                piece.color === (color === "white" ? "white" : "black")
            ) {
                const moves = getValidMoves(board[position], board);
                setValidMoves(moves);
            }
            return { position };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: () => {
            setValidMoves([]);
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
    board,
    setValidMoves,
}) => {
    const whiteTurn = useSelector((state) => state.turn.whiteTurn);

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.PIECE /* Only makes items of type {ItemTypes.PIECE} draggable */,
        drop: (item) => {
            if (isValidMove) {
                const fromCell = board[item.position];
                const isCorrectTurn =
                    (whiteTurn && fromCell.currentPiece?.color === "white") ||
                    (!whiteTurn && fromCell.currentPiece?.color === "black");
                if (isCorrectTurn) {
                    movePiece(item.position, position);
                }
            }
        } /* Handles what happens after you drop the piece */,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
        canDrop: () => {
            return () => isValidMove; // Allow dropping only if it's a valid move
        },
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
                board={board}
                setValidMoves={setValidMoves}
            />
        );
    };

    const hasPiece = cell.currentPiece && cell.currentPiece.type;

    const getBackgroundColor = () => {
        return cell.color === "white" ? "#cdb081" : "#483624";
    };

    return (
        <div
            ref={drop}
            className='border flex justify-center items-center w-full h-full'
            style={{
                background: getBackgroundColor(),
                // opacity: isOver ? 0.5 : 1,
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
    const whiteTurn = useSelector((state) => state.turn.whiteTurn);
    const dispatch = useDispatch();

    const chessBoard = boardInit();
    const [board, setBoard] = React.useState(chessBoard);
    const [validMoves, setValidMoves] = React.useState([]);
    const [selectedPiecePosition, setSelectedPiecePosition] =
        React.useState(null);

    const movePiece = (from, to) => {
        const newBoard = [...board];
        const targetPiece = newBoard[from].currentPiece;

        if (!targetPiece) return;

        const isCorrectTurn =
            (whiteTurn && targetPiece.color === "white") ||
            (!whiteTurn && targetPiece.color === "black");

        if (!isCorrectTurn) return;

        newBoard[to].currentPiece = targetPiece;
        newBoard[from].currentPiece = null;
        setBoard(newBoard);
        setValidMoves([]);
        dispatch(swapTurn());
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
            const clickedPosition = cell.position;
            const clickedPiece = cell.currentPiece;

            // If clicking the same square or an empty square when no piece is selected
            if (
                selectedPiecePosition === clickedPosition ||
                (!clickedPiece && !selectedPiecePosition)
            ) {
                setValidMoves([]);
                setSelectedPiecePosition(null);
                return;
            }

            // If a piece is selected and clicking a valid move square
            if (
                selectedPiecePosition !== null &&
                validMoves.includes(clickedPosition)
            ) {
                movePiece(selectedPiecePosition, clickedPosition);
                setSelectedPiecePosition(null);
                return;
            }

            // If clicking a new piece
            if (clickedPiece) {
                const isCorrectTurn =
                    (whiteTurn && clickedPiece.color === "white") ||
                    (!whiteTurn && clickedPiece.color === "black");

                if (!isCorrectTurn) {
                    setValidMoves([]);
                    setSelectedPiecePosition(null);
                    return;
                }

                const moves = getValidMoves(cell, board);
                setValidMoves(moves);
                setSelectedPiecePosition(clickedPosition);
            }
        },
        [
            board,
            validMoves,
            selectedPiecePosition,
            whiteTurn,
            dispatch,
            movePiece,
        ]
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
                        board={board}
                        setValidMoves={setValidMoves}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default Board;
