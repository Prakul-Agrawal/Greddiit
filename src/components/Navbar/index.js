import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("check");
    navigate("/");
  };

  return (
    <nav>
      <div className="flex justify-end bg-black">
        <div className="text-orange-400" onClick={logout}>
          Logout
          <LogoutIcon fontSize="large" style={{ color: "#FB923C" }} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
