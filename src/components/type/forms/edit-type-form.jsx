/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "../scss/type.module.scss";

export default function EditTypeForm({ name, setIsOpen, onSubmit }) {
  const [typeName, setTypeName] = useState(name);

  const handleChange = (e) => {
    setTypeName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(typeName);
  };

  const inputStyle = "input input-md w-full bg-white";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4 justify-start text-gray-700 mx-2 font-medium">
      <div className={classes.modalGridForm}>
        <label htmlFor="name">Type Name</label>
        <input id="name" name="name" type="text" className={inputStyle} autoComplete="off" value={typeName} onChange={handleChange} required />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="reset" onClick={() => setIsOpen(false)} className="px-4 py-1.5 rounded-lg mt-4 text-white bg-rose-500 border-none transition duration-150 ease-in-out hover:opacity-75">
          Close
        </button>
        <button type="submit" className="px-4 py-1.5 rounded-lg mt-4 text-white bg-green-500 border-none transition duration-150 ease-in-out hover:opacity-75">
          Add Type
        </button>
      </div>
    </form>
  );
}
