import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";
import Button from "@mui/material/Button";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import axios from "axios";
import { subgreddiitState } from "../../atoms/subgreddiit";
import Evil from "../../assets/evil.png";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function PostsPage() {
  const [displayOption, setDisplayOption] = useState(1);
  const user = useRecoilValue(userState);
  const [subgreddiit, setSubgreddiit] = useRecoilState(subgreddiitState);

  const respondToRequest = (userID, flag) => {
    const performAction = async () => {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      try {
        if (flag) {
          await axios.patch(
            "/api/subgreddiit/acceptrequest",
            {
              id: subgreddiit._id,
              user_id: userID,
            },
            config
          );
        } else {
          await axios.patch(
            "/api/subgreddiit/rejectrequest",
            {
              id: subgreddiit._id,
              user_id: userID,
            },
            config
          );
        }
        const response = await axios.get(
          `/api/subgreddiit/${subgreddiit.name}`,
          config
        );
        // console.log(response.data);
        setSubgreddiit(response.data);
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
    performAction();
  };

  if (!user._id || !subgreddiit._id) {
    return (
      <div className="flex justify-center items-center text-8xl font-bold h-full">
        Loading...
      </div>
    );
  }

  const subgreddiitUsers = subgreddiit.followers.map((u) => (
    <div key={u._id} className="mb-3">
      <Card sx={{ maxWidth: "50vw", margin: "auto" }}>
        <CardContent>
          <div className="text-center text-3xl mb-2 font-bold">
            {u.username}
          </div>
          <div className="flex mb-3">
            <div className="w-1/2 text-center">First Name: {u.first_name}</div>
            <div className="w-1/2 text-center">Last Name: {u.last_name}</div>
          </div>
          <div className="text-center mb-2">Age: {u.age}</div>
          <div className="text-center mb-2">Contact Number: {u.contact_no}</div>
          <div className="text-center mb-2">Email ID: {u.email}</div>
        </CardContent>
      </Card>
    </div>
  ));

  const subgreddiitRequests = subgreddiit.join_requests.map((u) => (
    <div key={u._id} className="mb-3">
      <Card sx={{ maxWidth: "50vw", margin: "auto" }}>
        <CardContent>
          <div className="text-center text-3xl mb-2 font-bold">
            {u.username}
          </div>
          <div className="flex mb-3">
            <div className="w-1/2 text-center">First Name: {u.first_name}</div>
            <div className="w-1/2 text-center">Last Name: {u.last_name}</div>
          </div>
          <div className="text-center mb-2">Age: {u.age}</div>
          <div className="text-center mb-2">Contact Number: {u.contact_no}</div>
          <div className="text-center mb-2">Email ID: {u.email}</div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              respondToRequest(u._id, 1);
            }}
          >
            Accept Request
          </Button>
          <Button
            size="small"
            onClick={() => {
              respondToRequest(u._id, 0);
            }}
          >
            Reject Request
          </Button>
        </CardActions>
      </Card>
    </div>
  ));

  return (
    <>
      <div className="flex mx-auto text-7xl font-extrabold text-white m-5">
        {subgreddiit.name}
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col w-1/2 h-full justify-center items-center">
          <div className="flex w-full h-full justify-center items-center">
          <img
            src={Evil}
            className="flex-initial w-1/2 h-1/2"
            alt="Greddiit Logo"
          />
          </div>
          <div>
          <Box
            className="m-10"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="flex justify-center mb-5">
              <div className="text-center bg-white rounded-lg m-1">
                <TextField
                  id="description"
                  label="Description"
                  value={subgreddiit.description}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center mb-5">
              <div className="text-center bg-white rounded-lg m-1">
                <TextField
                  id="tags"
                  label="Tags"
                  value={subgreddiit.tags.map((x) => " " + x)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center mb-5">
              <div className="text-center bg-white rounded-lg m-1">
                <TextField
                    id="banned"
                    label="Banned Words"
                    value={subgreddiit.banned.map((x) => " " + x)}
                    InputProps={{
                      readOnly: true,
                    }}
                />
              </div>
            </div>
          </Box>
          </div>
        </div>
        <div className="w-1/2 h-full justify-center items-center"></div>
      </div>
    </>
  );
}

export default PostsPage;
