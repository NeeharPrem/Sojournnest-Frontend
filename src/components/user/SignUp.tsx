import React, { useEffect, useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { signup } from "../../api/userapi";
import { useMutation } from "@tanstack/react-query";
import OTPScreen from "../common/otpEnter";

const G_Password = import.meta.env.VITE_GOOGLE_PASSWORD;

interface RootState {
  auth: {
    userLoggin: boolean;
  };
}

const SignUp = () => {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isComplete, setIscomplete] = useState(false);



  const navigate = useNavigate();
  const { userLoggin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userLoggin) {
      navigate("/");
    }
  }, [userLoggin]);

  const { mutate: userSignupMutate } = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(response.data.message);
        setIscomplete(true);
        setEmail("");
        setPassword("");
      }
    },
  });

  const googleSignup = async (response: any) => {
    const decode: {
      email: string;
      family_name: string;
      given_name: string;
      picture: string;
    } = jwtDecode(response.credential as string);
    const data = {
      fname: decode.given_name,
      lname: decode.family_name,
      email: decode.email,
      profilePic: decode.picture,
      password: G_Password,
      is_google: true,
    };
    const result = await signup(data);
    if (result?.status == 200) {
      toast.success("Signup Successfull");
      navigate("/login");
    }
  };

  const handleSignupClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-.][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    if (!namePattern.test(fname) || fname.trim().length === 0) {
      toast.error("Please enter a valid first name.");
      return;
    }
    if (!namePattern.test(lname) || lname.trim().length === 0) {
      toast.error("Please enter a valid last name.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (!/\d/.test(password)) {
      toast.error("Password must contain at least one number.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }
    const formData = { email, password, fname, lname };
    userSignupMutate(formData);
  };


  return (
    <>
    <div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-10">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignupClick}>
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                  <input type="text" name="fname" id="fname" onChange={(e) => setFname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" required />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                  <input type="text" name="lname" id="lname" onChange={(e) => setLname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full text-black bg-yellow-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              </form>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(response) => {
                    googleSignup(response);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account <Link to='/login'>Login</Link>
                </p>
            </div>
          </div>
        </div>
        {isComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <OTPScreen
              setIscomplete={setIscomplete}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
