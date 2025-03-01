/* eslint-disable react/prop-types */

import { useEffect } from "react";
import ReactDOM from "react-dom";
import { createEvent } from "../../api/event-api";
import { useAuth } from "../../context/use-context";
import { X } from "lucide-react";
import classes from "./scss/event.module.scss";
import AddEventForm from "./forms/add-event-forms";

export default function AddEvent({ isOpen, setIsOpen, onAdd }) {
  const { userToken } = useAuth();

  const handleAddEvent = async (name) => {
    try {
      await createEvent(userToken, name);
      if (onAdd) {
        onAdd();
      }
    } catch (error) {
      console.error("Failed to add event:", error);
    } finally {
      setIsOpen(false);
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
        <h1 className="text-xl flex justify-center text-rose-500 font-bold my-3">Add Event</h1>
        <AddEventForm setIsOpen={setIsOpen} onSubmit={handleAddEvent} />
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
