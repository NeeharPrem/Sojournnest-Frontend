const adminEndpoints = {
  login: "/auth/admin/login",
  logout: "/auth/admin/logout",
  allUsers: "/admins/users",
  blockUser: "/admins/users",
  approveUser:'admins/users',
  allListings: "/admins/listings",
  approveListing: "/admins/listings",
  blockListing: "/admins/listings",
  addAmenity:"/admins/amenities",
  editAmenity:'/admins/amenities',
  getAmenity:"/admins/amenities",
  addCategory:"/admins/category",
  editCategory:'/admins/category',
  getCategory: "/admins/category",
  deleteAmenity:"/admins/amenities",
  deleteCategory:"/admins/category",
  allBookings:'/admins/bookings'
};

export default adminEndpoints;