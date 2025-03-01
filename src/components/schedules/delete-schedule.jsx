/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import { deleteSchedule } from "../../api/schedule-api";
import { useAuth } from "../../context/use-context";

export default function DeleteSchedule({ scheduleId, onDelete }) {
  const { userToken } = useAuth();

  const handleDeleteSchedule = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this schedule?");
    if (isConfirmed) {
      try {
        await deleteSchedule(scheduleId, userToken);
        if (onDelete) {
          onDelete();
        }
      } catch (error) {
        console.error("Failed to delete fish:", error);
      }
    } else {
      return;
    }
  };

  return (
    <button type="submit" onClick={handleDeleteSchedule}>
      <Trash2 size={20} className="text-rose-500 transition duration-150 hover:text-rose-800" />
    </button>
  );
}
