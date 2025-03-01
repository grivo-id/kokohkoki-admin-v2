/* eslint-disable react/prop-types */

import { Pen } from "lucide-react";
import DeleteType from "./delete-type";
import { useState } from "react";
import EditType from "./edit-type-modal";

export default function TypeItem({ id, name, reFetchType }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex gap-2 items-center text-black font-semibold">
        <p className="w-full text-start">
          Type: <span className="font-normal">{name}</span>
        </p>
        <div className="flex flex-col gap-3">
          <div onClick={() => setIsOpen(true)}>
            <Pen size={20} className="text-rose-500 transition duration-150 hover:text-green-500" />
          </div>
          <div>
            <DeleteType fishTypeId={id} onDelete={reFetchType} />
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-500 opacity-50 my-2" />
      <EditType isOpen={isOpen} setIsOpen={setIsOpen} onEdit={reFetchType} typeId={id} name={name} />
    </>
  );
}
