import UserTable from "../../components/admin/UserTable";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useQuery } from "@tanstack/react-query";
import { allListings } from "../../api/adminapi";

export const AdminUsers = () => {
    const { data: Data, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: allListings,
    });

    return (
        <div className="flex flex-row">
            <div>
                <AdminSidebar />
            </div>
            <div className="w-full mt-10">
                <UserTable refetch={refetch} userInfos={Data?.data || []} />
            </div>
        </div>
    );
};