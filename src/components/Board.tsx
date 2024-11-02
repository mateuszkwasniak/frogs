import { useEffect, useState } from "react";
import { boardColumns, boardRows } from "../lib/board";
import { useFrogStore } from "../store/frog-store";
import Frog from "./Frog";

export default function Board() {
  const [availableFields, setAvailableFields] = useState<BoardCoordinateKey[]>(
    []
  );

  const getFrogById = useFrogStore((state) => state.getFrogById);
  const board = useFrogStore((state) => state.board);
  const getBoardValue = useFrogStore((state) => state.getBoardValue);
  const selectedFrog = useFrogStore((store) => store.selectedFrog);
  const selectField = useFrogStore((store) => store.selectField);
  const selectedField = useFrogStore((store) => store.selectedField);
  const population = useFrogStore((state) => state.population);
  const checkBreedingPossibility = useFrogStore(
    (state) => state.checkBreedingPossibility
  );
  const findAvailableFields = useFrogStore(
    (state) => state.findAvailableFields
  );

  useEffect(() => {
    selectField(null);
    if (selectedFrog) {
      setAvailableFields(findAvailableFields("jump"));
    }
  }, [selectedFrog, findAvailableFields, selectField, board]);

  useEffect(() => {
    checkBreedingPossibility();
  }, [population, selectedFrog, getFrogById, checkBreedingPossibility]);

  return (
    <>
      <h1 className="text-3xl mb-6 font-bold text-gray-700">This is Lake</h1>
      <div
        className="p-12 grid bg-blue-400 w-fit transition duration-300 gap-x-12 lg:gap-x-2 gap-y-2"
        style={{
          gridTemplateColumns: `repeat(${boardColumns}, minmax(50px,100px)`,
          gridTemplateRows: `repeat(${boardRows}, minmax(50px,100px))`,
          direction: "rtl",
        }}
      >
        {Array.from(board.keys())
          .reverse()
          .map((coord) => {
            const fieldWithFrog = getBoardValue(coord);
            let frog: FrogT | undefined;

            if (fieldWithFrog) {
              frog = getFrogById(fieldWithFrog);
            }
            return (
              <div
                key={coord}
                className={`w-16 h-16 mx-auto my-auto flex items-center justify-center bg-green-50 rounded-sm transition duration-300 ${
                  availableFields.includes(coord) &&
                  "bg-green-200 cursor-pointer"
                } ${
                  selectedField &&
                  selectedField[0] === coord &&
                  "border-2 border-purple-800 bg-purple-400 shadow-sm shadow-purple-800"
                }`}
                onClick={() => {
                  if (availableFields.includes(coord)) {
                    selectField(coord);
                  }
                }}
              >
                {frog && <Frog frog={frog} />}
              </div>
            );
          })}
      </div>
    </>
  );
}
