/* eslint-disable react/prop-types */

export default function ContentWrapper({ children, loading }) {
  return (
    <div className="bg-white p-4 rounded-lg">
      {loading ? (
        <div className="flex flex-row items-center justify-center">
          <span className="loading loading-bars loading-xs"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-md"></span>
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
