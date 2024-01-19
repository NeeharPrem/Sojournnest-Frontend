import UserTable from "../../components/admin/UserTable";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../../api/adminapi";

export const AdminUsers = () => {
  const { data: userData,refetch} = useQuery({
    queryKey: ['userData'],
    queryFn: allUsers,
  });

  return (
    <div className="flex flex-row">
      <div>
        <AdminSidebar />
      </div>
      <div className="w-full mt-10">
        <UserTable refetch={refetch} userInfos={userData?.data || []} />
      </div>
    </div>
  );
};