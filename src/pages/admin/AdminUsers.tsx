import UserTable from "../../components/admin/UserTable";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../../api/adminapi";
import AdminUiBase from "../../components/common/Admin/AdminUiBase";

export const AdminUsers = () => {
  const { data: Data, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: allUsers,
  });

  const userTableProps = {
    refetch,
    info: Data?.data.info,
    userInfos: Data?.data.data || [],
  };

  return (
    <AdminUiBase>
      <UserTable {...userTableProps} />
    </AdminUiBase>
  );
};