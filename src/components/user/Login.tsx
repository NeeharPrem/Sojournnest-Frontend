import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login} from "../../api/userapi";
import { useMutation } from "@tanstack/react-query";
import { setLogin } from "../../store/slice/authSlice";
import { saveFcmtoken } from "../../api/userapi";

const G_Password = import.meta.env.VITE_GOOGLE_PASSWORD;

interface RootState {
    auth: {
        userLoggin: boolean;
    };
}

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLoggin } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userLoggin) {
            navigate("/");
        }
    }, [userLoggin]);

    const handleTokenAfterLogin = async () => {
        const locallyStoredToken = localStorage.getItem('fcmToken');
        if (locallyStoredToken) {
            console.log(locallyStoredToken)
            await saveFcmtoken(locallyStoredToken);
            localStorage.removeItem('fcmToken');
        }
    };


    const { mutate: userLoginMutate } = useMutation({
        mutationFn: login,
        onSuccess:async (response) => {
            if (response?.status == 200) {
                toast.success("Login Successfull");
                const data = {
                    id: response.data?.message?._id,
                    fname: response.data?.message?.fname,
                    lname: response.data?.message?.lname,
                };
                dispatch(setLogin({ userId: data.id, userLoggedin: data }));
                await handleTokenAfterLogin();
                navigate("/");
            }
        },
    });

    const googleLogin = async (response: any) => {
        const decode: { email: string } = jwtDecode(response.credential as string);
        const data = {
            email: decode.email,
            password: G_Password,
        };
        const result = await login(data);
        if (result?.status == 200) {
            toast.success("Login Successfull");
            const data = {
                id: result.data.message._id,
                fname: result.data.message.fname,
                lname: result.data.message.lname,
            };
            dispatch(setLogin({ userId: data.id, userLoggedin: data }));
            await handleTokenAfterLogin();
            navigate("/");
        } else {
            console.log("Error");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = { email, password };
        userLoginMutate(formData);
    };

    return (
        <>
            <div>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                               Login to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                            <button type="submit" className="w-full text-black bg-yellow-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            </form>
                            <div className="flex justify-center">
                                    <GoogleLogin
                                        onSuccess={(response) => {
                                            googleLogin(response);
                                        }}
                                        onError={() => {
                                            console.log("Login Failed");
                                        }}
                                    />
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account? <Link to='/signup'>Signup here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
