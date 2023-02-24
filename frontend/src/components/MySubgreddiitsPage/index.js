import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";
import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function MySubgreddiitsPage() {
  const [user, setUser] = useRecoilState(userState);
  const [open, setOpen] = useState(false);
  const [subgreddiitData, setSubgreddiitData] = useState({
    name: "",
    description: "",
    tags: "",
    banned: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const change = (c) => {
    setSubgreddiitData({ ...subgreddiitData, [c.target.id]: c.target.value });
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
          "/api/subgreddiit/create",
          {
            name: subgreddiitData.name,
            description: subgreddiitData.description,
            tags: subgreddiitData.tags,
            banned: subgreddiitData.banned,
          },
          config
        );
        const response = await axios.get("/api/user", config);
        setUser(response.data.user);
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

  if (!user._id) {
    return (
      <div className="flex justify-center items-center text-8xl font-bold h-full">
        Loading...
      </div>
    );
  }

  const moderatedSubgreddiits = user.moderated_subgreddiits.map((s) => (
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
          <Button size="small">Delete Subgreddiit</Button>
          <Button size="small">Open Subgreddiit</Button>
        </CardActions>
      </Card>
    </div>
  ));

  return (
    <>
      <div className="flex mx-auto text-7xl font-extrabold text-white m-5">
        My Subgreddits Page
      </div>
      <div className="flex justify-center mb-7">
        <Button variant="contained" onClick={handleClickOpen} sx>
          Create New Subgreddiit
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className="flex justify-center text-purple-900 font-bold">
            New Subgreddiit
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex justify-center">
            <DialogContentText>
              Please fill the following details to create a new subgreddiit
            </DialogContentText>
          </div>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={change}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            variant="standard"
            onChange={change}
          />
          <TextField
            margin="dense"
            id="tags"
            label="Space Separated Tags"
            fullWidth
            variant="standard"
            onChange={change}
          />
          <TextField
            margin="dense"
            id="banned"
            label="Space Separated Banned Words"
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
      <div className="flex flex-col">{moderatedSubgreddiits}</div>
    </>
  );
}

export default MySubgreddiitsPage;
