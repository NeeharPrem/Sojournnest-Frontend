import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login,signup} from "../../api/userapi";
import { useMutation } from "@tanstack/react-query";
import { setLogin} from "../../store/slice/authSlice";

const G_Password = import.meta.env.VITE_GOOGLE_PASSWORD

interface RootState {
    auth: {
        userLoggin: boolean;
    };
}


const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [Cpassword, setCPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userLoggin } = useSelector((state: RootState) => state.auth)

    const handleToggleMode = () => {
        setIsLogin(!isLogin);
    };

    useEffect(() => {
        if (userLoggin) {
            navigate("/");
        }
    }, [userLoggin]);

    const { mutate: userLoginMutate } = useMutation({
        mutationFn: signup,
        onSuccess: (response) => {
            if (response) {
                console.log(response);  
            }
        },
    });

    const { mutate: userSignupMutate } = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            if (response) {
                navigate('/');
                const data = {
                    id: response.message._id,
                    fname: response.message.fname,
                    lname: response.message.lname
                };
                dispatch(setLogin(data));
            }
        },
    });

    const googleSignup=async(response:any)=>{
        const decode: { email: string; family_name: string,given_name:string,picture:string} = jwtDecode(
            response.credential as string);
        const data={
            fname: decode.given_name,
            lname: decode.family_name,
            email: decode.email,
            profilePic: decode.picture,
            password:G_Password,
            is_google:true
        }
        const result= await signup(data)
        if (result?.status == 200) {
            toast.success("Signup Successfull");
            navigate("/");
        }
    }

    const handleSignupClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData={ email, password };
    userSignupMutate(formData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData={ email, password };
    userLoginMutate(formData);
  };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-8 border rounded-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={isLogin ? handleSignupClick : handleSubmit }>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Email:</label>
                        <input
                            type="email"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Password:</label>
                        <input
                            type="password"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        {isLogin ? 'Login' : 'Signup'}
                    </button>
                </form>
                <div className='flex justify-center '>
                    <GoogleLogin onSuccess={(response)=>{googleSignup(response)
                    }} onError={() => { console.log('Login Failed'); }} />
                </div>
                <p className="mt-4">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button className="text-blue-500" onClick={handleToggleMode}>
                        {isLogin ? 'Sign up here' : 'Login here'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignUp;