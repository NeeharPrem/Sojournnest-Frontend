const userEndpoints = {
  signup: "/users",
  signupVerification: "/users/verify-otp",
  resendVerification:"/users/resend-otp",
  login: "/auth/users/login",
  logout: "/auth/users/logout",
  profile: "/users",
  getUser:'/users',
  updateProfile: "/users",
  uploadId:'/users',
  roomDetail:'/users/listings',
  usergetChat:'/chat',
  getListings: "/users/host/listings",
  addRoom: "/users/host/listings",
  getAmenities:'/users/amenities',
  getCategory:'/users/category',
  roomData:"/users/host/listings",
  unlist: "/users/host/listings",
  roomDataUpdate:"/users/host/listings",
  homeListings:"/users/listings",
  addtoWishlist:'/users/wishlist',
  getWishlist: '/users/wishlist',
  userWishlists:'/users/wishlist',
  removeWishlist:'/users/wishlist',
  searchListing: "/users/listings",
  hostgetChat:'/users/host/chat',
  hostNewconversation:'/users/host/chat',
  addMessage:'/users/host/chat/messages',
  getMessage:'/users/host/chat/messages',
  getBookings: '/users/bookings',
  canceledBookings: '/users/bookings/cancelled',
  cancelBooking:'/users/bookings',
  checkDateAvailability:'/users/bookings/check-availability',
  payment:'/users/bookings',
  blockDates:'/users/host/managedate',
  blockedDates:'/users/host/managedate',
  removeDates:'/users/host/managedate',
  hostDashboard:'/users/host/hostdashboard',
  upBookings:'/users/host/bookings',
  canBookings:'users/host/bookings',
  hsotcancelBooking:'/users/host/cancel/bookings',
  hostconfirmBooking:'/users/host/confirm/bookings',
  roomRating:'/users/rating',
  roomReviewEdit:'/users/rating',
  getRoomRating:'/users/rating',
  bookingAndreview:'/users/rating',
  hostReviewcheck:'/users/host/rating',
  user_host_review: '/users/host/rating',
  HostReviewEdit:'/users/host/rating',
  getHostRating:'/users/host/rating',
  saveFcmtoken:'/users/fcm',
  sentOtp:'/users/sent-otp',
  verifyOtp:'/users/otp-verify',
  resentOtp:'/users/otp-resent',
  setNewPass:'/users/setnewpass',
  checkUpdateEmail:'/users/checkMail',
  updateEmail:'/users/updateEmail'
};

export default userEndpoints;
