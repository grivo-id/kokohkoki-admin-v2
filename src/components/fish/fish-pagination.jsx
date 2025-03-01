/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FishPagination({ totalPages, paginate, currentPage }) {
  const scrollFishIntoView = () => {
    setTimeout(() => {
      const fishSection = document.getElementById("fish-section");
      if (fishSection) {
        fishSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const backBtn = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
      scrollFishIntoView();
    }
  };

  const nextBtn = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
      scrollFishIntoView();
    }
  };

  const pageNumberSelect = (pageNumber) => {
    paginate(pageNumber);
    scrollFishIntoView();
  };

  const backDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  if (totalPages === 1) return null;

  return (
    <div className="flex flex-wrap gap-1 justify-start my-2.5 px-2 py-1 text-sm bg-white w-fit rounded-lg text-gray-600">
      <button
        className={`flex items-center cursor-pointer ${
          backDisabled
            ? `opacity-50 cursor-not-allowed`
            : `hover:text-gray-300 transition duration-300 ease-in-out`
        } `}
        onClick={backBtn}
        disabled={backDisabled}
      >
        <ChevronLeft />
        <span>Back</span>
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index}
          className={`flex items-center justify-center m-0 p-0 h-6 w-6 rounded-md cursor-pointer transition duration-300 ease-in-out ${
            currentPage === index + 1
              ? "bg-rose-500 opacity-90"
              : "bg-white hover:bg-rose-500"
          }`}
        >
          <a onClick={() => pageNumberSelect(index + 1)}>{index + 1}</a>
        </span>
      ))}
      <button
        className={`flex items-center cursor-pointer ${
          nextDisabled
            ? `opacity-50 cursor-not-allowed`
            : `hover:text-gray-300 transition duration-300 ease-in-out`
        } `}
        onClick={nextBtn}
        disabled={nextDisabled}
      >
        <span>Next</span> <ChevronRight />
      </button>
    </div>
  );
}
