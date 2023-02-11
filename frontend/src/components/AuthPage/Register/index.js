import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

function RegisterPage() {
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
            <Button variant="contained" size="large" disabled={disabled}>
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}

export default RegisterPage;
