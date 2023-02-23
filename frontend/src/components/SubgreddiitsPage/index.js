import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

function SubgreddiitsPage() {
  const [user, setUser] = useRecoilState(userState);
  const [notJoined, setNotJoined] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const getNotJoined = async () => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get("/api/subgreddiit/notjoined", config);
      setNotJoined(response.data);
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

  const getSorted = async (sort_type) => {
    try {
      const response = await axios.get(`/api/subgreddiit/sort/${sort_type}`);
      setSorted(response.data);
      setIsSorted(true);
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

  useEffect(() => {
    getNotJoined();
  }, []);

  const leave = (subgreddiitID) => {
    const leaveSubgreddiit = async () => {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      try {
        await axios.patch(
          "/api/subgreddiit/leave",
          {
            id: subgreddiitID,
          },
          config
        );
        const response = await axios.get("/api/user", config);
        setUser(response.data.user);
        getNotJoined();
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
    leaveSubgreddiit();
  };

  const sendRequest = (subgreddiitID) => {
    const joinSubgreddiit = async () => {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      try {
        await axios.patch(
          "/api/subgreddiit/joinrequest",
          {
            id: subgreddiitID,
          },
          config
        );
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
    joinSubgreddiit();
  };

  if (!user._id) {
    return (
      <div className="flex justify-center items-center text-8xl font-bold h-full">
        Loading...
      </div>
    );
  }

  const joinedSubgreddiits = user.joined_subgreddiits.map((s) => (
    <div key={s._id} className="mb-3">
      <Card sx={{ maxWidth: "50vw", margin: "auto" }}>
        <CardContent>
          <div className="text-center text-2xl">{s.name}</div>
          <div className="text-center mb-3">{s.description}</div>
          <div className="flex mb-3">
            <div className="w-1/2 text-center">
              Number of Followers: {s.followers_count}
            </div>
            <div className="w-1/2 text-center">
              Number of Posts: {s.posts_count}
            </div>
          </div>
          <div className="text-center mb-2">
            Tags: {s.tags.map((x) => x + " ")}
          </div>
          <div className="text-center">
            Banned Words: {s.banned.map((x) => x + " ")}
          </div>
        </CardContent>
        <CardActions>
          {s.moderator === user._id ? (
            <Button size="small" disabled>
              Leave Subgreddiit
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => {
                leave(s._id);
              }}
            >
              Leave Subgreddiit
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  ));

  const notJoinedSubgreddiits = notJoined.map((s) => (
    <div key={s._id} className="mb-3">
      <Card sx={{ maxWidth: "50vw", margin: "auto" }}>
        <CardContent>
          <div className="text-center text-2xl">{s.name}</div>
          <div className="text-center mb-3">{s.description}</div>
          <div className="flex mb-3">
            <div className="w-1/2 text-center">
              Number of Followers: {s.followers_count}
            </div>
            <div className="w-1/2 text-center">
              Number of Posts: {s.posts_count}
            </div>
          </div>
          <div className="text-center mb-2">
            Tags: {s.tags.map((x) => x + " ")}
          </div>
          <div className="text-center">
            Banned Words: {s.banned.map((x) => x + " ")}
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              sendRequest(s._id);
            }}
          >
            Send Join Request
          </Button>
        </CardActions>
      </Card>
    </div>
  ));

  const sortedSubgreddiits = sorted.map((s) => (
    <div key={s._id} className="mb-3">
      <Card sx={{ maxWidth: "50vw", margin: "auto" }}>
        <CardContent>
          <div className="text-center text-2xl">{s.name}</div>
          <div className="text-center mb-3">{s.description}</div>
          <div className="flex mb-3">
            <div className="w-1/2 text-center">
              Number of Followers: {s.followers_count}
            </div>
            <div className="w-1/2 text-center">
              Number of Posts: {s.posts_count}
            </div>
          </div>
          <div className="text-center mb-2">
            Tags: {s.tags.map((x) => x + " ")}
          </div>
          <div className="text-center">
            Banned Words: {s.banned.map((x) => x + " ")}
          </div>
        </CardContent>
        <CardActions>
          {s.moderator === user._id ? (
            <Button size="small" disabled>
              Leave Subgreddiit
            </Button>
          ) : s.followers.includes(user._id) ? (
            <Button
              size="small"
              onClick={() => {
                leave(s._id);
              }}
            >
              Leave Subgreddiit
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => {
                sendRequest(s._id);
              }}
            >
              Send Join Request
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  ));

  return (
    <>
      <div className="flex mx-auto text-7xl font-extrabold text-white m-5">
        Subgreddits Page
      </div>
      <div className="flex justify-center mb-7">
        <Button
          variant="contained"
          sx={{ mx: 5 }}
          onClick={() => {
            getSorted("name_asc");
          }}
        >
          Sort by Name (Asc)
        </Button>
        <Button
          variant="contained"
          sx={{ mx: 5 }}
          onClick={() => {
            getSorted("name_desc");
          }}
        >
          Sort by Name (Desc)
        </Button>
        <Button
          variant="contained"
          sx={{ mx: 5 }}
          onClick={() => {
            getSorted("follow");
          }}
        >
          Sort by Followers
        </Button>
        <Button
          variant="contained"
          sx={{ mx: 5 }}
          onClick={() => {
            getSorted("creation");
          }}
        >
          Sort by Creation Date
        </Button>
        <Button
          variant="contained"
          sx={{ mx: 5 }}
          onClick={() => {
            setIsSorted(false);
          }}
        >
          Remove Sort
        </Button>
      </div>
      {isSorted ? (
        <div className="flex flex-col">{sortedSubgreddiits}</div>
      ) : (
        <div className="flex flex-col">
          {joinedSubgreddiits}
          {notJoinedSubgreddiits}
        </div>
      )}
    </>
  );
}

export default SubgreddiitsPage;
