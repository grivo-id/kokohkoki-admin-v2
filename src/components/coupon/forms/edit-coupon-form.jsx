/* eslint-disable react/prop-types */

import { useState } from "react";
import { couponFormSchema } from "../../../utils/validation";
import * as Yup from "yup";
import classes from "../scss/coupon.module.scss";

export default function EditCouponForm({
  setIsOpen,
  onSubmit,
  discountMinTransactionFish,
  discountMinTransactionIdr,
  discountMinTransactionUsd,
  discountPercentage,
  discountMaxPriceIdr,
  discountMaxPriceUsd,
  expirationDate,
}) {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    discountMinTransactionFish: discountMinTransactionFish,
    discountMinTransactionIdr: discountMinTransactionIdr,
    discountMinTransactionUsd: discountMinTransactionUsd,
    discountPercentage: discountPercentage,
    discountMaxPriceUsd: discountMaxPriceUsd,
    discountMaxPriceIdr: discountMaxPriceIdr,
    expirationDate: expirationDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue;

    if (
      name === "discountMinTransactionFish" ||
      name === "discountMinTransactionIdr" ||
      name === "discountMinTransactionUsd" ||
      name === "discountPercentage" ||
      name === "discountMaxPriceUsd" ||
      name === "discountMaxPriceIdr"
    ) {
      finalValue = parseFloat(value) || 0;
    } else {
      finalValue = value;
    }

    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    try {
      await couponFormSchema.validate(formData, { abortEarly: false });
      onSubmit(formData);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setFormErrors(errors);
      } else {
        console.error("Submission error:", error);
      }
    }
  };

  const inputStyle = "input input-md w-full bg-white";
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 my-4 justify-start text-gray-700 mx-2 font-medium"
    >
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPercentage">Discount Percentage</label>
        <input
          id="discountPercentage"
          name="discountPercentage"
          type="text"
          placeholder="contoh: 50"
          className={inputStyle}
          autoComplete="off"
          value={formData.discountPercentage}
          onChange={handleChange}
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountMinTransactionFish">
          Set Min Transaction Fish
        </label>
        <input
          id="discountMinTransactionFish"
          name="discountMinTransactionFish"
          type="text"
          placeholder="contoh: 2"
          className={inputStyle}
          autoComplete="off"
          value={formData.discountMinTransactionFish}
          onChange={handleChange}
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountMinTransactionIdr">
          Set Min Transaction IDR
        </label>
        <input
          id="discountMinTransactionIdr"
          name="discountMinTransactionIdr"
          type="text"
          placeholder="contoh: 5000"
          className={inputStyle}
          autoComplete="off"
          value={formData.discountMinTransactionIdr}
          onChange={handleChange}
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountMinTransactionUsd">
          Set Min Transaction USD
        </label>
        <input
          id="discountMinTransactionUsd"
          name="discountMinTransactionUsd"
          type="text"
          placeholder="contoh: 50"
          className={inputStyle}
          autoComplete="off"
          value={formData.discountMinTransactionUsd}
          onChange={handleChange}
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountMaxPriceIdr">Set Max Price IDR</label>
        <input
          id="discountMaxPriceIdr"
          name="discountMaxPriceIdr"
          type="text"
          placeholder="contoh: 100000"
          className={inputStyle}
          autoComplete="off"
          value={formData.discountMaxPriceIdr}
          onChange={handleChange}
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountMaxPriceUsd">Set Max Price USD</label>
        <input
          id="discountMaxPriceUsd"
          name="discountMaxPriceUsd"
          type="text"
          placeholder="contoh: 100"
          className={inputStyle}
          autoComplete="off"
          value={formData.discountMaxPriceUsd}
          onChange={handleChange}
        />
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="expirationDate">Set Expiration Date</label>
        <input
          id="expirationDate"
          name="expirationDate"
          type="date"
          className="input input-md w-full bg-slate-400"
          autoComplete="off"
          value={formData.expirationDate}
          onChange={handleChange}
        />
      </div>
      {Object.keys(formErrors).length > 0 && (
        <div className="error-messages text-rose-500 text-sm italic flex flex-col items-end justify-end">
          {Object.values(formErrors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <div className="flex gap-2 justify-end">
        <button
          type="reset"
          onClick={() => setIsOpen(false)}
          className="px-4 py-1.5 rounded-lg mt-4 text-white bg-rose-500 border-none transition duration-150 ease-in-out hover:opacity-75"
        >
          Close
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 rounded-lg mt-4 text-white bg-green-500 border-none transition duration-150 ease-in-out hover:opacity-75"
        >
          Edit Coupon
        </button>
      </div>
    </form>
  );
}
