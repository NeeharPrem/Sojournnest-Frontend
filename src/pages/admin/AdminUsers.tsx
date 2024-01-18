import UserTable from "../../components/admin/UserTable";
import AdminSidebar from "../../components/admin/AdminSidebar";

export const AdminUsers = () => {
  return (
    <>
    <div className="flex flex-row">
      <div>
        <AdminSidebar/> 
      </div>
      <div className="w-full mt-10">
          <UserTable />
      </div>
    </div>
    </>
    
  )
}
