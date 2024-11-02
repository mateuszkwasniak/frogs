const generateFrogsAppearance = (
  frog: FrogT
): {
  width: string;
  height: string;
  color: string;
} => {
  const height = frog.height === "tall" ? "h-12" : "h-6";
  const width = frog.figure === "fat" ? "w-12" : "w-6";
  const color = frog.gender === "male" ? "text-blue-600" : "text-purple-600";

  return { height, width, color };
};

const moveFrog = (x: number, y: number, coord: string): string => {
  const position = JSON.parse(coord) as [number, number];
  return JSON.stringify([position[0] + x, position[1] + y]);
};

const randomPick = () => Math.floor(Math.random() * 2);

const frogFeatures = {
  gender: ["male", "female"] as const,
  height: ["tall", "short"] as const,
  figure: ["fat", "slim"] as const,
};

const generateBabyFrog = (
  firstFrog: FrogT,
  secondFrog: FrogT,
  babyFrogId: number,
  babyFrogPosition: BoardCoordinateKey
): FrogT => {
  const random = randomPick();

  const babyFrog: FrogT = {
    id: babyFrogId,
    name: `${firstFrog.name.slice(0, 3)}${secondFrog.name
      .slice(0, 3)
      .toLocaleLowerCase()}`,
    gender: frogFeatures.gender[randomPick()],
    height: random === 0 ? firstFrog.height : secondFrog.height,
    figure: random === 0 ? secondFrog.figure : firstFrog.figure,
    position: babyFrogPosition,
  };

  return babyFrog;
};

const generateFrogPath = (
  from: BoardCoordinateKey,
  to: BoardCoordinateKey
): [number, number][] => {
  const steps: [number, number][] = [];
  const xSteps: number[] = [];
  const ySteps: number[] = [];
  const fromArray = JSON.parse(from) as [number, number];
  const toArray = JSON.parse(to) as [number, number];

  const negativeX = toArray[0] < fromArray[0];
  const negativeY = toArray[1] < fromArray[1];

  if (fromArray[0] !== toArray[0]) {
    for (
      let x = negativeX ? fromArray[0] - 1 : fromArray[0] + 1;
      negativeX ? x >= toArray[0] : x <= toArray[0];
      negativeX ? x-- : x++
    ) {
      xSteps.push(x);
    }
  } else xSteps.push(fromArray[0]);

  if (fromArray[1] !== toArray[1]) {
    for (
      let y = negativeY ? fromArray[1] - 1 : fromArray[1] + 1;
      negativeY ? y >= toArray[1] : y <= toArray[1];
      negativeY ? y-- : y++
    ) {
      ySteps.push(y);
    }
  } else ySteps.push(fromArray[1]);

  if (xSteps.length >= ySteps.length) {
    for (let i = 0; i <= xSteps.length - 1; i++) {
      if (ySteps.length - 1 >= i) {
        steps.push([xSteps[i], ySteps[i]]);
      } else steps.push([xSteps[i], ySteps[ySteps.length - 1]]);
    }
  } else {
    for (let i = 0; i <= ySteps.length - 1; i++) {
      if (xSteps.length - 1 >= i) {
        steps.push([xSteps[i], ySteps[i]]);
      } else steps.push([xSteps[xSteps.length - 1], ySteps[i]]);
    }
  }

  return steps;
};

export {
  generateFrogsAppearance,
  generateBabyFrog,
  moveFrog,
  generateFrogPath,
};
