const userEndpoints = {
  signup: "/users",
  signupVerification: "/users/verify-otp",
  resendVerification:"/users/resend-otp",
  login: "/auth/users/login",
  logout: "/auth/users/logout",
  profile: "/users",
  updateProfile: "/users",
  getListings: "/users/host/listings",
  addRoom: "/users/host/listings",
  roomData:"/users/host/listings",
  unlist: "/users/host/listings",
  roomDataUpdate:"/users/host/listings",
  homeListings:"/users/listings"
};

export default userEndpoints;
