/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./scss/coupon.module.scss";
import { createCoupon } from "../../api/coupon-api";
import { useAuth } from "../../context/use-context";
import AddCouponForm from "./forms/add-coupon-forms";

export default function AddCoupon({ isOpen, setIsOpen, onAdd }) {
  const { userToken } = useAuth();

  const handleAddCoupon = async (formData) => {
    try {
      await createCoupon(userToken, formData);
      if (onAdd) {
        onAdd();
      }
    } catch (error) {
      console.error("Failed to add fish:", error);
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
        <h1 className="text-xl flex justify-center text-rose-500 font-bold my-3">Create Coupon Code</h1>
        <AddCouponForm setIsOpen={setIsOpen} onSubmit={handleAddCoupon} />
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
