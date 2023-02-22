import Followers from "./Followers";
import Following from "./Following";

function FollowPage() {
  return (
    <>
      <div className="flex justify-center items-center h-1/2">
        <div className="flex-col mx-auto text-white">
          <div className="text-5xl underline font-bold">
            <Followers />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-1/2">
        <div className="flex-col mx-auto text-white">
          <div className="text-5xl underline font-bold">
            <Following />
          </div>
        </div>
      </div>
    </>
  );
}

export default FollowPage;
