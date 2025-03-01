/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import classes from "./scss/type.module.scss";
import { X } from "lucide-react";
import { useEffect } from "react";
import EditTypeForm from "./forms/edit-type-form";
import { editType } from "../../api/type-api";
import { useAuth } from "../../context/use-context";

export default function EditType({ isOpen, setIsOpen, onEdit, typeId, name }) {
  const { userToken } = useAuth();

  const handleEdit = async (typeName) => {
    try {
      await editType(typeId, typeName, userToken);
      if (onEdit) {
        onEdit();
      }
    } catch (error) {
      console.error("Failed to edit type:", error);
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
        <EditTypeForm setIsOpen={setIsOpen} name={name} onSubmit={handleEdit} />
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
