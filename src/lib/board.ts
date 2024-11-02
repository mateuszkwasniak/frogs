import { coordinateToKey } from "../utils/board";

const boardColumns = Number(import.meta.env.VITE_BOARD_WIDTH);
const boardRows = Number(import.meta.env.VITE_BOARD_HEIGHT);

const initialBoard: Map<BoardCoordinateKey, BoardValue> = new Map();

for (let i = 1; i <= boardRows; i++) {
  for (let j = 1; j <= boardColumns; j++) {
    initialBoard.set(
      coordinateToKey([j, i]),
      j === 1 && i === 1 ? 1 : j === 10 && i === 1 ? 2 : null
    );
  }
}

export { initialBoard, boardColumns, boardRows };
