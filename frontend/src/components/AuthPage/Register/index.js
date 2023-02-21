import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    fname: "",
    lname: "",
    age: "",
    email: "",
    number: "",
    username: "",
    password: "",
  });

  const change = (c) => {
    setUserdata({ ...userdata, [c.target.id]: c.target.value });
  };

  const submit = () => {
    const registerUser = async () => {
      try {
        const response = await axios.post("/api/user/register", {
          username: userdata.username,
          password: userdata.password,
          first_name: userdata.fname,
          last_name: userdata.lname,
          age: userdata.age,
          contact_no: userdata.number,
          email: userdata.email,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard/profile");
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          alert(err.response.data.msg);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      }
    };

    registerUser();
  };

  const disabled = !(
    userdata.fname &&
    userdata.lname &&
    userdata.age &&
    userdata.email &&
    userdata.number &&
    userdata.username &&
    userdata.password
  );
  return (
    <>
      <div className="flex justify-center text-7xl font-bold mb-12">
        Register on Greddiit
      </div>
      <div className="flex justify-center items-center">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="flex justify-center">
            <div className="bg-white rounded-lg m-1">
              <TextField id="fname" label="First Name" onChange={change} />
            </div>
            <div className="bg-white rounded-lg m-1">
              <TextField id="lname" label="Last Name" onChange={change} />
            </div>
          </div>
          <div className="flex justify-center mb-5">
            <div className="bg-white rounded-lg m-1">
              <TextField id="age" label="Age" type="number" onChange={change} />
            </div>
          </div>
          <div className="flex justify-center mb-5">
            <div className="bg-white rounded-lg m-1">
              <TextField id="email" label="Email ID" onChange={change} />
            </div>
            <div className="bg-white rounded-lg m-1">
              <TextField
                id="number"
                label="Contact Number"
                type="number"
                onChange={change}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg m-1">
              <TextField id="username" label="Username" onChange={change} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg m-1">
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={change}
              />
            </div>
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

export default RegisterPage;
