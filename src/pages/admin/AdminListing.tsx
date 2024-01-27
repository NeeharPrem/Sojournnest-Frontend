import UserTable from "../../components/admin/UserTable";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useQuery } from "@tanstack/react-query";
import { allListings } from "../../api/adminapi";

export const AdminListings = () => {
  const { data: Data, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: allListings,
  });
  return (
    <div className="flex flex-row bg-yellow-50">
      <div>
        <AdminSidebar />
      </div>
      <div className="w-full mt-10">
        <UserTable
          refetch={refetch}
          info={Data?.data.info}
          userInfos={Data?.data.data || []}
        />
      </div>
    </div>
  );
};
