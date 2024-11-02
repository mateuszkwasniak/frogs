import { GiFrog } from "react-icons/gi";
import { generateFrogsAppearance } from "../utils/frog";

import { useFrogStore } from "../store/frog-store";

export default function Frog({ frog }: { frog: FrogT }) {
  const selectedFrog = useFrogStore((store) => store.selectedFrog);
  const selectFrog = useFrogStore((store) => store.selectFrog);
  const selectForBreeding = useFrogStore((store) => store.selectForBreeding);
  const selectedForBreeding = useFrogStore(
    (store) => store.selectedForBreeding
  );
  const frogsAvailableForBreeding = useFrogStore(
    (store) => store.frogsAvailableForBreeding
  );

  const { width, height, color } = generateFrogsAppearance(frog);

  return (
    <div
      onClick={() => {
        if (frogsAvailableForBreeding.includes(frog.id)) {
          if (selectedForBreeding === frog.id) {
            selectForBreeding(null);
          } else selectForBreeding(frog.id);
        } else {
          selectFrog(frog.id);
        }
      }}
      className={`transition duration-300 w-full h-full flex items-center justify-center cursor-pointer ${
        selectedFrog === frog.id &&
        "bg-yellow-300 border-black border-2 shadow-black shadow-md"
      } ${
        selectedForBreeding === frog.id &&
        "border-red-600 border-4 shadow-sm shadow-red-600"
      }`}
    >
      <GiFrog
        className={`transition duration-300 ${width} ${height} ${color}`}
      />
    </div>
  );
}
