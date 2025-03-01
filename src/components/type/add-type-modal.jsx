/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { createType } from "../../api/type-api";
import { useAuth } from "../../context/use-context";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import classes from "./scss/type.module.scss";
import AddTypeForm from "./forms/add-type-form";

export default function AddType({ isOpen, setIsOpen, onAdd }) {
  const { userToken } = useAuth();

  const handleAddType = async (name) => {
    try {
      await createType(name, userToken);
      if (onAdd) {
        onAdd();
      }
    } catch (error) {
      console.error("Failed to add type:", error);
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
        <h1 className="text-xl flex justify-center text-rose-500 font-bold my-3">Add Type</h1>
        <AddTypeForm onSubmit={handleAddType} setIsOpen={setIsOpen} />
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
