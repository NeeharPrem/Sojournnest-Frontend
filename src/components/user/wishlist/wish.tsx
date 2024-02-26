import { useQuery,useMutation } from "@tanstack/react-query"
import { RootState } from '../../../store/store';
import { useSelector } from "react-redux";
import { userWishlists } from "../../../api/userapi";


const Wish = () => {
    const userId = useSelector((state: RootState) => state.auth.userId);
    
    const {
        data: Data,
    } = useQuery({
        queryKey: ["wishListData"],
        queryFn: userWishlists,
    });
    console.log(Data,'wish')
    return (
        <>
            <div className="px-3">
                <p>Profile/wishlist</p>
            </div>
            <div className="lg:px-3">
                <p className="font-bold text-custom-size">Wislist</p>
            </div>
            <div className="flexbg-blue-gray-500 px-5">
                <div className="flex flex-row justify-between px-5 bg-green-400 w-full">
                    <div className="flex flex-row gap-2">
                        <div>
                            <p>images</p>
                        </div>
                        <div>
                            <p>text</p>
                        </div>
                    </div>
                    <div>
                        <h1>X</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wish