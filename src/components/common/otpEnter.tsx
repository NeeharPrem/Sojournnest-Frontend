import React, { useState, ChangeEvent, useRef, KeyboardEvent } from "react";
import { signupVerification } from "../../api/userapi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface OTPScreenProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIscomplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTPScreen: React.FC<OTPScreenProps> = ({
  setIsLogin,
  isLogin,
  setIscomplete,
}) => {
  const [otp, setOTP] = useState<string>("");
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (/^\d*$/.test(value)) {
      setOTP((prevOTP) => {
        const newOTP = prevOTP.split("");
        newOTP[index] = value;
        const updatedOTP = newOTP.join("");
        if (index < inputRefs.length - 1 && value !== "") {
          inputRefs[index + 1].current?.focus();
        }

        return updatedOTP;
      });
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const formData = {
      otp: otp,
    };
    otpMutation(formData);
  };

  const { mutate: otpMutation } = useMutation({
    mutationFn: signupVerification,
    onSuccess: (response) => {
      console.log(response);
      if (response?.status === 200) {
        toast.success("Otp verified");
        setIsLogin(!isLogin);
        setIscomplete(false);
      } else if (response?.status === 400) {
        toast.error(response.data.message);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-lg border-b">
        <h1 className="text-3xl font-bold mb-4">Enter OTP</h1>
        <div className="flex items-center justify-center space-x-4">
          {inputRefs.map((inputRef, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-16 h-16 border border-gray-300 text-3xl text-center rounded-lg"
              value={otp[index] || ""}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={inputRef}
            />
          ))}
        </div>
        <button
          className="bg-black text-white px-4 py-2 mt-4 rounded-md flex justify-center items-center mx-auto"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTPScreen;
