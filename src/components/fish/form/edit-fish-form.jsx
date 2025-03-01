/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "../scss/fish.module.scss";
import { ImagePlus, Check, X } from "lucide-react";
import { api } from "../../../api/api-config";
import { parsePrice, formatPrice } from "../../../utils/formatter";

export default function EditFishForm({
  isAvailable,
  name,
  gender,
  type,
  price,
  price_usd,
  images1,
  images2,
  images3,
  size,
  videoURL,
  isDiscount,
  isEvent,
  event,
  isNewArrival,
  setIsOpen,
  onSubmit,
  typesData,
  eventList,
  discountPercentage,
  discountPriceIdr,
  discountPriceUsd,
}) {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: name,
    gender: gender,
    type: type,
    price: price,
    price_usd: price_usd,
    size: size,
    videoURL: videoURL,
    isAvailable: isAvailable,
    isNewArrival: isNewArrival,
    isEvent: isEvent,
    event: event,
    isDiscount: isDiscount,
    discountPercentage: discountPercentage || 0,
    discountPriceIdr: discountPriceIdr || 0,
    discountPriceUsd: discountPriceUsd || 0,
    image1: images1,
    image2: images2,
    image3: images3,
  });

  const [previews, setPreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
  });
  const [selectedFiles, setSelectedFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      let newFormData = { ...prevFormData };

      let parsedValue = value;

      if (["price", "price_usd", "discountPercentage"].includes(name)) {
        parsedValue = parsePrice(value);
      } else if (
        ["isAvailable", "isNewArrival", "isEvent", "isDiscount"].includes(name)
      ) {
        parsedValue = value === "true";
      }

      newFormData[name] = parsedValue;

      if (name === "discountPercentage") {
        const discountRate = parsedValue / 100;
        if (newFormData.price) {
          newFormData.discountPriceIdr =
            newFormData.price - newFormData.price * discountRate;
        }
        if (newFormData.price_usd) {
          newFormData.discountPriceUsd =
            newFormData.price_usd - newFormData.price_usd * discountRate;
        }
      } else if (name === "price" || name === "price_usd") {
        const discountRate = newFormData.discountPercentage / 100;
        if (name === "price") {
          newFormData.discountPriceIdr =
            parsedValue - parsedValue * discountRate;
        } else if (name === "price_usd") {
          newFormData.discountPriceUsd =
            parsedValue - parsedValue * discountRate;
        }
      }

      return newFormData;
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    setSelectedFiles((prev) => ({ ...prev, [name]: file }));
  };

  const handleUpload = async (name) => {
    if (!selectedFiles[name]) return;

    const formData = new FormData();
    formData.append("file", selectedFiles[name]);
    formData.append("fileName", selectedFiles[name].name);

    try {
      const deleteImage = await api.delete("/upload-image/fish", {
        data: { fileName: formData[name] },
      });

      if (deleteImage.status === 200) {
        console.log("Image deleted");
      } else {
        console.error("Failed to delete image:", deleteImage.data.message);
      }
      const response = await api.post("/upload-image/fish", formData);
      const result = response.data.data;
      if (response.status === 200) {
        setFormData((prev) => ({ ...prev, [name]: result.fileUrl }));
        setPreviews((prev) => ({ ...prev, [name]: null }));
        setSelectedFiles((prev) => ({ ...prev, [name]: null }));
      } else {
        console.error("Upload failed:", result.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(formErrors).some(
      (error) => error !== undefined
    );

    if (hasErrors) {
      return;
    }

    onSubmit(formData);
    setFormErrors({});
  };

  const inputStyle = "input input-md w-full bg-white";
  const fileStyle =
    "file-input file-input-bordered file-input-primary w-full max-w-xs bg-white file-input-sm";
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 my-4 justify-start text-gray-700 mx-2 font-medium"
    >
      <div className={classes.modalGridForm}>
        <label htmlFor="isAvailable">Available</label>
        <select
          id="isAvailable"
          name="isAvailable"
          className="bg-white select select-ghost select-sm"
          value={formData.isAvailable}
          onChange={handleChange}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className={inputStyle}
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          className="bg-white select select-ghost select-sm"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          className="bg-white select select-ghost select-sm"
          value={formData.type}
          onChange={handleChange}
        >
          {typesData.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="price">Price IDR</label>
        <input
          id="price"
          name="price"
          type="text"
          className={inputStyle}
          autoComplete="off"
          value={formatPrice(formData.price.toString())}
          onChange={handleChange}
          required
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="price_usd">Price USD</label>
        <input
          id="price_usd"
          name="price_usd"
          type="text"
          className={inputStyle}
          autoComplete="off"
          value={formatPrice(formData.price_usd.toString())}
          onChange={handleChange}
          required
        />
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="isNewArrival">New Arrival</label>
        <select
          id="isNewArrival"
          name="isNewArrival"
          className="bg-white select select-ghost select-sm"
          value={formData.isNewArrival}
          onChange={handleChange}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="isEvent">Is Event ?</label>
        <select
          id="isEvent"
          name="isEvent"
          className="bg-white select select-ghost select-sm"
          value={formData.isEvent}
          onChange={handleChange}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="event">Change Event</label>
        <select
          id="event"
          name="event"
          className="bg-white select select-ghost select-sm"
          value={formData.event}
          onChange={handleChange}
        >
          <option value="">Pick one (only if you pick yes above)</option>
          {eventList.map((event) => (
            <option key={event.id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="isDiscount">Discount</label>
        <select
          id="isDiscount"
          name="isDiscount"
          className="bg-white select select-ghost select-sm "
          value={formData.isDiscount}
          onChange={handleChange}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPercentage">Discount%</label>
        <input
          id="discountPercentage"
          name="discountPercentage"
          type="number"
          className={inputStyle}
          autoComplete="off"
          value={formData.discountPercentage}
          onChange={handleChange}
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPriceIdr">Discount IDR</label>
        <input
          id="discountPriceIdr"
          name="discountPriceIdr"
          type="text"
          className={inputStyle}
          autoComplete="off"
          placeholder="Calculated discount price in IDR"
          onChange={handleChange}
          value={formatPrice(formData.discountPriceIdr.toString())}
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="discountPriceUsd">Discount USD</label>
        <input
          id="discountPriceUsd"
          name="discountPriceUsd"
          type="text"
          className={inputStyle}
          autoComplete="off"
          placeholder="Calculated discount price in USD"
          onChange={handleChange}
          value={formatPrice(formData.discountPriceUsd.toString())}
        />
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <div className={classes.modalGridForm}>
        <label htmlFor="size">Size</label>
        <input
          id="size"
          name="size"
          type="text"
          className={inputStyle}
          autoComplete="off"
          placeholder="optional"
          value={formData.size}
          onChange={handleChange}
        />
      </div>
      <div className={classes.modalGridForm}>
        <label htmlFor="videoURL">videoURL</label>
        <input
          id="videoURL"
          name="videoURL"
          type="text"
          className={inputStyle}
          autoComplete="off"
          placeholder="optional"
          value={formData.videoURL}
          onChange={handleChange}
        />
      </div>
      <div className="w-full h-[2px] bg-gray-300 opacity-75 my-2" />
      <h1 className="flex justify-center text-lg text-primary font-bold tracking-wider">
        Edit Image
      </h1>
      {["image1", "image2", "image3"].map((name, index) => (
        <div key={name} className={classes.modalGridForm}>
          <div className="h-20 w-20 border rounded-lg flex items-center justify-center bg-gray-200 relative">
            {previews[name] ? (
              <img
                src={previews[name]}
                className="aspect-square object-cover rounded-lg"
                alt="Preview"
              />
            ) : formData[name] ? (
              <img
                src={formData[name]}
                className="aspect-square object-cover rounded-lg"
                alt="Uploaded"
              />
            ) : (
              <ImagePlus className="h-full w-full p-1" />
            )}
          </div>
          <div>
            <label htmlFor={name}>
              {name === "image1" ? "Main Image" : `Sub-Image ${index}`}
            </label>
            <input
              id={name}
              name={name}
              type="file"
              className={fileStyle}
              onChange={handleFileChange}
            />
            {previews[name] && (
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="bg-green-500 text-white p-2 rounded-lg"
                  onClick={() => handleUpload(name)}
                >
                  <Check /> Yes, Upload
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded-lg"
                  onClick={() =>
                    setPreviews((prev) => ({ ...prev, [name]: null }))
                  }
                >
                  <X /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
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
          Edit
        </button>
      </div>
    </form>
  );
}
