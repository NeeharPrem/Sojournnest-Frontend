import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login,signup} from "../../api/userapi";
import { useMutation } from "@tanstack/react-query";
import { setLogin} from "../../store/slice/authSlice";
import OTPScreen from "../common/otpEnter";


const G_Password = import.meta.env.VITE_GOOGLE_PASSWORD

interface RootState {
    auth: {
        userLoggin: boolean;
    };
}

const SignUp = () => {
    const [fname, setFname] = useState<string>('');
    const [lname, setLname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [Cpassword, setCPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isComplete,setIscomplete]=useState(false)

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
        console.log("isLogin changed:", isLogin);
    }, [userLoggin,isLogin]);

    const { mutate: userSignupMutate } = useMutation({
        mutationFn: signup,
        onSuccess: (response) => {
            if (response?.status===200) {
                toast.success(response.data.message)
                setIscomplete(true)
                setEmail('')
                setPassword('')
            }
        },
    });

    const { mutate: userLoginMutate } = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            if (response) {
                navigate('/');
                const data = {
                    id: response.data.message._id,
                    fname: response.data.message.fname,
                    lname: response.data.message.lname
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
        console.log(result)
        if (result?.status == 200) {
            toast.success("Signup Successfull");
            handleToggleMode()
        }
    }

    const googleLogin = async (response: any) => {
        const decode: { email: string} = jwtDecode(
            response.credential as string);
        const data = {
            email: decode.email,
            password: G_Password,
        }
        const result = await login(data)
        if (result?.status == 200) {
            toast.success("Login Successfull");
            navigate("/");
            const data = {
                id: result.data._id,
                fname: result.data.fname,
                lname: result.data.lname
            };
            dispatch(setLogin(data));
        }else{
            console.log('Error')
        }
    }

    const handleSignupClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData={ email, password,fname,lname};
    userSignupMutate(formData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData={ email, password };
    userLoginMutate(formData);
  };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center mt-10 bg-opacity-50">
                {isComplete ? (
                    <OTPScreen setIscomplete={setIscomplete} isLogin={isLogin} setIsLogin={setIsLogin} />
                ):(
                        <div className="bg-white p-8 border rounded-md max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
                            <form onSubmit={isLogin ? handleSubmit : handleSignupClick}>
                                {!isLogin && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-600">First Name:</label>
                                        <input
                                            type="text"
                                            className="w-full border px-3 py-2 rounded-md"
                                            placeholder="Enter your first name"
                                            onChange={(e) => setFname(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                                {!isLogin && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-600">Last Name:</label>
                                        <input
                                            type="text"
                                            className="w-full border px-3 py-2 rounded-md"
                                            placeholder="Enter your last name"
                                            onChange={(e) => setLname(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
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
                            {isLogin ? (
                                <div className='flex justify-center '>
                                    <GoogleLogin onSuccess={(response) => {
                                        googleLogin(response)
                                    }} onError={() => { console.log('Login Failed'); }} />
                                </div>
                            ) : (
                                <div id='signup' className='flex justify-center '>
                                    <GoogleLogin onSuccess={(response) => {
                                        googleSignup(response)
                                    }} onError={() => { console.log('Login Failed'); }} />
                                </div>
                            )}
                            <p className="mt-4">
                                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                                <button className="text-blue-500" onClick={handleToggleMode}>
                                    {isLogin ? 'Sign up here' : 'Login here'}
                                </button>
                            </p>
                        </div>
                )}
            </div>
        </>
    );
};

export default SignUp;