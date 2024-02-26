import NavBar from "../../../components/Navbar";
import Wish from "../../../components/user/wishlist/wish";
const Wishlist = () => {

    return (
        <>
            <NavBar />
            <div className="flex flex-col lg:px-16 px-5 sm:px-10 md:px-10 pt-20">
                <div className="lg:mt-4">
                    <Wish />
                </div>
            </div>
        </>
    );
};

export default Wishlist;
