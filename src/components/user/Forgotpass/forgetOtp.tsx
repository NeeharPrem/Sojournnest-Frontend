import React, { useState, ChangeEvent, useRef, KeyboardEvent, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { verifyOtp, resentOtp} from "../../../api/userapi";

interface OTPScreenProps {
    setIscomplete: React.Dispatch<React.SetStateAction<boolean>>;
    setEnterPass: (value: boolean) => void;
}

const ForgetOtp: React.FC<OTPScreenProps> = ({ setIscomplete, setEnterPass }) => {
    const [otp, setOTP] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [showResend, setShowResend] = useState(false);


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

    const handleVerifyOtp = () => {
        const formData = { otp };
        otpMutation(formData);
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

    const { mutate: otpMutation } = useMutation({
        mutationFn: verifyOtp,
        onSuccess: (response) => {
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                setIscomplete(false);
                setEnterPass(true);
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
        </div>
    );
};

export default ForgetOtp;