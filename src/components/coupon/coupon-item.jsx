/* eslint-disable react/prop-types */
import classes from "./scss/coupon.module.scss";
import { idrFormatter, usdFormatter, dateFormatter } from "../../utils/formatter";
import DeleteCoupon from "./delete-coupon";
import { Pen } from "lucide-react";
import EditCoupon from "./edit-coupon-modal";
import { useState } from "react";

export default function CouponItem({
  reFetchCoupon,
  discountCode,
  discountMinTransaction_fish,
  discountMinTransaction_idr,
  discountMinTransaction_usd,
  discountPercentage,
  discountMaxPrice_idr,
  discountMaxPrice_usd,
  expirationDate,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`${classes.fishes} flex gap-2 items-start`}>
        <div className="text-black font-semibold flex flex-col w-full text-start text-sm">
          <p>
            Coupon Name: <span className="font-normal">{discountCode}</span>
          </p>
          <p>
            Minimum Transaction Fish:{" "}
            <span className="font-normal">{discountMinTransaction_fish}</span>
          </p>
          <p>
            Minimum Transaction IDR:{" "}
            <span className="font-normal">
              {idrFormatter(discountMinTransaction_idr)}
            </span>
          </p>
          <p>
            Minimum Transaction USD:{" "}
            <span className="font-normal">
              {usdFormatter(discountMinTransaction_usd)}
            </span>
          </p>
          <p>
            Discount Percentage: <span>{discountPercentage}%</span>
          </p>
          <p>
            Max Discount Price IDR:{" "}
            <span className="italic">{idrFormatter(discountMaxPrice_idr)}</span>
          </p>
          <p>
            Max Discount Price USD:{" "}
            <span className="italic">{usdFormatter(discountMaxPrice_usd)}</span>
          </p>
          <p>
            Expired Date: <span>{dateFormatter(expirationDate)}</span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div onClick={() => setIsOpen(true)}>
            <Pen
              size={20}
              className="text-rose-500 transition duration-150 hover:text-green-500"
            />
          </div>
          <div>
            <DeleteCoupon couponName={discountCode} onDelete={reFetchCoupon} />
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-500 opacity-50 my-2" />
      <EditCoupon
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onEdit={reFetchCoupon}
        couponName={discountCode}
        discountMinTransactionFish={discountMinTransaction_fish}
        discountMinTransactionIdr={discountMinTransaction_idr}
        discountMinTransactionUsd={discountMinTransaction_usd}
        discountMaxPriceIdr={discountMaxPrice_idr}
        discountMaxPriceUsd={discountMaxPrice_usd}
        discountPercentage={discountPercentage}
        expirationDate={expirationDate}
      />
    </>
  );
}
