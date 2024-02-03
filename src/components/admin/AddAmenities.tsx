import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { addAmenity, addCategory, getAmenity, getCategory,deleteAmenity,deleteCategory} from "../../api/adminapi";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const AddAmenities = () => {
    const { data: AData ,refetch:adata} = useQuery({
        queryKey: ["amenities"],
        queryFn: getAmenity,
    });

    const { data: CData,refetch} = useQuery({
        queryKey: ["category"],
        queryFn: getCategory,
    });

    const { mutate: amenityAdd } = useMutation({
        mutationFn: addAmenity,
        onSuccess: (response) => {
               if(response){
                   adata()
                   toast.success(response?.data.message)
               }
        },
    });

    const { mutate: categoryAdd } = useMutation({
        mutationFn: addCategory,
        onSuccess: (response) => {
            if (response?.status==200) {
                refetch()
                toast.success(response?.data.message)
            }
        },
    });

    const { mutate: amenityDelete } = useMutation({
        mutationFn: deleteAmenity,
        onSuccess: (response) => {
            if (response) {
                adata()
                toast.success(response?.data?.message)
            }
        },
    });

    const { mutate: categoryDelete } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (response) => {
            if (response?.status==200) {
                refetch()
                toast.success(response?.data?.message)
            }
        },
    });

    const [amenity, setAmenity] = useState('');
    const [category, setCategory] = useState('');

    const handleSaveAmenity = () => {
        if (!amenity.trim() || /[^a-zA-Z\s]/.test(amenity)) {
            toast.error('Please enter a valid amenity without numbers.');
            return;
        }
        const form = {
            "amenities": amenity
        };
        amenityAdd(form);
        setAmenity(""); 
    };

    const handleSaveCategory = () => {
        if (!category.trim() || /[^a-zA-Z\s]/.test(category)) {
            toast.error('Please enter a valid category without numbers.');
            return;
        }
        const form = {
            "category": category
        };
        categoryAdd(form);
        setCategory(""); 
    };



    const handleDeleteAmenity = (id:string, amenity:string) => { 
        const data = {
            id: id,
            amenities: amenity,
        };
        amenityDelete(data);
    };

    const handleDeleteCategory = (id: string, category: string) => {
        const data = {
            id: id,
            category: category,
        };
        categoryDelete(data);
    };


    return (
        <div className='flex flex-col md:flex-row gap-4 p-4'>
            <div className='flex flex-col gap-4'>
                <TextField
                    id="amenity"
                    label="Amenity"
                    variant="outlined"
                    className="w-full"
                    value={amenity}
                    onChange={(e) => setAmenity(e.target.value)}
                />
                <Button variant="contained" onClick={handleSaveAmenity}>Save Amenity</Button>
                <TextField
                    id="category"
                    label="Category"
                    variant="outlined"
                    className="w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <Button variant="contained" onClick={handleSaveCategory}>Save Category</Button>
            </div>
            <div className='flex flex-col md:flex-row gap-4 w-full'>
                <table className="w-full md:w-1/2 mt-4 border shadow rounded-lg bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4">No</th>
                            <th className="py-2 px-4">Amenity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {AData?.map((item: { amenities: any[],_id:string; }) => (
                            item.amenities.map((amenity, aIndex) => (
                                <tr className="border-b" key={aIndex}>
                                    <td className="py-2 px-4 text-center">{aIndex + 1}</td>
                                    <td className="py-2 px-4 text-center">{amenity}</td>
                                    <td className="py-2 px-4 text-center" onClick={() => handleDeleteAmenity(item._id,amenity)}>
                                        <MdDeleteForever style={{ cursor: 'pointer' }} />
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
                <div className="w-full">
                    <table className="w-full md:w-1/2 mt-4 border shadow rounded-lg bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4">No</th>
                                <th className="py-2 px-4">Category</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {CData?.map((item: { category: any[],_id:string;}) => (
                                item.category.map((category, cIndex) => (
                                    <tr className="border-b" key={cIndex}>
                                        <td className="py-2 px-4 text-center">{cIndex + 1}</td>
                                        <td className="py-2 px-4 text-center">{category}</td>
                                        <td className="py-2 px-4 text-center" onClick={() => handleDeleteCategory(item._id, category)}>
                                            <MdDeleteForever style={{ cursor: 'pointer' }} />
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AddAmenities;
