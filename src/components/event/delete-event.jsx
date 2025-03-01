/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import { useAuth } from "../../context/use-context";
import { deleteEvent } from "../../api/event-api";

export default function DeleteEvent({ eventId, onDelete }) {
  const { userToken } = useAuth();

  const handleDeleteEvent = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this event?");
    if (isConfirmed) {
      try {
        await deleteEvent(userToken, eventId);
        if (onDelete) {
          onDelete();
        }
      } catch (error) {
        console.error("Failed to delete event", error);
      }
    } else {
      return;
    }
  };

  return (
    <button type="submit" onClick={handleDeleteEvent}>
      <Trash2 size={20} className="text-rose-500 transition duration-150 hover:text-rose-800" />
    </button>
  );
}
