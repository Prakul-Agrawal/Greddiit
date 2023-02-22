import Box from "@mui/material/Box";
import { Avatar, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useRecoilState } from "recoil";
import { userState } from "../../../../atoms/user";
import axios from "axios";

function Following() {
  const [user, setUser] = useRecoilState(userState);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClose = () => {
    setOpen(false);
  };

  const unfollow = (userID) => {
    const removeFollowing = async () => {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      try {
        await axios.patch(
          "/api/user/following/unfollow",
          {
            id: userID,
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
    removeFollowing();
  };

  const followingList = user.following.map((u) => (
    <Box display="grid">
      <MenuItem onClick={handleClose}>
        <div className="mr-2">
          <Avatar />
        </div>
        {u.username}
        <div className="ml-10">
          <Button onClick={() => unfollow(u._id)}> Unfollow </Button>
        </div>
      </MenuItem>
    </Box>
  ));

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <div onClick={handleClickOpen("paper")}>
        Following: {user.following_count}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <div className="flex justify-center text-purple-900 font-bold">
            Following
          </div>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {followingList}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Following;
