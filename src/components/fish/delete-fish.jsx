/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import { useAuth } from "../../context/use-context";
import { deleteFish } from "../../api/fish-api";
import Swal from "sweetalert2";

export default function DeleteFish({ fishId, onDelete }) {
  const { userToken } = useAuth();

  const handleDeleteFish = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteFish(userToken, fishId);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The fish has been successfully deleted.",
          confirmButtonColor: "#3085d6",
        });

        onDelete();
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete fish:", error);

        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "There was an error deleting the fish. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <button type="button" onClick={handleDeleteFish}>
      <Trash2
        size={20}
        className="text-rose-500 transition duration-150 hover:text-rose-800"
      />
    </button>
  );
}
