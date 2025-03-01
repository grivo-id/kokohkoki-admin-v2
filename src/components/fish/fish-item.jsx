/* eslint-disable react/prop-types */
import { idrFormatter, usdFormatter } from "../../utils/formatter";
import { Pen } from "lucide-react";
import classes from "./scss/fish.module.scss";
import { useState } from "react";

import DeleteFish from "./delete-fish";
import EditFish from "./edit-fish-modal";

export default function FishItem({
  id,
  name,
  type,
  gender,
  price,
  price_usd,
  size,
  videoURL,
  isDiscount,
  images1,
  images2,
  images3,
  desc,
  isAvailable,
  isEvent,
  event,
  isNewArrival,
  reFetchFishes,
  typesData,
  eventList,
  discountPercentage,
  discountPriceIdr,
  discountPriceUsd,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`${classes.fishes} flex gap-2 items-start`}>
        <div className="h-24 w-24">
          <img
            src={images1}
            alt="fish-img"
            className="aspect-square object-cover rounded-lg shadow"
          />
        </div>
        <div className="text-black w-full text-start text-sm flex flex-col">
          <p>
            Name: <span>{name}</span>
          </p>
          <p>
            Available: <span>{isAvailable ? "Yes" : "No"}</span>
          </p>
          <p className="flex flex-wrap gap-0 ">
            New Arrival:&nbsp;<span> {isNewArrival ? "Yes" : "No"}</span>
            &nbsp;-&nbsp;Event:&nbsp;<span> {isEvent ? "Yes" : "No"}</span>
          </p>
          <p></p>
          <p>
            Price:{" "}
            <span>
              {idrFormatter(price)} - {usdFormatter(price_usd)}
            </span>
          </p>
          <div className="flex flex-col">
            <p>
              Discount:{" "}
              <span>{isDiscount ? `Yes - ${discountPercentage}%` : "No"}</span>
            </p>
            {isDiscount && (
              <p>
                Discount Price:{" "}
                <span className="italic">
                  {idrFormatter(discountPriceIdr)} -{" "}
                  {usdFormatter(discountPriceUsd)}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div onClick={() => setIsOpen(true)}>
            <Pen
              size={20}
              className="text-rose-500 transition duration-150 hover:text-green-500"
            />
          </div>
          <div>
            <DeleteFish onDelete={reFetchFishes} fishId={id} />
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-500 opacity-80 my-2" />
      <EditFish
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onEdit={reFetchFishes}
        fishId={id}
        name={name}
        type={type}
        images1={images1}
        images2={images2}
        images3={images3}
        desc={desc}
        gender={gender}
        price={price}
        price_usd={price_usd}
        size={size}
        videoURL={videoURL}
        isDiscount={isDiscount}
        isAvailable={isAvailable}
        isEvent={isEvent}
        event={event}
        isNewArrival={isNewArrival}
        typesData={typesData}
        eventList={eventList}
        discountPercentage={discountPercentage}
        discountPriceIdr={discountPriceIdr}
        discountPriceUsd={discountPriceUsd}
      />
    </>
  );
}
