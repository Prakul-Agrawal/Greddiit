import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import FollowPage from "./Follow";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";
import axios from "axios";

function ProfilePage() {
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const getUser = async () => {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      try {
        const response = await axios.get("/api/user", config);
        console.log("#####");
        console.log(response.data.user);
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
      }
    };

    getUser();
    // setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  if (!user)
    return (
      <div className="flex justify-center items-center text-8xl font-bold h-full">
        Loading...
      </div>
    );

  return (
    <>
      <div className="flex mx-auto text-7xl font-extrabold text-white m-5">
        Profile Page of {user.username}
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
                <div className="text-center bg-white rounded-lg m-1 mr-5">
                  <div>First Name</div>
                  <TextField
                    id="fname"
                    // label="First Name"
                    value={user.first_name}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
                <div className="text-center bg-white rounded-lg m-1 ml-5">
                  <div>Last Name</div>
                  <TextField
                    id="lname"
                    // label="Last Name"
                    value={user.last_name}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center mb-5">
                <div className="text-center bg-white rounded-lg m-1">
                  <div>Age Limit</div>
                  <TextField
                    id="age"
                    // label="Age"
                    type="number"
                    value={user.age}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center mb-5">
                <div className="text-center bg-white rounded-lg m-1 mr-5">
                  <div>Email ID</div>
                  <TextField
                    id="email"
                    // label="Email ID"
                    value={user.email}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
                <div className="text-center bg-white rounded-lg m-1 ml-5">
                  <div>Contact Number</div>
                  <TextField
                    id="number"
                    // label="Contact Number"
                    type="number"
                    value={user.contact_no}
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
