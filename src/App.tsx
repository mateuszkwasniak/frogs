import Board from "./components/Board";
import Console from "./components/Console";
import FrogDetails from "./components/FrogDetails";
import Modal from "./components/Modal";
import { useFrogStore } from "./store/frog-store";

function App() {
  const selectedFrogId = useFrogStore((store) => store.selectedFrog);
  const selectedForBreeding = useFrogStore(
    (store) => store.selectedForBreeding
  );

  const getFrogById = useFrogStore((store) => store.getFrogById);

  return (
    <main className="p-10 flex flex-col items-center mx-auto w-fit">
      <Board />
      <div className="mt-4 self-start flex items-start justify-center gap-6">
        {selectedFrogId && (
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-bold text-lg font-bold text-gray-500 uppercase">
              selected frog
            </h2>
            <FrogDetails frog={getFrogById(selectedFrogId) as FrogT} />
          </div>
        )}
        <div className="mt-auto">
          <Console />
        </div>
        {selectedForBreeding && (
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-bold text-lg font-bold text-gray-500 uppercase">
              potential partner
            </h2>
            <FrogDetails frog={getFrogById(selectedForBreeding) as FrogT} />
          </div>
        )}
      </div>
      <Modal />
    </main>
  );
}

export default App;
