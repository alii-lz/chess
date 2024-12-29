import React from "react";
import Pawn from "../Images/Pawn.svg";
import Rook from "../Images/Rook.svg";

const Board = () => {
    // const chessBoard = ;

    const isPawnRow = (index) =>
        (index >= 8 && index <= 15) || (index >= 48 && index <= 55);

    const isRookCell = (index) =>
        index === 1 || index === 8 || index === 56 || index === 64;

    return (
        <div className='grid grid-cols-8 grid-rows-8 w-1/2 h-3/4 border'>
            {/* {Array.from({ length: 64 }).map((_, index) => (
                <div
                    key={index}
                    className='border flex justify-center items-center'
                    style={{
                        background:
                            (Math.floor(index / 8) + (index % 8)) % 2 === 0
                                ? "#cdb081"
                                : "#483624",
                    }}
                >
                    {isPawnRow(index) && (
                        <img src={Pawn} className='scale-50' />
                    )}

                    {isRookCell(index) && (
                        <img src={Rook} className='scale-50' />
                    )}
                </div>
            ))} */}
        </div>
    );
};

export default Board;
