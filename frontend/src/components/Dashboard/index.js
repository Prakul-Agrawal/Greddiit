import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "../ProfilePage";
import Navbar from "../Navbar";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";
import SubgreddiitsPage from "../SubgreddiitsPage";
import MySubgreddiitsPage from "../MySubgreddiitsPage";
import { mySubgreddiitState } from "../../atoms/mySubgreddiit";
import ModeratedPage from "../ModeratedPage";
import PostsPage from "../PostsPage";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [user, setUser] = useRecoilState(userState);
  const [mySubgreddiit, setMySubgreddiit] = useRecoilState(mySubgreddiitState);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (
      location.pathname !== "/dashboard" &&
      location.pathname !== "/dashboard/profile" &&
      location.pathname !== "/dashboard/subgreddiits/home" &&
      location.pathname !== "/dashboard/subgreddiits/specific" &&
      location.pathname !== "/dashboard/mysubgreddiits/home" &&
      location.pathname !== "/dashboard/mysubgreddiits/moderated" &&
      location.pathname !== "/dashboard/" &&
      location.pathname !== "/dashboard/profile/" &&
      location.pathname !== "/dashboard/mysubgreddiits/home/" &&
      location.pathname !== "/dashboard/mysubgreddiits/specific/" &&
      location.pathname !== "/dashboard/mysubgreddiits/home/" &&
      location.pathname !== "/dashboard/mysubgreddiits/moderated/"
    )
      navigate("/notfound");
  }, [location, navigate]);

  useEffect(() => {
    const getUser = async () => {
      if (!user.id) {
        const config = {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        };
        try {
          const response = await axios.get("/api/user", config);
          setUser(response.data.user);
        } catch (err) {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log(err.message);
          }
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };
    getUser();
    setMySubgreddiit({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Route path="/subgreddiits/home" element={<SubgreddiitsPage />} />
        <Route path="/subgreddiits/specific" element={<PostsPage />} />
        <Route path="/mysubgreddiits/home" element={<MySubgreddiitsPage />} />
        <Route path="/mysubgreddiits/moderated" element={<ModeratedPage />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
