import {useState} from "react";
import Cute from "../../assets/login.png";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex justify-center w-screen h-screen text-white">
      <div className="hidden lg:flex w-1/2 h-full bg-blue-900 justify-center items-center">
        <img
          src={Cute}
          className="flex-initial w-1/2 h-1/2"
          alt="Greddiit Logo"
        />
      </div>
      <div className="w-full lg:w-1/2 h-full bg-orange-500">
        <div className="flex h-1/5 justify-center items-center">
          <Stack
            direction="row"
            spacing={7}
            className="flex justify-center items-center"
          >
            <Button variant="contained" sx={{ fontSize: 24, width: 150 }} onClick={() => setShowLogin(true)}>
              Login
            </Button>
            <Button variant="contained" sx={{ fontSize: 24 }} onClick={() => setShowLogin(false)}>
              Register
            </Button>
          </Stack>
        </div>
        <div className="flex-col h-4/5 items-center justify-center">
          {
            showLogin ? <LoginPage/> : <RegisterPage/>
          }
        </div>
      </div>
    </div>
  );
}

export default Auth;
