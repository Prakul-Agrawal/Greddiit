import { useRecoilState } from "recoil";
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
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

function PostsPage() {
  const [user, setUser] = useRecoilState(userState);
  const [subgreddiit, setSubgreddiit] = useRecoilState(subgreddiitState);
  const [open, setOpen] = useState(false);
  const [textData, setTextData] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const change = (c) => {
    setTextData(c.target.value);
  };

  const create = () => {
    const createSubgreddiit = async () => {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      try {
        await axios.post(
          "/api/post/create",
          {
            text: textData,
            posted_in: subgreddiit._id,
            posted_by_id: user._id,
            posted_by_name: user.first_name.concat(" ", user.last_name),
          },
          config
        );
        const response1 = await axios.get("/api/user", config);
        setUser(response1.data.user);
        const response2 = await axios.get(
          `/api/subgreddiit/${subgreddiit.name}`,
          config
        );
        // console.log(response.data);
        setSubgreddiit(response2.data);
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
    createSubgreddiit();
    setOpen(false);
  };

  const respondToPostRequest = (postID, postedByID, option) => {
    const performAction = async () => {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      try {
        if (option === 1) {
          await axios.patch(
            "/api/post/upvote",
            {
              id: postID,
            },
            config
          );
        } else if (option === 2) {
          await axios.patch(
            "/api/post/downvote",
            {
              id: postID,
            },
            config
          );
        } else if (option === 3) {
          await axios.patch(
            "/api/post/removeupvote",
            {
              id: postID,
            },
            config
          );
        } else if (option === 4) {
          await axios.patch(
            "/api/post/removedownvote",
            {
              id: postID,
            },
            config
          );
        } else if (option === 5) {
          await axios.patch(
            "/api/post/savepost",
            {
              id: postID,
            },
            config
          );
        } else if (option === 6) {
          await axios.patch(
            "/api/user/following/follow",
            {
              id: postedByID,
            },
            config
          );
        }
        const response1 = await axios.get("/api/user", config);
        setUser(response1.data.user);
        const response2 = await axios.get(
          `/api/subgreddiit/${subgreddiit.name}`,
          config
        );
        setSubgreddiit(response2.data);
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

  const subgreddiitPosts = subgreddiit.posts.map((u) => (
    <div key={u._id} className="mb-3">
      <Card sx={{ maxWidth: "50vw", margin: "auto" }}>
        <CardContent>
          <div className="text-center mb-2">{u.text}</div>
          <div className="text-center mb-2">- {u.posted_by_name}</div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              respondToPostRequest(u._id, u.posted_by_id, 1);
            }}
          >
            Upvote
          </Button>
          <Button
            size="small"
            onClick={() => {
              respondToPostRequest(u._id, u.posted_by_id, 2);
            }}
          >
            Downvote
          </Button>
          <Button
            size="small"
            onClick={() => {
              respondToPostRequest(u._id, u.posted_by_id, 3);
            }}
          >
            Remove Upvote
          </Button>
          <Button
            size="small"
            onClick={() => {
              respondToPostRequest(u._id, u.posted_by_id, 4);
            }}
          >
            Remove Downvote
          </Button>
          <Button
            size="small"
            onClick={() => {
              respondToPostRequest(u._id, u.posted_by_id, 5);
            }}
          >
            Save
          </Button>
          <Button
            size="small"
            onClick={() => {
              respondToPostRequest(u._id, u.posted_by_id, 6);
            }}
          >
            Follow User
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
        <div className="flex flex-col w-1/2 h-full justify-center items-center bg-orange-600">
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
              <div className="flex justify-center mb-2">
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
              <div className="flex justify-center mb-2">
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
              <div className="flex justify-center">
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
        <div className="w-1/2 h-full justify-center items-center bg-orange-600">
          <div className="flex justify-center mb-7">
            <Button variant="contained" onClick={handleClickOpen}>
              Create New Post
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                <div className="flex justify-center text-purple-900 font-bold">
                  New Post
                </div>
              </DialogTitle>
              <DialogContent>
                <div className="flex justify-center">
                  <DialogContentText>
                    Please fill the following details to create a new post
                  </DialogContentText>
                </div>
                <TextField
                  margin="dense"
                  id="text"
                  label="Text"
                  fullWidth
                  variant="standard"
                  onChange={change}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={create}>Create</Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="flex flex-col bg-orange-600">{subgreddiitPosts}</div>
        </div>
      </div>
    </>
  );
}

export default PostsPage;
