import Header from "../../components/Navbar";
import DetailsPage from "../../components/user/detailsPage";

export const ListingDetails = ()=> {
    return (
        <> 
            <div>
                <Header />
            </div>
            <div className="flex flex-col lg:px-16 px-5 sm:px-10 md:px-10 pt-20">
               <div>
                    <DetailsPage />
               </div>
            </div>
        </>
    );
};