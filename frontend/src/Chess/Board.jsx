import React from "react";
import {
    KingIcon,
    QueenIcon,
    BishopIcon,
    KnightIcon,
    RookIcon,
    PawnIcon,
} from "./Icons.jsx";
import { boardInit } from "./InitializeBoard.tsx";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getRowColfromBoardPosition, toBoardPosition } from "./Helpers.tsx";

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

// Renders a draggable piece
const Piece = ({ pieceType, Component, position, color }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.PIECE,
        item: { position, pieceType, color },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
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
    isSelected,
}) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.PIECE,
        drop: (item) => movePiece(item.position, position),
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
            {hasPiece && renderPiece(cell.currentPiece)}
            {isValidMove && (
                <div className='absolute w-4 h-4 rounded-full bg-gray-600 opacity-50' />
            )}
            {isSelected && (
                <div className='absolute w-4 h-4 rounded-full bg-gray-600 opacity-50' />
            )}
        </div>
    );
};

const getValidMoves = (cell, board) => {
    const pieceType = cell.currentPiece.type;
    const pieceColor = cell.currentPiece.color;
    const position = cell.position;

    const { row, col } = getRowColfromBoardPosition(position);
    const moves = [];

    if (pieceType === "Pawn") {
        const direction = pieceColor === "white" ? -1 : 1;
        console.log(
            `current direction is ${direction} because pieceColor is ${pieceColor}`
        );

        // Checks if its the pawn's first move
        if (row === 2 || row === 7) {
            const oneStepPosition = toBoardPosition(row + direction * 1, col);
            const twoStepsPosition = toBoardPosition(row + direction * 2, col);

            console.log(`pushing onestep: ${oneStepPosition}`);
            moves.push(oneStepPosition);
            console.log(`pushing twostep: ${twoStepsPosition}`);
            moves.push(twoStepsPosition);
        } else {
            // its a regular foward pawn move
            const newPosition = toBoardPosition(row + direction * 1, col);

            console.log(`pushing regular forward move: ${newPosition}`);
            moves.push(newPosition);
        }
    }

    console.log(`moves before returning are: ${moves}`);
    return moves;
};

const Board = () => {
    const chessBoard = boardInit();
    const [board, setBoard] = React.useState(chessBoard);
    const [selectedPosition, setSelectedPosition] = React.useState(null);
    const [validMoves, setValidMoves] = React.useState([]);

    const movePiece = (from, to) => {
        const newBoard = [...board];

        const targetPiece = newBoard[from].currentPiece;
        if (targetPiece) {
            newBoard[from].currentPiece = null;
            newBoard[to].currentPiece = targetPiece;
            setBoard(newBoard);
            setSelectedPosition(null);
            setValidMoves([]);
        }
    };

    const handleSquareClick = React.useCallback(
        (cell) => {
            console.log(cell);
            setValidMoves(getValidMoves(cell, board));
            console.log(`valid moves after calling function is ${validMoves}`);
        },
        [selectedPosition, board, validMoves]
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
                        isSelected={selectedPosition === index}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default Board;
