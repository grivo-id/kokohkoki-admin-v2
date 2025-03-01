/* eslint-disable react/prop-types */
import { Pen } from "lucide-react";
import DeleteEvent from "./delete-event";
import { useState } from "react";
import EditEvent from "./edit-event-modal";

export default function EventItem({ id, name, reFetchEvents }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex gap-2 items-center text-gray-600 font-semibold">
        <p className="w-full text-start">
          Event Name: <span className="font-normal">{name}</span>
        </p>
        <div className="flex flex-col gap-3">
          <div onClick={() => setIsOpen(true)}>
            <Pen size={20} className="text-rose-500 transition duration-150 hover:text-green-500" />
          </div>
          <div>
            <DeleteEvent eventId={id} onDelete={reFetchEvents} />
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-500 opacity-50 my-2" />
      <EditEvent isOpen={isOpen} setIsOpen={setIsOpen} eventId={id} name={name} onEdit={reFetchEvents} />
    </>
  );
}
