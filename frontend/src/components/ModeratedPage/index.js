import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../atoms/user";
import { mySubgreddiitState } from "../../atoms/mySubgreddiit";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import axios from "axios";

function ModeratedPage() {
  const [displayOption, setDisplayOption] = useState(1);
  const user = useRecoilValue(userState);
  const [mySubgreddiit, setMySubgreddiit] = useRecoilState(mySubgreddiitState);

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
              id: mySubgreddiit._id,
              user_id: userID,
            },
            config
          );
        } else {
          await axios.patch(
            "/api/subgreddiit/rejectrequest",
            {
              id: mySubgreddiit._id,
              user_id: userID,
            },
            config
          );
        }
        const response = await axios.get(
          `/api/subgreddiit/${mySubgreddiit.name}`,
          config
        );
        // console.log(response.data);
        setMySubgreddiit(response.data);
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

  if (!user._id || !mySubgreddiit._id) {
    return (
      <div className="flex justify-center items-center text-8xl font-bold h-full">
        Loading...
      </div>
    );
  }

  const subgreddiitUsers = mySubgreddiit.followers.map((u) => (
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

  const subgreddiitRequests = mySubgreddiit.join_requests.map((u) => (
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
        {mySubgreddiit.name}
      </div>
      <div className="mb-5">
        <Stack
          direction="row"
          spacing={7}
          className="flex justify-center items-center"
        >
          <Button
            variant="contained"
            sx={{ fontSize: 20 }}
            onClick={() => setDisplayOption(1)}
          >
            Users
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: 20 }}
            onClick={() => setDisplayOption(2)}
          >
            Join Requests
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: 20 }}
            onClick={() => setDisplayOption(3)}
          >
            Stats
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: 20 }}
            onClick={() => setDisplayOption(4)}
          >
            Reports
          </Button>
        </Stack>
      </div>
      <div className="flex flex-col">
        {displayOption === 1 ? (
          <div>
            <div className="flex justify-center text-4xl font-bold mb-2">
              Users
            </div>
            <div className="flex flex-col bg-orange-600">
              {subgreddiitUsers}
            </div>
          </div>
        ) : displayOption === 2 ? (
          <div>
            <div className="flex justify-center text-4xl font-bold mb-2">
              Join Requests
            </div>
            <div className="flex flex-col bg-orange-600">
              {subgreddiitRequests}
            </div>
          </div>
        ) : displayOption === 3 ? (
          <div>
            <div className="flex justify-center text-4xl font-bold mb-2">
              Stats
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center text-4xl font-bold mb-2">
              Reports
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ModeratedPage;
