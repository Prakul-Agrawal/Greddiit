import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TextureIcon from "@mui/icons-material/Texture";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";
import { mySubgreddiitState } from "../../atoms/mySubgreddiit";

function Navbar() {
  const [user, setUser] = useRecoilState(userState);
  const [mySubgreddiit, setMySubgreddiit] = useRecoilState(mySubgreddiitState);
  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
    setMySubgreddiit({});
  };

  return (
    <nav>
      <div className="flex">
        <div className="flex justify-center bg-black w-1/4">
          <div className="text-orange-400">
            <Link to={"/dashboard/profile"}>
              Profile
              <PersonIcon fontSize="large" style={{ color: "#FB923C" }} />
            </Link>
          </div>
        </div>
        <div className="flex justify-center bg-black w-1/4">
          <div className="text-orange-400">
            <Link to={"/dashboard/subgreddiits/home"}>
              Subgreddiits
              <ListAltIcon fontSize="large" style={{ color: "#FB923C" }} />
            </Link>
          </div>
        </div>
        <div className="flex justify-center bg-black w-1/4">
          <div className="text-orange-400">
            <Link to={"/dashboard/mysubgreddiits/home"}>
              My Subgreddiits
              <TextureIcon fontSize="large" style={{ color: "#FB923C" }} />
            </Link>
          </div>
        </div>
        <div className="flex justify-center bg-black w-1/4">
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
