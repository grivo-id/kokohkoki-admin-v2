import { Settings, Menu } from "lucide-react";
import { useAuth } from "../../context/use-context";
import Logout from "../auth/logout";
import { Link } from "react-router-dom";

export default function SideDrawer() {
  const { userPayload } = useAuth();
  const username = userPayload?.username;

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="flex transition duration-200 hover:text-rose-800"
        >
          <Menu size={30} />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-white text-gray-700">
          <span className="font-bold tracking-wider text-lg">Menu</span>
          <span>{username}</span>
          <div className="w-full h-[2px] bg-gray-300 opacity-30 my-2" />
          <li>
            <Link to="/dashboard">Manage Fishes</Link>
          </li>
          <li>
            <Link to="/dashboard/type">Manage Types</Link>
          </li>
          <li>
            <Link to="/dashboard/event">Manage Events</Link>
          </li>
          <li>
            <Link to="/dashboard/coupon">Manage Coupons</Link>
          </li>
          {/* <li>
            <Link to="/dashboard/schedule">Manage Schedules</Link>
          </li> */}
          <div className="w-full h-[2px] bg-gray-300 opacity-30 mt-5" />
          <li>
            <div>
              <Settings size={18} />
              <Link to="/dashboard/setting">Settings</Link>
            </div>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </div>
  );
}
