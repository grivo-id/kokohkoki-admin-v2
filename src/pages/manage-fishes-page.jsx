import { useEffect, useState } from "react";
import { getAllFishes } from "../api/fish-api";
import ContentWrapper from "../components/UI/content-wrapper";
import FishItem from "../components/fish/fish-item";
import SearchFish from "../components/fish/search-fish";
import AddFish from "../components/fish/add-fish-modal";
import { getAllTypes } from "../api/type-api";
import FishPagination from "../components/fish/fish-pagination";
import { getAllEvents } from "../api/event-api";
import SortFishes from "../components/fish/sorting-fishes";

export default function ManageFishPage() {
  const [fishes, setFishes] = useState([]);
  const [types, setTypes] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState({
    fishes: false,
    types: false,
    events: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchFishes = async () => {
      setLoading((prev) => ({ ...prev, fishes: true }));
      try {
        const data = await getAllFishes();
        setFishes(data.data);
      } catch (error) {
        console.error("Failed to fetch fishes:", error);
      } finally {
        setLoading((prev) => ({ ...prev, fishes: false }));
      }
    };
    fetchFishes();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading((prev) => ({ ...prev, types: true }));
      try {
        const typeList = await getAllTypes();
        setTypes(typeList.data);
      } catch (error) {
        console.error("Failed to fetch types:", error);
      } finally {
        setLoading((prev) => ({ ...prev, types: false }));
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading((prev) => ({ ...prev, events: true }));
      try {
        const eventList = await getAllEvents();
        setEventList(eventList.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading((prev) => ({ ...prev, events: false }));
      }
    };
    fetchEvents();
  }, []);

  const reFetchFishes = async () => {
    setLoading((prev) => ({ ...prev, fishes: true }));
    try {
      const data = await getAllFishes();
      setFishes(data.data);
    } catch (error) {
      console.error("Failed to re-fetch fishes:", error);
    } finally {
      setLoading((prev) => ({ ...prev, fishes: false }));
    }
  };

  const filteredFishes = fishes.filter(
    (fish) =>
      fish.name.toLowerCase().includes(searchQuery) ||
      fish.type.toLowerCase().includes(searchQuery)
  );
  const totalPages = Math.ceil(filteredFishes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFishes = filteredFishes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <section id="fish-section" className="section-wrapper">
        <h1 className="text-rose-500 text-2xl font-bold mb-6">Manage Fishes</h1>
        <div className="flex flex-wrap justify-between items-center mb-3">
          <button
            className="bg-rose-500 text-white px-3 py-2.5 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            Add Fish
          </button>
          <SearchFish onSearch={handleSearch} />
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <FishPagination
            totalPages={totalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
          <SortFishes
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
        </div>
        <ContentWrapper loading={loading.fishes}>
          {currentFishes.map((fish) => (
            <FishItem
              key={fish.id}
              {...fish}
              reFetchFishes={reFetchFishes}
              typesData={types}
              eventList={eventList}
            />
          ))}
        </ContentWrapper>
      </section>
      <AddFish
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        types={types}
        onAdd={reFetchFishes}
        eventList={eventList}
      />
    </>
  );
}
