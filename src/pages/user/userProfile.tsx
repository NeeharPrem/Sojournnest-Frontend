import Navbar from "../../components/Navbar";
import ProfileBody from "../../components/user/ProfileBody";
import ProfileMenu from "../../components/user/ProfileButton";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../../api/userapi";

const UserProfile = () => {
  const [profileBodyChanges] = useState(0);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: userProfile,
  });

  const userInfo = {
    fname: userData?.data?.fname || "",
    lname: userData?.data?.lname || "",
    email: userData?.data?.email || "",
    mobile: userData?.data?.mobile || "",
    profilePic: userData?.data?.profilePic,
    id:userData?.data?._id,
    isgoogle:userData?.data?.is_google
  };

  return (
    <>
      <Navbar />
      <div className="lg:flex flex-row justify-evenly mt-10 pb-20 lg:pt-10 pt-7 px-5 md:px-14 xl:px-28">
        <div className="lg:flex lg:items-center">
          <ProfileMenu
            userInfo={userInfo}
            profileBodyChanges={profileBodyChanges}
          />
        </div>
        <ProfileBody
          refetch={refetch}
          isLoading={isLoading}
          userInfo={userInfo}
        />
      </div>
    </>
  );
};

export default UserProfile;
