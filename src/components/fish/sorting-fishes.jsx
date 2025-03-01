/* eslint-disable react/prop-types */

export default function SortFishes({ value, onChange }) {
  return (
    <div className="flex gap-1 items-center text-gray-600">
      <label htmlFor="itemsPerPage">Show:</label>
      <select
        id="itemsPerPage"
        value={value}
        onChange={onChange}
        className="my-2.5 px-2.5 py-1.5 text-sm bg-white w-fit rounded-lg "
      >
        {[15, 30, 50, 100].map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
  );
}
