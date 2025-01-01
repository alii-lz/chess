import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChessKing,
    faChessQueen,
    faChessBishop,
    faChessKnight,
    faChessRook,
} from "@fortawesome/free-solid-svg-icons";

const KingIcon = ({ color }) => (
    <FontAwesomeIcon icon={faChessKing} style={{ color }} size='3x' />
);

const QueenIcon = ({ color }) => (
    <FontAwesomeIcon icon={faChessQueen} style={{ color }} size='3x' />
);

const BishopIcon = ({ color }) => (
    <FontAwesomeIcon icon={faChessBishop} style={{ color }} size='3x' />
);

const KnightIcon = ({ color }) => (
    <FontAwesomeIcon icon={faChessKnight} style={{ color }} size='3x' />
);

const RookIcon = ({ color }) => (
    <FontAwesomeIcon icon={faChessRook} style={{ color }} size='3x' />
);

// const PawnIcon = ({ color, size = "2x" }) => (
//     <FontAwesomeIcon icon={faChessPawn} style={{ color }} size={size} />
// );

const PawnIcon = ({ color }) => {
    const sizeMap = {
        xs: 12,
        sm: 14,
        lg: 24,
        "1x": 16,
        "2x": 32,
        "3x": 48,
        "4x": 64,
    };

    const pixelSize = sizeMap["4x"] || 16;

    return (
        <svg
            width={pixelSize}
            height={pixelSize}
            viewBox='0 0 24 24'
            fill='none'
            style={{ display: "inline-block" }}
        >
            <path
                d='M12 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 14c0-2.5 1.5-4 4-4s4 1.5 4 4v1H8v-1zm-1 3h10v3H7v-3z'
                fill={color || "currentColor"}
            />
        </svg>
    );
};

export { KingIcon, QueenIcon, BishopIcon, KnightIcon, RookIcon, PawnIcon };
