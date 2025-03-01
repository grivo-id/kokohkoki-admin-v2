import { Outlet } from "react-router-dom";
import SideDrawer from "./drawer-nav";

export default function Layout() {
  return (
    <>
      <header className="sticky h-heading top-0 z-20 flex justify-between items-center py-2 px-4 md:px-8 font-normal h-full bg-gray-100 shadow text-rose-500">
        <div>
          <SideDrawer />
        </div>
        <span className="font-semibold tracking-wide text-2xl">Admin</span>
      </header>
      <div className="">
        <Outlet />
      </div>
    </>
  );
}
