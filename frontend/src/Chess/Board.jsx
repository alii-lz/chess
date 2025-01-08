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
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

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
const Square = ({ position, cell, movePiece, onSquareClick }) => {
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
        </div>
    );
};

const Board = () => {
    const chessBoard = boardInit();
    const [board, setBoard] = React.useState(chessBoard);
    const [showMoves, setShowMoves] = React.useState(false);

    const movePiece = (from, to) => {
        const newBoard = [...board];

        const targetPiece = newBoard[from].currentPiece;
        if (targetPiece) {
            newBoard[from].currentPiece = null;
            newBoard[to].currentPiece = targetPiece;
            setBoard(newBoard);
        }
    };

    // when a piece is clicked
    // set showMoves to true
    // in the return statement:
    //              showMoves && renderValidMoves();

    const renderValidMoves = React.useCallback((cell) => {
        console.log(cell);

        setShowMoves(true);
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='grid grid-cols-8 grid-rows-8 w-1/2 h-3/4 border'>
                {board.map((cell, index) => (
                    <Square
                        key={index}
                        position={index}
                        cell={cell}
                        movePiece={movePiece}
                        onSquareClick={renderValidMoves}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default Board;
