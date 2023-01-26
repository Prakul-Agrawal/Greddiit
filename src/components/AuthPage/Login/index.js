import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [userdata, setUserdata] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const change = (c) => {
    setUserdata({ ...userdata, [c.target.id]: c.target.value });
  };

  const submit = () => {
    if (userdata.username === "admin" && userdata.password === "admin") {
      localStorage.setItem("check", "true");
      navigate("/dashboard/profile");
    }
  };

  const disabled = !userdata.username || !userdata.password;

  return (
    <>
      <div className="flex justify-center text-7xl font-bold mb-12">
        Login to Greddiit
      </div>
      <div className="flex justify-center">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="bg-white rounded-lg m-3">
            <TextField id="username" label="Username" onChange={change} />
          </div>
          <div className="bg-white rounded-lg m-3">
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={change}
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button
              variant="contained"
              size="large"
              disabled={disabled}
              onClick={submit}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}

export default LoginPage;
