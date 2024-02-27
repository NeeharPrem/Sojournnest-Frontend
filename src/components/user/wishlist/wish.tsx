import { useQuery,useMutation } from "@tanstack/react-query"
import { userWishlists } from "../../../api/userapi";
import Loader from "../../common/Loader";
import { removeWishlist } from "../../../api/userapi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Wish = () => {
   
    const {
        data: Data,isLoading
    } = useQuery({
        queryKey: ["wishListData",],
        queryFn: userWishlists,
    });

    const { mutate: removWishlist } = useMutation({
        mutationFn: removeWishlist,
        onSuccess: (response) => {
            if (response?.status === 200) {
                toast.success(response.data.message)
            }
        }
    })

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.target as HTMLButtonElement;
        const Id = button.getAttribute('data-id') || '';
        console.log('am hee', Id);
        removWishlist(Id);
    };

    return !isLoading ?(
        <>
            <div className="px-3">
                <Link to="/profile">Profile</Link> / Wishlist
            </div>
            <div className="lg:px-3">
                <p className="font-bold text-custom-size">Wishlist</p>
            </div>
            <div className="flexbg-blue-gray-500 px-5">
                {Data?.data.roomId.map((room: {
                    images: [string]; _id: string; name: string; bedrooms: string; guests: string; bathrooms:string}) =>
                    <div key={room._id} className="flex flex-row justify-between items-center p-5 w-full shadow-md rounded-md border">
                        <div className="flex flex-row gap-2">
                            <div>
                                <img
                                    src={`${room?.images[0]}`}
                                    alt="Profile Pic"
                                    className="lg:w-20 lg:h-20  object-cover rounded-md"
                                />
                            </div>
                            <div className="lg:pt-3">
                                <div className="flex flex-row gap-1">
                                    <p>{room.name} .</p>
                                    <p>{room.bedrooms} Bedrooms</p>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <p>{room.guests} Guests .</p>
                                    <p>{room.bathrooms} Bathrooms .</p>
                                </div>
                            </div>
                        </div>
                        <div >
                            <button onClick={handleRemove} data-id={room._id} className="border p-1 rounded-md bg-blue-gray-200">
                                Remove
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    ):(
        <Loader/>
    )
}

export default Wish