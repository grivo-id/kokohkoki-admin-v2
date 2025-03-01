import { useCallback, useEffect, useState } from "react";
import ContentWrapper from "../components/UI/content-wrapper";
import { getAllEvents } from "../api/event-api";
import EventItem from "../components/event/event-item";
import AddEvent from "../components/event/add-event-modal";

export default function ManageEventPage() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState([]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllEvents();
      setEvent(data.data.reverse());
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const reFetchEvents = () => {
    fetchEvents();
  };

  return (
    <>
      <section id="event-section" className="section-wrapper">
        <h1 className="text-rose-500 text-2xl font-bold mb-5">Manage Events</h1>
        <div className="flex flex-wrap justify-between items-center mb-3">
          <button className="bg-rose-500 text-white px-3 py-2.5 rounded-md" onClick={() => setIsOpen(true)}>
            Add Event
          </button>
        </div>
        <ContentWrapper loading={loading}>
          {event.map((event) => (
            <EventItem key={event.id} {...event} reFetchEvents={reFetchEvents} />
          ))}
        </ContentWrapper>
      </section>
      <AddEvent isOpen={isOpen} setIsOpen={setIsOpen} onAdd={reFetchEvents} />
    </>
  );
}
