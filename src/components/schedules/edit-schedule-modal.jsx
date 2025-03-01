/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./scss/schedule.module.scss";
import { useAuth } from "../../context/use-context";
import { editSchedule } from "../../api/schedule-api";
import EditScheduleForm from "./forms/edit-schedule-form";

export default function EditSchedule({ isOpen, setIsOpen, onEdit, scheduleName, scheduleImage, scheduleId }) {
  const { userToken } = useAuth();

  const handleEdit = async (formData) => {
    try {
      await editSchedule(scheduleId, formData, userToken);
      if (onEdit) {
        onEdit();
      }
    } catch (error) {
      console.error("Failed to edit schedule:", error);
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
        <h1 className="text-xl flex justify-center text-rose-500 font-bold my-3">Edit: {scheduleName}</h1>
        <EditScheduleForm onSubmit={handleEdit} scheduleImage={scheduleImage} scheduleName={scheduleName} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
