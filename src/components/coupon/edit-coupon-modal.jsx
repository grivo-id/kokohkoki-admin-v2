/* eslint-disable react/prop-types */
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { editCoupon } from "../../api/coupon-api";
import { useAuth } from "../../context/use-context";
import classes from "./scss/coupon.module.scss";
import EditCouponForm from "./forms/edit-coupon-form";
import { X } from "lucide-react";

export default function EditCoupon({
  isOpen,
  setIsOpen,
  onEdit,
  couponName,
  discountMinTransactionFish,
  discountMinTransactionIdr,
  discountMinTransactionUsd,
  discountPercentage,
  discountMaxPriceIdr,
  discountMaxPriceUsd,
  expirationDate,
}) {
  const { userToken } = useAuth();

  const handleEditCoupon = async (formData) => {
    try {
      await editCoupon(userToken, formData, couponName);
      if (onEdit) {
        onEdit();
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
        <h1 className="text-xl flex justify-center text-rose-500 font-bold my-3">
          Edit Coupon: {couponName}
        </h1>
        <EditCouponForm
          setIsOpen={setIsOpen}
          onSubmit={handleEditCoupon}
          discountMinTransactionFish={discountMinTransactionFish}
          discountMinTransactionIdr={discountMinTransactionIdr}
          discountMinTransactionUsd={discountMinTransactionUsd}
          discountPercentage={discountPercentage}
          discountMaxPriceIdr={discountMaxPriceIdr}
          discountMaxPriceUsd={discountMaxPriceUsd}
          expirationDate={expirationDate}
        />
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return ReactDOM.createPortal(content, document.getElementById("portal"));
}
