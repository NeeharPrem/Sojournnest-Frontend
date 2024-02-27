import { useState } from "react";
import { useNavigate } from 'react-router-dom';

interface ProfileMenu {
  userInfo: {
    fname: string;
    lname: string;
    email: string;
    mobile: string;
    profilePic: string;
  };
  profileBodyChanges: number;
}

const ProfileMenu: React.FC<ProfileMenu> = ({ userInfo }) => {
  const [selectedOption, setSelectedOption] = useState("Bookings");
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate()

  const optionHandler = (val: string) => {
    switch (val) {
      case "Bookings":
        navigate('/bookings');
        break;
      case "BookingHistory":
      case "Wishlist":
        navigate('/wishlist');
        break;
      default:
        navigate('/');
    }
  };

  const options = [
    { label: "Bookings", value: "Bookings" },
    // { label: "Booking History", value: "BookingHistory" },
    // { label: "Wallet History", value: "WalletHistory" },
    {label: "Wishlist",value:"Wishlist"}
  ];
  return (
    <div className="flex flex-col items-center lg:w-80">
      <div>
        <img
          src={`${userInfo.profilePic}`}
          alt="Profile Pic"
          className="w-40 h-40 md:w-20 md:h-20 rounded-full object-cover mt-4"
        />
      </div>
      <div className="pt-10 justify-center">{`${userInfo.fname} ${userInfo.lname}`}</div>
      <div className="bg-white shadow rounded w-44 text-center h-fit hidden lg:block">
        <div className="pt-2 px-5">
          {options.map((option) => (
            <div
              key={option.value}
              className={`py-3 border-b hover:bg-gray-100 transition-all duration-100 cursor-pointer ${
                selectedOption === option.value && "bg-gray-100"
              }`}
              onClick={() => {
                setSelectedOption(option.value);
                optionHandler(option.value);
              }}
            >
              <h1 className="text-lg">{option.label}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow flex rounded justify-center gap-7 relative w-full lg:hidden">
        <div className="relative w-full">
          <div
            className="cursor-pointer rounded p-2 bg-white shadow focus:outline-none text-center"
            onClick={() => setShowOptions(!showOptions)}
          >
            <p className="uppercase">{selectedOption}</p>
          </div>
          {showOptions && (
            <div className="absolute bg-white mt-2 py-1 w-full border border-gray-300 rounded shadow-lg text-center z-50">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedOption(option.value);
                    optionHandler(option.value);
                    setShowOptions(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
