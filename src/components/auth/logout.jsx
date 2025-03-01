import { LogOut } from "lucide-react";

export default function Logout() {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <button onClick={handleLogout}>
      <LogOut size={18} />
      Logout
    </button>
  );
}
