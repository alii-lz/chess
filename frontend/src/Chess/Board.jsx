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

const pieceComponents = {
    Pawn: PawnIcon,
    Rook: RookIcon,
    Knight: KnightIcon,
    Bishop: BishopIcon,
    Queen: QueenIcon,
    King: KingIcon,
};

const Piece = ({ type, Component, position, color }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: "piece", position, pieceType: type, color },
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    });

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
        >
            <Component color={color} />
        </div>
    );
};

const Square = ({ key, position, cell, movePiece }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "piece",
        drop: (item) => movePiece(item.position, position),
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });

    const renderPiece = (piece) => {
        if (!piece) return null;
        const PieceIcon = pieceComponents[piece.type];
        return (
            <Piece
                type={piece.type}
                Component={PieceIcon}
                position={position}
                color={piece.color}
            />
        );
    };

    return (
        <div
            ref={drop}
            className='border flex justify-center items-center w-full h-full'
            style={{
                background: cell.color === "white" ? "#cdb081" : "#483624",
                opacity: isOver ? 0.5 : 1,
            }}
        >
            {renderPiece(cell.currentPiece)}
        </div>
    );
};

const Board = () => {
    const chessBoard = boardInit();
    const [board, setBoard] = React.useState(chessBoard);

    const renderPiece = (piece) => {
        const PieceIcon = pieceComponents[piece.type];
        return PieceIcon ? <PieceIcon color={piece.color} /> : null;
    };

    const movePiece = (from, to) => {
        // logic to move the piece from one square to another
        const newBoard = [...board];

        const targetPiece = newBoard[from.x][from.y].currentPiece;

        newBoard[to.x][to.y].currentPiece = targetPiece;
        newBoard[from.x][from.y].currentPiece = null;

        setBoard(newBoard);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='grid grid-cols-8 grid-rows-8 w-1/2 h-3/4 border'>
                {board.map((cell, index) => (
                    <Square
                        key={index}
                        position={index}
                        cell={cell}
                        movePiece={movePiece}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default Board;
