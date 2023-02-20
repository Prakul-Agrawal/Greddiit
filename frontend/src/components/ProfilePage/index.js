import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import FollowPage from "./Follow";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";

function ProfilePage() {
  const [editable, setEditable] = useState(false);
  const user = useRecoilValue(userState);

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
                  <TextField
                    id="fname"
                    label="First Name"
                    value={user.first_name || ""}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
                <div className="text-center bg-white rounded-lg m-1 ml-5">
                  <TextField
                    id="lname"
                    label="Last Name"
                    value={user.last_name || ""}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center mb-5">
                <div className="text-center bg-white rounded-lg m-1">
                  <TextField
                    id="age"
                    label="Age"
                    type="number"
                    value={user.age || ""}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center mb-5">
                <div className="text-center bg-white rounded-lg m-1 mr-5">
                  <TextField
                    id="email"
                    label="Email ID"
                    value={user.email || ""}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </div>
                <div className="text-center bg-white rounded-lg m-1 ml-5">
                  <TextField
                    id="number"
                    label="Contact Number"
                    type="number"
                    value={user.contact_no || ""}
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
