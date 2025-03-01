/* eslint-disable react/prop-types */
export default function SearchFish({ onSearch}) {
  return (
    <form>
    <input 
      id="search-fish" 
      type="text" 
      placeholder="Search Fish Name or Type" 
      className="input input-bordered border-black max-w-xs bg-white"
      onChange={(e) => onSearch(e.target.value)}
    />
  </form>
  );
}
