import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/user";

function FollowPage() {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const user = useRecoilValue(userState);
  const followerList = user.followers.map((u) => (
    <li key={u._id}>{u.username}</li>
  ));
  const followingList = user.following.map((u) => (
    <li key={u._id}>{u.username}</li>
  ));

  return (
    <>
      <div className="flex justify-center items-center h-1/2">
        <div className="flex-col mx-auto text-white">
          <div
            className="text-5xl underline font-bold"
            onClick={() => setShowFollowers(!showFollowers)}
          >
            Followers: {user.followers_count}
          </div>
          {showFollowers && (
            <div className="m-7 text-3xl font-thin">
              <ul>{followerList}</ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center h-1/2">
        <div className="flex-col mx-auto text-white">
          <div
            className="text-5xl underline font-bold"
            onClick={() => setShowFollowing(!showFollowing)}
          >
            Following: {user.following_count}
          </div>
          {showFollowing && (
            <div className="m-7 text-3xl font-thin">
              <ul>{followingList}</ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FollowPage;
