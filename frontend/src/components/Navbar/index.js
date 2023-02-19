import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("userInfo");
  };

  return (
    <nav>
      <div className="flex">
        <div className="flex justify-start bg-black w-1/2">
          <div className="text-orange-400">
            <Link to={"/dashboard/profile"}>
              Profile
              <PersonIcon fontSize="large" style={{ color: "#FB923C" }} />
            </Link>
          </div>
        </div>
        <div className="flex justify-end bg-black w-1/2">
          <div className="text-orange-400" onClick={logout}>
            <Link to={"/"}>
              Logout
              <LogoutIcon fontSize="large" style={{ color: "#FB923C" }} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
