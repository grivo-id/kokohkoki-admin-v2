/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../../context/use-context";
import classes from "./scss/schedule.module.scss";
import { X } from "lucide-react";
import { createSchedule } from "../../api/schedule-api";
import AddScheduleForm from "./forms/add-schedule-form";

export default function AddSchedule({ isOpen, setIsOpen, onAdd }) {
  const { userToken } = useAuth();
  const [nameError, setNameError] = useState();

  const handleAddSchedule = async (formData) => {
    try {
      await createSchedule(userToken, formData);
      if (onAdd) {
        onAdd();
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add schedule:", error);
      setNameError(error.response.data.message);
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (isOpen) {
        body.style.overflowY = "hidden";
      } else {
        body.style.overflowY = "scroll";
      }
    }
  }, [isOpen]);

  const content = (
    <div className={classes.modal} onClick={() => setIsOpen(false)}>
      <button className="bg-none border-none text-gray-200 text-lg absolute cursor-pointer right-2 top-2">
        <X />
      </button>
      <div onClick={(e) => e.stopPropagation()} className={classes.modalCard}>
        <h1 className="text-xl flex justify-center text-rose-500 font-bold my-3">Add Schedule</h1>
        <AddScheduleForm setIsOpen={setIsOpen} onSubmit={handleAddSchedule} nameError={nameError} />
      </div>
    </div>
  );
  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
