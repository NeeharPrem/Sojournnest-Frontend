import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { IoArrowBackOutline, IoEye, IoEyeOff } from "react-icons/io5";
import { setNewPass } from "../../../api/userapi";

interface EnterEmailProps {
    onClose: () => void;
}

const EnterPass = ({ onClose }: EnterEmailProps) => {
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const { mutate: setpass } = useMutation({
        mutationFn: setNewPass,
        onSuccess: async (response) => {
            if(response?.data.status === 200){
                toast.success(response.data.message);
                onClose();
            }
        },
    });

    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleEmailSent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            toast.error("Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.");
            return;
        }
        if (password !== cpassword) {
            toast.error("Passwords do not match.");
            return;
        }
        const data = {
            password: password
        };
        setpass(data);
    };

    return (
        <>
            <div>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <button onClick={onClose} >
                                <IoArrowBackOutline />
                            </button>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Enter new password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleEmailSent}>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                            {showPassword ? <IoEyeOff /> : <IoEye />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <div className="relative">
                                        <input type={showCPassword ? "text" : "password"} name="cpassword" id="cpassword" value={cpassword} onChange={(e) => setCpassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        <button type="button" onClick={() => setShowCPassword(!showCPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                            {showCPassword ? <IoEyeOff /> : <IoEye />}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-black bg-yellow-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirm new password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnterPass;