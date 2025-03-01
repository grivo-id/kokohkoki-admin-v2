/* eslint-disable react/prop-types */

import { useState } from "react";
import { Pen } from "lucide-react";
import DeleteSchedule from "./delete-schedule";
import EditSchedule from "./edit-schedule-modal";

export default function ScheduleItem({ reFetchSchedule, id, scheduleImage, scheduleName }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-center text-center gap-2 items-center">
        <div className="flex gap-5 w-full justify-between">
          <p className="text-gray-600 font-bold text-lg">{scheduleName}</p>
          <div className="flex gap-3 ">
            <div onClick={() => setIsOpen(true)}>
              <Pen size={20} className="text-rose-500 transition duration-150 hover:text-green-500" />
            </div>
            <div>
              <DeleteSchedule scheduleId={id} onDelete={reFetchSchedule} />
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img src={scheduleImage} alt="shipping-schedule-img" className="aspect-video object-cover rounded-lg shadow" />
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-500 opacity-50 my-5" />
      <EditSchedule 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        onEdit={reFetchSchedule} 
        scheduleName={scheduleName} 
        scheduleImage={scheduleImage} 
        scheduleId={id}

    />
    </>
  );
}
