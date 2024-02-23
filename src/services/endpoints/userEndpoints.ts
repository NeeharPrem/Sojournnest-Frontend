const userEndpoints = {
  signup: "/users",
  signupVerification: "/users/verify-otp",
  resendVerification:"/users/resend-otp",
  login: "/auth/users/login",
  logout: "/auth/users/logout",
  profile: "/users",
  getUser:'/users',
  updateProfile: "/users",
  roomDetail:'/users/listings',
  usergetChat:'/chat',
  getListings: "/users/host/listings",
  addRoom: "/users/host/listings",
  roomData:"/users/host/listings",
  unlist: "/users/host/listings",
  roomDataUpdate:"/users/host/listings",
  homeListings:"/users/listings",
  addtoWishlist:'/users/wishlist',
  getWishlist: '/users/wishlist',
  removeWishlist:'/users/wishlist',
  searchListing: "/users/listings",
  hostgetChat:'/users/host/chat',
  hostNewconversation:'/users/host/chat',
  addMessage:'/users/host/chat/messages',
  getMessage:'/users/host/chat/messages'
};

export default userEndpoints;
