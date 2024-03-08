import NavBar from "../../../components/Navbar"
import ManageComp from "../../../components/userHost/Date/ManageComp"
const ManageDate = () => {
  return (
    <>
          <NavBar/>
          <div className="flex flex-col sm:px-10 md:px-10 xs:px-10 px-5 pt-20 h-screen">
              <ManageComp />
          </div>
    </>
  )
}
export default ManageDate