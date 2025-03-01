import { LoginPage } from "./pages";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";
import { useAuth } from "./context/use-context";
import ManageFishPage from "./pages/manage-fishes-page";
import ManageTypePage from "./pages/manage-types-page";
import ManageEventPage from "./pages/manage-events-page";
import ManageCouponPage from "./pages/manage-coupon-page";
import ManageSchedulePage from "./pages/manage-schedule-page";
import SettingPage from "./pages/setting-page";

function App() {
  const { isLoggedIn } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      element: <Layout />,
      children: [
        // {
        //   path: "/dashboard",
        //   element: isLoggedIn ? <DashboardPage /> : <Navigate to="/" />,
        // },
        {
          path: "/dashboard",
          element: isLoggedIn ? <ManageFishPage /> : <Navigate to="/" />,
        },
        {
          path: "/dashboard/type",
          element: isLoggedIn ? <ManageTypePage /> : <Navigate to="/" />,
        },
        {
          path: "/dashboard/event",
          element: isLoggedIn ? <ManageEventPage /> : <Navigate to="/" />,
        },
        {
          path: "/dashboard/coupon",
          element: isLoggedIn ? <ManageCouponPage /> : <Navigate to="/" />,
        },
        {
          path: "/dashboard/schedule",
          element: isLoggedIn ? <ManageSchedulePage /> : <Navigate to="/" />,
        },
        {
          path: "/dashboard/setting",
          element: isLoggedIn ? <SettingPage /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
