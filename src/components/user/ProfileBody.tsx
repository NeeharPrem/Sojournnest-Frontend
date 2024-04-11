import { useState, useEffect } from "react";
import Loader from "../common/Loader";
import { updateProfile,uploadId} from "../../api/userapi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProfileOtp from "./ProfileOtp";
import { sentOtp, checkUpdateEmail, updateEmail } from "../../api/userapi";

interface ProfileBody {
  userInfo: {
    fname: string;
    lname: string;
    email: string;
    mobile: string;
    id:string;
    isgoogle: boolean; 
    is_approved: boolean;
    verifyId: string
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
  const [selectedId, setSelectedId] = useState<File | null>(null);
  const [oldpass, setOldPass] = useState("");
  const [newpass, setNewPass] = useState("");
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isEmailUpdate, setisEmailUpdate]=useState(false)

  const { mutate: sentOTP } = useMutation({
    mutationFn: sentOtp,
    onSuccess: async (response) => {
      if (response?.status === 200 && response.data.state == true) {
        toast.success(response.data.message)
      } else if (response?.status === 200 && response.data.state == false) {
        toast.success(response.data.message)
      }
    },
  });

  const { mutate: checkMail } = useMutation({
    mutationFn: checkUpdateEmail,
    onSuccess: async (response) => {
      if (response?.status === 200 && response.data.state == true) {
        toast.success(response.data.message)
        setIsOtpModalOpen(true);
      } else if (response?.status === 200 && response.data.state == false) {
        toast.success(response.data.message)
      }
    },
  });

  const { mutate:mailUpdate } = useMutation({
    mutationFn: updateEmail,
    onSuccess: async (response) => {
      if(response?.data.status===200){
        toast.success(response?.data.data.message)
        setIsEmailEditing(false)
        refetch()
      }
    },
  });

  const handleEmailEditClick = () => {
    const data={
      email:email
    }
    sentOTP(data)
    setIsOtpModalOpen(true);
  };

  const handleEmailCancelClick = () => {
    setIsEmailEditing(false);
  };

  const handleEmailSave=()=>{
    const data={
      id:userInfo.id,
      email:email
    }
    mailUpdate(data)
  }
  
  const handleEmailSaveClick = () => {
    if (!email) {
      toast.error('Email cannot be empty');
      return;
    }
    const data={
      email:email
    }
    setisEmailUpdate(true)
    setIsEmailEditing(false)
    checkMail(data)
  };

  const handleCloseOtp=()=>{
    setIsOtpModalOpen(false)
  }

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

  const validateName = (name: string) => {
    return /^[A-Za-z]+[A-Za-z\s]*$/.test(name.trim());
  };

  const handleNameSaveClick = () => {
    if (!validateName(firstName) || !validateName(lastName)) {
      toast.error("Invalid name format");
      return;
    }
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

  const handleIdChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedId(files[0]);
    } else {
      setSelectedId (null);
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

  const handleIdupload = async () => {
    try {
      if (selectedId) {
        const formData = new FormData();
        formData.append("verifyId", selectedId);
        updateId({ id: userInfo.id, userData: formData });
        setSelectedId(null);
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

  const { mutate: updateId } = useMutation({
    mutationFn: uploadId,
    onSuccess: (response) => {
      toast.success("Id uploaded")
      if (response) refetch();
    },
  });

  const renderOtpModal = () => {
    if (isOtpModalOpen) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <ProfileOtp onClose={handleCloseOtp} setIsEmailEditing={setIsEmailEditing} EmailSave={handleEmailSave} isEmailUpdate={isEmailUpdate}/>
        </div>
      );
    }
  };

  return (
    <>
      {renderOtpModal()}
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
                {isEmailEditing && userInfo.isgoogle === false ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  <div className="pt-2">{`${email}`}</div>
                )}
              </div>
              {isEmailEditing && userInfo.isgoogle === false ? (
                <>
                  <div className="flex flex-col">
                    <button
                      className="font-medium text-black px-3 py-1 underline"
                      onClick={handleEmailSaveClick}
                    >
                      save
                    </button>
                    <button
                      className="font-medium text-black px-3 py-1 underline"
                      onClick={handleEmailCancelClick}
                    >
                      cancel
                    </button>
                  </div>
                </>
              ) : (
                userInfo.isgoogle === false && (
                  <button
                    className="font-medium text-black px-3 py-1 underline"
                    onClick={handleEmailEditClick}
                  >
                    edit
                  </button>
                )
              )}
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
           {!userInfo.is_approved && userInfo.verifyId === "" && (
 <div className="border-b p-5 flex items-center justify-between">
    <div className="flex flex-col">
      <div className="font-bold text-lg">Upload verification Id</div>
      <div className="pt-2">
        <input
          type="file"
          className="py-2 px-2 text-white rounded-full"
          accept="image/*"
          onChange={(e) => handleIdChange(e.target.files)}
        />
      </div>
    </div>
    {selectedId && (
      <div className="ml-2">
        <span className="font-medium">{selectedId.name}</span>
      </div>
    )}
    <button
      className="font-medium text-black px-3 py-1 underline"
      onClick={handleIdupload}
    >
      upload
    </button>
 </div>
)}
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default ProfileBody;