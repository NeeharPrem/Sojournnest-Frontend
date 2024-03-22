import NavBar from "../../components/Navbar";
import ReviewComp from "../../components/userHost/Review/ReviewComp";

const ReviewPage = () => {
    return (
        <>
            <NavBar />
            <div className="flex flex-row sm:px-10 md:px-10 xs:px-10 px-5 pt-20 h-screen">
                <ReviewComp/>
            </div>
        </>
    );
}

export default ReviewPage