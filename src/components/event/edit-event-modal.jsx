/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./scss/event.module.scss";
import { useAuth } from "../../context/use-context";
import EditEventForm from "./forms/edit-event-form";
import { editEvent } from "../../api/event-api";

export default function EditEvent({ isOpen, setIsOpen, onEdit, eventId, name }) {
  const { userToken } = useAuth();

  const handleEdit = async (eventName) => {
    try {
      await editEvent(userToken, eventId, eventName);
      if (onEdit) {
        onEdit();
      }
    } catch (error) {
      console.error("Failed to edit event:", error);
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
        <h1 className="text-xl flex justify-center text-rose-500 font-bold my-3">Edit Event</h1>
        <EditEventForm name={name} setIsOpen={setIsOpen} onSubmit={handleEdit} />
      </div>
    </div>
  );
  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
