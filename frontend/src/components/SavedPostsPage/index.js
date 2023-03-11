import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import axios from "axios";

function SavedPostsPage() {
    const [user, setUser] = useRecoilState(userState);
    const [posts, setPosts] = useState([]);

    const getSavedPosts = async () => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        };
        try {
            const response = await axios.get("/api/post/saved", config);
            setPosts(response.data);
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
        getSavedPosts();
        // console.log(user);
    }, []);

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
                        "/api/post/unsavepost",
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
                    "/api/post/saved",
                    config
                );
                setPosts(response2.data);
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

    if (!user._id || !posts.saved_posts) {
        return (
            <div className="flex justify-center items-center text-8xl font-bold h-full">
                Loading...
            </div>
        );
    }

    const savedPosts = posts.saved_posts.map((u) => (
        <div key={u._id} className="mb-3">
            <Card sx={{ maxWidth: "50vw", margin: "auto" }}>
                <CardContent>
                    <div className="text-center mb-6">{u.text}</div>
                    <div className="flex justify-center mb-3">
                    <div className="text-center w-1/2">Posted by: {u.posted_by_name}</div>
                    <div className="text-center w-1/2">Subgreddiit: {u.posted_in.name}</div>
                    </div>
                    <div className="flex justify-center">
                        <div className="text-center w-1/2">Upvotes: {u.upvotes}</div>
                        <div className="text-center w-1/2">Downvotes: {u.downvotes}</div>
                    </div>
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
                        Unsave
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
                Saved Posts
            </div>
            <div className="flex flex-col bg-orange-600">{savedPosts}</div>

        </>
    );
}

export default SavedPostsPage;
