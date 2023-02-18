import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import FollowPage from "./Follow";

function ProfilePage() {
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user');
      const json = await response.json();

      if (response.ok) {
        setUser(json);
      }
    }

    fetchUser();
  }, [])

  return (
    <>
      <div className="flex mx-auto text-7xl font-extrabold text-white m-5">
        Profile Page for {user && user.username}
      </div>
      <div className="flex flex-1">
        <div className="w-1/2 h-full justify-center items-center">
          <div className="flex h-full justify-center items-center">
            <Box
              className="m-10"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="flex justify-center mb-5">
                <div className="bg-white rounded-lg m-1 mr-5">
                  <TextField
                    id="fname"
                    label="First Name"
                    // defaultValue={user && user.username}
                    defaultValue="Prakul"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
                <div className="bg-white rounded-lg m-1 ml-5">
                  <TextField
                    id="lname"
                    label="Last Name"
                    defaultValue="Agrawal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center mb-5">
                <div className="bg-white rounded-lg m-1">
                  <TextField
                    id="age"
                    label="Age"
                    type="number"
                    defaultValue="19"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center mb-5">
                <div className="bg-white rounded-lg m-1 mr-5">
                  <TextField
                    id="email"
                    label="Email ID"
                    defaultValue="temp@gmail.com"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
                <div className="bg-white rounded-lg m-1 ml-5">
                  <TextField
                    id="number"
                    label="Contact Number"
                    type="number"
                    defaultValue="9876543210"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-20">
                <Stack
                  direction="row"
                  spacing={7}
                  className="flex justify-center items-center"
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setEditable(true)}
                  >
                    Edit
                  </Button>
                  {}
                  {editable && (
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => setEditable(false)}
                    >
                      Save
                    </Button>
                  )}
                </Stack>
              </div>
            </Box>
          </div>
        </div>
        <div className="flex-col w-1/2 h-full justify-center items-center">
          <FollowPage />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;