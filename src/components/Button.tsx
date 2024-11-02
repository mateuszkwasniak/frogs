/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="px-3 py-1.5 flex items-center gap-1.5 rounded-md border-2 border-green-900 text-md uppercase font-medium bg-green-100 hover:bg-green-300 transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:border-gray-400"
    >
      {children}
    </button>
  );
}
