export default function FrogDetails({ frog }: { frog: FrogT }) {
  return (
    <div className="border border-gray-400 px-3 py-2 shadow-sm shadow-gray-400 w-fit rounded-md flex flex-col gap-3">
      <h1 className="text-lg text-start font-bold">
        {frog.id}. {frog.name}
      </h1>
      <div className="flex gap-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs uppercase text-gray-400">gender</span>
          <p className="text-gray-900 text-md font-semibold">{frog.gender}</p>
        </div>
        <div className="h-10 w-[1.5px] bg-gray-200" />
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs uppercase text-gray-400">height</span>
          <p className="text-gray-900 text-md font-semibold">{frog.height}</p>
        </div>
        <div className="h-10 w-[1.5px] bg-gray-200" />
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs uppercase text-gray-400">figure</span>
          <p className="text-gray-900 text-md font-semibold">{frog.figure}</p>
        </div>
      </div>
    </div>
  );
}
