import { useState } from "react";

function FollowPage() {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const followers = 2,
    following = 3;

  return (
    <>
      <div className="flex justify-center items-center h-1/2">
        <div className="flex-col mx-auto text-white">
          <div
            className="text-5xl underline font-bold"
            onClick={() => setShowFollowers(!showFollowers)}
          >
            Followers: {followers}
          </div>
          {showFollowers && (
            <div className="m-7 text-3xl font-thin">
              <ul>
                <li>Follower 1</li>
                <li>Follower 2</li>
              </ul>
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
            Following: {following}
          </div>
          {showFollowing && (
            <div className="m-7 text-3xl font-thin">
              <ul>
                <li>Person 1</li>
                <li>Person 2</li>
                <li>Person 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FollowPage;
