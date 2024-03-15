import ListingTable from "../../components/admin/ListingTable";
import { useQuery } from "@tanstack/react-query";
import { allListings } from "../../api/adminapi";
import AdminUiBase from "../../components/common/Admin/AdminUiBase";

export const AdminListings = () => {
  const { data: Data, refetch } = useQuery({
    queryKey: ["RoomData"],
    queryFn: allListings,
  });
  return (
     <AdminUiBase>
      <ListingTable
      refetch={refetch}
        info={Data?.data.info}
      userInfos={Data?.data.data || []}
      />
    </AdminUiBase>
  );
};