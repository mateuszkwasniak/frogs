import { useFrogStore } from "../store/frog-store";
import Button from "./Button";
import { MdPersonAddDisabled } from "react-icons/md";

export default function Modal() {
  const error = useFrogStore((store) => store.error);
  const setError = useFrogStore((store) => store.setError);
  if (error) {
    return (
      <div className="fixed left-0 top-0 z-20 w-full h-full flex items-center justify-center">
        <div className="absolute opacity-50 -z-10 bg-slate-900 w-full h-full" />
        <div className="p-4 rounded-md shadow-lg shadow-gray-600 flex flex-col gap-6 items-end text-center bg-white w-3/4 sm:w-96 h-fit">
          <MdPersonAddDisabled className="mx-auto w-10 h-10 text-gray-500 mt-4" />
          <p className="text-md font-semibold text-gray-600">{error}</p>
          <div className="w-[90%] mx-4 h-[1.5px] bg-gray-200"></div>
          <Button onClick={() => setError(null)}>OK...</Button>
        </div>
      </div>
    );
  } else return null;
}
