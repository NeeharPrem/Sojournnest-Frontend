import React, { useState, ChangeEvent, useRef, KeyboardEvent, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";
import { verifyOtp, resentOtp } from "../../api/userapi";


interface OTPScreenProps {
    onClose: () => void;
    EmailSave:()=> void;
    setIsEmailEditing: (value: boolean) => void;
    isEmailUpdate:boolean;
}

const ProfileOtp: React.FC<OTPScreenProps> = ({ onClose, setIsEmailEditing, EmailSave, isEmailUpdate }) => {
    const [otp, setOTP] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [showResend, setShowResend] = useState(false);
    const [isEmailUpdateState, setIsEmailUpdateState] = useState(isEmailUpdate);


    useEffect(() => {
        if (!timeLeft) {
            setShowResend(true);
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

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
                return newOTP.join("");
            });

            if (value && index < inputRefs.length - 1) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && otp[index] === '' && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    useEffect(() => {
        setIsEmailUpdateState(isEmailUpdate);
    }, [isEmailUpdate]);


    const handleVerifyOtp = () => {
        const formData = { otp };
        if (isEmailUpdateState) {
            otpMutationEmailUpdate(formData);
        } else {
            otpMutationVerification(formData);
        }
    };

    const resendOtp = () => {
        resend();
        setTimeLeft(30);
        setShowResend(false);
    };

    const { mutate: resend } = useMutation({
        mutationFn: resentOtp,
        onSuccess: (response) => {
            if (response) {
                toast.success("OTP resent successfully.");
            }
        },
    });


    const { mutate: otpMutationEmailUpdate } = useMutation({
        mutationFn: verifyOtp,
        onSuccess: (response) => {
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                EmailSave();
                setIsEmailEditing(false);
                onClose();
            }
        },
    });

    const { mutate: otpMutationVerification } = useMutation({
        mutationFn: verifyOtp,
        onSuccess: (response) => {
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                setIsEmailEditing(true)
                onClose();
            }
        },
    });

    return (
            <div className="bg-white p-10 rounded-lg shadow-lg border-b">
            <button onClick={onClose} >
                <IoArrowBackOutline />
            </button>
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
                            disabled={showResend}
                        />
                    ))}
                </div>
                <div className="flex justify-evenly items-center mt-4">
                    {!showResend && (
                        <button
                            className="bg-black text-white px-4 py-2 rounded-md"
                            onClick={handleVerifyOtp}
                        >
                            Verify OTP
                        </button>
                    )}
                    {timeLeft > 0 ? (
                        <p>Resend OTP in {timeLeft} sec</p>
                    ) : (
                        <button
                            className="bg-black text-white px-4 py-2 rounded-md"
                            onClick={resendOtp}
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
            </div>
    );
};

export default ProfileOtp;