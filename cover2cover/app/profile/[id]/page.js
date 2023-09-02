"use client";
import pb from "@/app/pocketbase";
import ReadList from "@/app/components/Profile/ReadList";
import ShowMyReviews from "@/app/components/myReviews/showMyReviews";

export default ({ params }) => {
  const user = pb.authStore.model;

  const getProfilePic = () => {
    console.log(user);
    if (user.avatar !== "" && user.avatar !== null) {
      return user.avatar;
    } else {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
    }
  };

  return (
    <div className="relative flex w-full flex-col">
      <div className="relative flex justify-start">
        <div className="relative self-start overflow-hidden rounded-full">
          <img
            src={getProfilePic()}
            alt="Profile Picture"
            className="h-[200px] w-[200px] object-cover"
          />
        </div>
        <div className="relative ml-8 mt-4 flex flex-col">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-3xl font-bold">Your list:</h2>
        <ReadList user={params.id} />
      </div>
      <div className="mt-8">
        <h2 className="font-3xl font-bold">Your reviews:</h2>
        <ShowMyReviews user={params.id} />
      </div>
    </div>
  );
};
