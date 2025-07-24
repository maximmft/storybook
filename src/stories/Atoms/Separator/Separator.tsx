import { Link } from "lucide-react";
import * as React from "react";

export default function Separator() {
  return (
    <div className="w-full flex flex-row items-center">
      <hr className="flex-grow border-[0.5px] border-greyscale-400" />
      <div className="mx-3 flex items-center">
        <Link size={20} className="mr-2" />
        <p className="text-[15px]">Prestation(s) à la suite</p>
      </div>
      <hr className="flex-grow border-[0.5px] border-greyscale-400" />
    </div>
  );
}