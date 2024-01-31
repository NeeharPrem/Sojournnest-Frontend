import { useState, useEffect } from "react";
import Loader from "../common/Loader";
import { updateProfile } from "../../api/userapi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ProfileBody {
  userInfo: {
    fname: string;
    lname: string;
    email: string;
    mobile: string;
    id:string;
    isgoogle:boolean;
  };
  isLoading: boolean;
  refetch:any
}

const ProfileBody: React.FC<ProfileBody> = ({
  refetch,
  userInfo,
  isLoading,
}) => {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isMobileEditing, setIsMobileEditing] = useState(false);
  const [isPassEditing, setIsPassEditing] = useState(false);
  const [firstName, setFirstName] = useState(userInfo.fname);
  const [lastName, setLastName] = useState(userInfo.lname);
  const [email, setEmail] = useState(userInfo.email);
  const [mobile, setMobile] = useState(userInfo.mobile);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [oldpass, setOldPass] = useState("");
  const [newpass, setNewPass] = useState("");

  useEffect(() => {
    setFirstName(userInfo.fname);
    setLastName(userInfo.lname);
    setEmail(userInfo.email);
    setMobile(userInfo.mobile);
  }, [userInfo]);

  const handleNameEditClick = () => {
    setIsNameEditing(true);
  };

  const handleMobileEditClick = () => {
    setIsMobileEditing(true);
  };

  const handlePassEditClick = () => {
    setIsPassEditing(true);
  };

  const handleCancelClick = () => {
    setIsNameEditing(false);
    setIsMobileEditing(false);
    setIsPassEditing(false);
  };

  const handleNameSaveClick = () => {
    if (!firstName || !lastName || !userInfo || !userInfo.id) {
      toast.error("First and Last Name cannot be empty");
      return;
    }
    const formData = new FormData();
    formData.append("fname", firstName);
    formData.append("lname", lastName);
    update({ id: userInfo.id, userData: formData });

    setIsNameEditing(false);
  };

  const handleMobileSaveClick = async () => {
    try {
      if (!mobile) {
        toast.error('Fill in the mobile number');
        return;
      }
      if (mobile.length !== 10) {
        toast.error('Fill in the mobile number properly');
        return;
      }
      const formData = new FormData();
      formData.append("mobile", mobile);
      update({ id: userInfo.id, userData: formData });
      setIsMobileEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Error updating profile');
    }
  };


  const handlePassSaveClick = () => {
    if (!oldpass || !newpass) {
      alert('Please enter both old and new passwords.');
      return;
    }
    const formData = new FormData();
    formData.append("password", oldpass);
    formData.append("newPassword", newpass);
    update({ id: userInfo.id, userData: formData });
    setIsPassEditing(false);
  };

  const handleAvatarChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedAvatar(files[0]);
    } else {
      setSelectedAvatar(null);
    }
  };

  const handleAvatarSaveClick = async () => {
    try {
      if (selectedAvatar) {
        const formData = new FormData();
        formData.append("avatar", selectedAvatar);
        update({ id: userInfo.id, userData: formData });
        setSelectedAvatar(null);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const { mutate: update } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      toast.success("Profile Updated")
      if (response) refetch();
    },
  });

  return (
    <>
      <div className="lg:border-l w-full">
        <div className="flex flex-col md:flex-row bg-white p-10">
          <div className="flex flex-col md:w-2/5 lg:w-full">
            <div className="border-b p-5 flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">Name</div>
                {isNameEditing ? (
                  <>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border p-1"
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border p-1 ml-2"
                    />
                  </>
                ) : (
                  <div className="pt-2">{`${firstName} ${lastName}`}</div>
                )}
              </div>
              {isNameEditing ? (
                <>
                  <div className="flex flex-col">
                    <button
                      className="font-medium text-black px-3 py-1 underline"
                      onClick={handleNameSaveClick}
                    >
                      save
                    </button>
                    <button
                      className="font-medium text-black px-3 py-1 underline"
                      onClick={handleCancelClick}
                    >
                      cancel
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="font-medium text-black px-3 py-1 underline"
                  onClick={handleNameEditClick}
                >
                  edit
                </button>
              )}
            </div>
            <div className="border-b p-5 flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">Email</div>
                <div className="pt-2">{`${email}`}</div>
              </div>
            </div>
            <div className="border-b p-5 flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">Mobile</div>
                {isMobileEditing ? (
                  <>
                    <input
                      type="Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="border p-1"
                    />
                  </>
                ) : (
                  <div className="pt-2">{`${mobile}`}</div>
                )}
              </div>
              {isMobileEditing ? (
                <>
                  <div className="flex flex-col">
                    <button
                      className="font-medium text-black px-3 py-1 underline"
                      onClick={handleMobileSaveClick}
                    >
                      save
                    </button>
                    <button
                      className="font-medium text-black px-3 py-1 underline"
                      onClick={handleCancelClick}
                    >
                      cancel
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="font-medium text-black px-3 py-1 underline"
                  onClick={handleMobileEditClick}
                >
                  edit
                </button>
              )}
            </div>
           {userInfo.isgoogle == false && (
              <div className="border-b p-5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">Password</div>
                  {isPassEditing ? (
                    <>
                      <input
                        type="text"
                        placeholder="Old password"
                        onChange={(e) => setOldPass(e.target.value)}
                        className="border p-1"
                      />
                      <input
                        type="text"
                        placeholder="New password"
                        onChange={(e) => setNewPass(e.target.value)}
                        className="border p-1 ml-2"
                      />
                    </>
                  ) : (
                    <div className="pt-2"></div>
                  )}
                </div>
                {isPassEditing ? (
                  <>
                    <div className="flex flex-col">
                      <button
                        className="font-medium text-black px-3 py-1 underline"
                        onClick={handlePassSaveClick}
                      >
                        save
                      </button>
                      <button
                        className="font-medium text-black px-3 py-1 underline"
                        onClick={handleCancelClick}
                      >
                        cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="font-medium text-black px-3 py-1 underline"
                    onClick={handlePassEditClick}
                  >
                    edit
                  </button>
                )}
              </div>
           )}
            <div className="border-b p-5 flex items-center justify-between">
              <div className="flex flex-col">
                <div className="font-bold text-lg">Avatar</div>
                <div className="pt-2">
                  <input
                    type="file"
                    className="py-2 px-2 text-white rounded-full"
                    accept="image/*"
                    onChange={(e) => handleAvatarChange(e.target.files)}
                  />
                </div>
              </div>
              {selectedAvatar && (
                <div className="ml-2">
                  <span className="font-medium">{selectedAvatar.name}</span>
                </div>
              )}
              <button
                className="font-medium text-black px-3 py-1 underline"
                onClick={handleAvatarSaveClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default ProfileBody;
