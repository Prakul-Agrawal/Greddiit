import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function RegisterPage() {
    return (
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
                    <TextField
                        className="bg-white"
                        id="fname"
                        label="First Name"
                    />
                </div>
                <div className="bg-white rounded-lg m-1">
                    <TextField
                        id="lname"
                        label="Last Name"
                    />
                </div>
              </div>
              <div className="flex justify-center mb-5">
                <div className="bg-white rounded-lg m-1">
                  <TextField
                      id="age"
                      label="Age"
                      type="number"
                  />
                </div>

              </div>
              <div className="flex justify-center mb-5">
              <div className="bg-white rounded-lg m-1">
                <TextField
                    id="email"
                    label="Email ID"
                />
              </div>
                <div className="bg-white rounded-lg m-1">
                  <TextField
                      id="number"
                      label="Contact Number"
                      type="number"
                    />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-lg m-1">
                    <TextField
                        id="username"
                        label="Username"
                    />
                </div>
              </div>
                <div className="flex justify-center">
                <div className="bg-white rounded-lg m-1">
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        // autoComplete="current-password"
                    />
                </div>
                </div>
            </Box>
    );
}

export default RegisterPage;
