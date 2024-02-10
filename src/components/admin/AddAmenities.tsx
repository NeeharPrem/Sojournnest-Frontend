import { TextField, Button } from "@mui/material";
import {useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { addAmenity, addCategory, getAmenity, getCategory, deleteAmenity, deleteCategory, editAmenity, editCategory } from "../../api/adminapi";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { FaPenToSquare } from "react-icons/fa6";

const AddAmenities = () => {
    const [amenity, setAmenity] = useState('');
    const [category, setCategory] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [Editing, setEditing] = useState(false);
    const [editingAmenity, setEditingAmenity] = useState({ id: '', value: '',index:-1});
    const [editingCategory, setEditingCategory] = useState({ id: '', value: '', index: -1 });

    const { data: AData, refetch: adata } = useQuery({
        queryKey: ["amenities"],
        queryFn: getAmenity,
    });

    const { data: CData, refetch } = useQuery({
        queryKey: ["category"],
        queryFn: getCategory,
    });

    const { mutate: amenityAdd } = useMutation({
        mutationFn: addAmenity,
        onSuccess: (response) => {
            if (response) {
                adata()
                toast.success(response?.data.message)
            }
        },
    });

    const { mutate: amenityEdit } = useMutation({
        mutationFn: editAmenity,
        onSuccess: (response) => {
            if (response) {
                adata()
                toast.success(response?.data.message)
            }
        },
    });

    const { mutate: categoryAdd } = useMutation({
        mutationFn: addCategory,
        onSuccess: (response) => {
            if (response?.status == 200) {
                refetch()
                toast.success(response?.data.message)
            }
        },
    });

    const { mutate: categoryEdit } = useMutation({
        mutationFn: editCategory,
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
            if (response?.status == 200) {
                refetch()
                toast.success(response?.data?.message)
            }
        },
    });

    // const handleSaveCategory = () => {
    //     if (!category.trim() || /[^a-zA-Z\s]/.test(category)) {
    //         toast.error('Please enter a valid category without numbers.');
    //         return;
    //     }
    //     const form = {
    //         "category": category
    //     };
    //     categoryAdd(form);
    //     setCategory("");
    // };


    const handleDeleteAmenity = (id: string, amenity: string) => {
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

    const handleEditAmenity = (id: string, value: string,index:number) => {
        setIsEditing(true);
        setEditingAmenity({id, value,index});
        setAmenity(value);
    };

    const handleEditCategory = (id: string, value: string, index: number) => {
        setEditing(true);
        setEditingCategory({ id, value, index });
        setCategory(value);
    };

    const handleSaveAmenity = () => {
        if(editingAmenity.value==amenity){
            toast.error('Amenity not changed')
            return;
        }
        if (!amenity.trim() || /[^a-zA-Z\s]/.test(amenity)) {
            toast.error('Please enter a valid amenity without numbers.');
            return;
        }
        if (isEditing) {
            const data={
              id:editingAmenity.id,
              value: amenity,
              index:editingAmenity.index
            }
            amenityEdit(data)
            setIsEditing(false);
            setEditingAmenity({ id: '', value: '',index:-1});
        } else {
            const form = {
                "amenities": amenity
            };
            amenityAdd(form);
        }
        setAmenity("");
    };

    const handleSaveCategory = () => {
        if (editingCategory.value == category) {
            toast.error('Category not changed')
            return;
        }
        if (!category.trim() || /[^a-zA-Z\s]/.test(category)) {
            toast.error('Please enter a valid Category');
            return;
        }
        if (Editing) {
            const data = {
                id: editingCategory.id,
                value: category,
                index: editingCategory.index
            }
            categoryEdit(data)
            setEditing(false);
            setEditingCategory({ id: '', value: '', index: -1 });
        } else {
            const data = {
              category: category
               }
               categoryAdd(data);
                setCategory("");
            }
        }
    return (
        <div className='flex flex-col md:flex-row lg:flex-row gap-4 p-4 justify-between'>
            <div className="flex flex-col">
                <div>
                    <TextField
                        id="amenity"
                        label="Amenity"
                        variant="outlined"
                        className="w-full"
                        value={amenity}
                        onChange={(e) => setAmenity(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSaveAmenity}>
                        {isEditing ? 'Update Amenity' : 'Save Amenity'}
                    </Button>
                </div>
                <div>
                    <table className="w-full mt-4 border shadow rounded-lg bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4">No</th>
                                <th className="py-2 px-4">Amenity</th>
                                <th className="py-2 px-4">Edit</th>
                                <th className="py-2 px-4">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AData?.map((item: { amenities: any[], _id: string; }) => (
                                item.amenities.map((amenity, aIndex) => (
                                    <tr className="border-b" key={aIndex}>
                                        <td className="py-2 px-4 text-center">{aIndex + 1}</td>
                                        <td className="py-2 px-4 text-center">{amenity}</td>
                                        <td className="py-2 px-4 text-center">
                                            <FaPenToSquare onClick={() => handleEditAmenity(item._id, amenity,aIndex)} style={{ cursor: 'pointer' }} />
                                        </td>
                                        <td className="py-2 px-4 text-center" onClick={() => handleDeleteAmenity(item._id, amenity)}>
                                            <MdDeleteForever style={{ cursor: 'pointer' }} />
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col">
                <div>
                    <TextField
                        id="category"
                        label="Category"
                        variant="outlined"
                        className="w-full mb-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSaveCategory}>
                        {Editing ? 'Update Categroy' : 'Save Category'}
                    </Button>
                </div>
                <div>
                    <table className="w-full mt-4 border shadow rounded-lg bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4">No</th>
                                <th className="py-2 px-4">Category</th>
                                <th className="py-2 px-4">Edit</th>
                                <th className="py-2 px-4">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CData?.map((item: { category: any[], _id: string; }) => (
                                item.category.map((category, cIndex) => (
                                    <tr className="border-b" key={cIndex}>
                                        <td className="py-2 px-4 text-center">{cIndex + 1}</td>
                                        <td className="py-2 px-4 text-center">{category}</td>
                                        <td className="py-2 px-4 text-center">
                                            <FaPenToSquare onClick={() => handleEditCategory(item._id, category, cIndex)} style={{ cursor: 'pointer' }} />
                                        </td>
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
