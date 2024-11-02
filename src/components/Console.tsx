import Button from "./Button";
import { GiFrogFoot } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { useFrogStore } from "../store/frog-store";

export default function Console() {
  const selectedFrog = useFrogStore((store) => store.selectedFrog);
  const selectedField = useFrogStore((store) => store.selectedField);
  const selectField = useFrogStore((store) => store.selectField);
  const changeFrogPosition = useFrogStore((store) => store.changeFrogPosition);
  const selectedForBreeding = useFrogStore(
    (store) => store.selectedForBreeding
  );
  const breed = useFrogStore((store) => store.breed);

  const jump = () => {
    if (selectedFrog && selectedField) {
      changeFrogPosition(selectedFrog, selectedField[0]);
      selectField(null);
    }
  };

  const reproduce = () => {
    if (selectedFrog && selectedForBreeding) {
      breed(selectedFrog, selectedForBreeding);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <Button onClick={jump} disabled={!selectedFrog}>
        <GiFrogFoot
          size="20"
          className={` disabled:text-gray-200 transition duration-300 ${
            selectedFrog ? "text-green-800" : "text-gray-600"
          }`}
        />
        Jump
      </Button>
      <Button disabled={!selectedForBreeding} onClick={reproduce}>
        <FaRegHeart
          size="20"
          className={` disabled:text-gray-200 transition duration-300 ${
            selectedForBreeding
              ? "text-red-600 animate-bounce"
              : "text-gray-600"
          }`}
        />
        Reproduce
      </Button>
    </div>
  );
}
