import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "../ProfilePage";
import Navbar from "../Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("check")) navigate("/");
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (
      location.pathname !== "/dashboard" &&
      location.pathname !== "/dashboard/profile" &&
      location.pathname !== "/dashboard/" &&
      location.pathname !== "/dashboard/profile/"
    )
      navigate("/notfound");
    // console.log(location.pathname)
  }, [location, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center text-8xl font-bold h-full">
        Loading...
      </div>
    );
  return (
    <div className="flex flex-col bg-orange-600 h-full w-full">
      <Navbar />
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
