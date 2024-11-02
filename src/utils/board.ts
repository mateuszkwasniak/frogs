const coordinateToKey = (coord: BoardCoordinate): BoardCoordinateKey => {
  return JSON.stringify(coord);
};

const calculateAvailableFields = (
  type: "jump" | "born",
  board: Map<BoardCoordinateKey, BoardValue>,
  frog: FrogT
): BoardCoordinateKey[] => {
  const availableFields: BoardCoordinateKey[] = [];
  const frogCoord = JSON.parse(frog.position) as [number, number];
  let range: number;

  switch (type) {
    case "jump": {
      range =
        frog.gender === "male"
          ? Number(import.meta.env.VITE_MALE_FROG_JUMP_RANGE) || 3
          : Number(import.meta.env.VITE_FEMALE_FROG_JUMP_RANGE) || 2;
      break;
    }

    case "born": {
      range = 1;
      break;
    }
  }

  for (let x = frogCoord[0] - range; x <= frogCoord[0] + range; x++) {
    for (let y = frogCoord[1] - range; y <= frogCoord[1] + range; y++) {
      if (board.get(coordinateToKey([x, y])) === null) {
        availableFields.push(coordinateToKey([x, y]));
      }
    }
  }

  return availableFields;
};

export { coordinateToKey, calculateAvailableFields };
