import React, { ChangeEvent, useState,useEffect} from 'react';
import AddLocation from '../addLocation/AddLocation';
import { BiReset } from "react-icons/bi";
import Dropdown from '../../common/DropDown/Dropdown';
import { toast } from "react-toastify";
import StateDistrictDropdown from '../../common/DropDown/StateDistrictDropdown';
import { roomData, roomDataUpdate } from '../../../api/userapi';
import { useNavigate } from 'react-router-dom';

interface Location {
    longitude: number;
    latitude: number;
}

interface Room {
    _id: string;
}

interface DropdownProps {
    options: string[];
    onSelect: (selectedValue: string) => void;
    label: string;
    value: string;
}

interface editProps {
    Id: string | undefined
}

interface MyFormData {
    images: string[];
    guests: string;
    bedrooms: string;
    bathrooms: string;
    amenities: string[];
    subdescription: string;
    longitude: number;
    latitude: number;
    name: string;
    description: string;
    rent: string;
    state: string;
    district: string;
    category: string;
}
const EditRoom = ({ Id }: editProps) => {
    const navigate=useNavigate()
    const [room, setRoom] = useState<Room | object>({})
    const [roomImages, setRoomImages] = useState<File[]>([]);
    const [formData, setFormData] = useState<MyFormData>({
        name: '',
        bathrooms: '',
        bedrooms: '',
        guests: '',
        rent: '',
        state: '',
        district: '',
        longitude: 0,
        latitude: 0,
        category: '',
        subdescription: '',
        amenities: [],
        images: ['', '', '', '', ''],
        description: '',
    });
    let roomId: string

    useEffect(() => {
        const fetchData = async () => {
            const res = await roomData(Id)
            const Data = res?.data
            console.log(Data)
            setRoom(Data.data)
            if (Data) {
                setFormData({
                    name: Data.data.name || '',
                    bathrooms: Data.data.bathrooms || '',
                    bedrooms: Data.data.bedrooms|| '',
                    guests: Data.data.guests || '',
                    rent: Data.data.rent || '',
                    state: Data.data.state ||'',
                    district: Data.data.district|| '',
                    longitude: Data.data.longitude,
                    latitude: Data.data.latitude,
                    category: Data.data.category ||'',
                    subdescription: Data.data.subdescription ||'',
                    description: Data.data.description || '',
                    amenities: Data.data.amenities || [],
                    images: Data.data.imagess || ['', '', '', ''],
                });
                setAmenities(Data.data.amenities)
                setRoomImages(Data.data.images);
                roomId=Data.data._id
            }
        }
        fetchData()
    }, [Id])
    
    const [showMap, setShowMap] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [newAmenity, setNewAmenity] = useState<string>('');
    const [showAmenityField, setShowAmenityField] = useState<boolean>(false);
    const [amenities, setAmenities] = useState<string[]>([]);
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [seletctedCategory, setCategory] = useState<string>('');


    const handleSelectState = (state: string, district: string) => {
        setSelectedState(state);
        setSelectedDistrict(district);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, key: string) => {
        const value = e.target.value;
        setFormData({ ...formData, [key]: value });
    };

    const handlePlusClick = () => {
        setShowAmenityField(!showAmenityField);
    };

    const handleSaveClick = () => {
        setAmenities([...amenities, newAmenity]);
        setNewAmenity('');
        setShowAmenityField(false);
    };

    const toggleMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowMap(!showMap);
    };

    const handleLocationSelect = (location: { longitude: number; latitude: number }) => {
        setSelectedLocation(location);
        setShowMap(false);
    };

    const handleReset = () => {
        setSelectedLocation(null)
        setShowMap(!showMap);
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setRoomImages([...roomImages, ...filesArray]);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...roomImages];
        updatedImages.splice(index, 1);
        setRoomImages(updatedImages);
    };

    const handleAmenitySelect = (selectedValue: string) => {
        setAmenities([...amenities, selectedValue]);
    };

    const handleCategorySelect = (selectedValue: string) => {
        setCategory(selectedValue);
    };

    const handleRemoveLastAmenity = (event:any) => {
        event.preventDefault();
        if (amenities.length > 0) {
            const newAmenities = [...amenities];
            newAmenities.pop();
            setAmenities(newAmenities);
        }
    };
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    //     //FormData
        const form = new FormData();
        form.append('name',formData.name)
        form.append('bedrooms',formData.bedrooms)
        form.append('bathrooms',formData.bathrooms)
        form.append('guests',formData.guests)
        form.append('rent',formData.rent)
        form.append('subdescription',formData.subdescription)
        form.append('description',formData.description)
        form.append("latitude", formData?.latitude?.toString() || '')
        form.append("longitude", formData?.longitude?.toString() || '')
        form.append('amenities', JSON.stringify(amenities));
        form.append('state', selectedState)
        form.append('district', selectedDistrict)
        form.append('category', seletctedCategory)
        // roomImages.forEach((image, index) => {
        //     form.append(`image${index}`, image);
        // });
        roomImages.forEach((image, index) => {
            if (image instanceof File) {
                form.append(`image${index}`, image);
            }
        });

    //     // Form validation
        const name = form.get('name') as string;
        const bedrooms = form.get('bedrooms') as string;
        const bathrooms = form.get('bathrooms') as string;
        const guests = form.get('guests') as string;
        const subdesciption = form.get('subdescription') as string;
        const rent = form.get('rent') as string;
        const description = form.get('description') as string;
        const Latitude = form.get('latitude') as string;
        const state = form.get("state") as string;
        const district = form.get('district') as string;
        const category = form.get('category') as string;

        if (!name.trim()) {
            toast.error("Name cannot be empty")
            return;
        }

        if (/^\d+$/.test(name)) {
            toast.error('Name cannot be a number')
            return;
        }

        if (/^\s+$/.test(name)) {
            toast.error('Name cannot contain only spaces');
            return;
        }

        if (/^[!@#$%^&*(),.?":{}|<>]+$/.test(name)) {
            toast.error('Name cannot contain only special characters');
            return;
        }

        if (!bedrooms) {
            toast.error('Add Bedrooms');
            return;
        }

        if (!isNaN(Number(bedrooms)) && Number(bedrooms) >= 0) {
        } else {
            toast.error('Bedrooms ');
            return;
        }

        if (!bathrooms) {
            toast.error('Add Bathrooms');
            return;
        }

        if (!isNaN(Number(bathrooms)) && Number(bathrooms) >= 1) {
        } else {
            toast.error('Bath room should be atleast 1');
            return;
        }

        if (!guests) {
            toast.error('Guests cannot be empty');
            return;
        }

        if (!isNaN(Number(guests)) && Number(guests) > 0) {
        } else {
            toast.error('Fill guest count properly');
            return;
        }

        if (!category) {
            toast.error('select a category')
            return
        }

        if (/^\d+$/.test(subdesciption)) {
            toast.error('Sub description cannot be a number');
            return;
        }

        if (/^\s+$/.test(subdesciption)) {
            toast.error('Sub description cannot be empty');
            return;
        }

        if (/^[!@#$%^&*(),.?":{}|<>]+$/.test(subdesciption)) {
            toast.error('Sub description should contain letters');
            return;
        }

        if (!state) {
            toast.error('Choose a state')
            return
        }

        if (!district) {
            toast.error('Choose a district')
            return
        }

        if (!rent) {
            toast.error('Rent cannot be empty');
            return;
        }

        if (!isNaN(Number(rent)) && Number(rent) >= 0) {
        } else {
            toast.error('Rent is negative or not a number');
            return;
        }

        if (!description.trim()) {
            toast.error("Description cannot be empty")
            return;
        }

        if (/^\d+$/.test(description)) {
            toast.error('Description cannot be a number')
            return;
        }

        if (/^\s+$/.test(description)) {
            toast.error('Description cannot contain only spaces');
            return;
        }

        if (/^[!@#$%^&*(),.?":{}|<>]+$/.test(description)) {
            toast.error('Only special character not allowed');
            return;
        }

        const imageArray = form.getAll('image');
        if (imageArray) {
            if (Array.isArray(imageArray)) {
                for (const image of imageArray) {
                    if (image instanceof File) {
                        console.log('File name:', image.name);
                    } else {
                        console.error('Invalid image');
                        return;
                    }
                }
            } else {
                toast.error('Invalid image type');
                return;
            }
        } else {
            toast.error('Select atleast one image');
            return;
        }

        const amenitiesArray = form.get('amenities');
        console.log(amenitiesArray)
        if (amenitiesArray && typeof amenitiesArray === 'string') {
            const parsedAmenities = JSON.parse(amenitiesArray);
            if (Array.isArray(parsedAmenities) && parsedAmenities.length > 0) {
            } else {
                toast.error('Please select at least one amenity 1');
                return;
            }
        } else {
            toast.error('Please select at least one amenity 2');
            return;
        }

        if (!Latitude) {
            toast.error('Select a Location');
            return;
        }

        if (!isNaN(Number(Latitude)) && Number(Latitude) != null) {
        } else {
            toast.error('Select a Location');
            return;
        }
        for (let [key, value] of form.entries()) {
            console.log(key, value);
        }
        const res = await roomDataUpdate(Id,form)
        console.log(res)
        const data = res?.data
        if (data.status==200) {
            navigate('/host')
        }
    };
    
    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <main className="container mx-auto py-8 flex flex-col items-center">
                <div className="bg-white p-10  shadow-lg">
                    <h1 className="text-3xl font-bold mb-4">Edit Details</h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className='flex flex-row justify-between'>
                            <div className="items-center">
                                <label htmlFor="name" className="block text-gray-800 w-1/4">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-3/4 border border-gray-300 p-2 rounded-lg"
                                    placeholder="Enter room name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                />
                            </div>
                            <div className="items-center">
                                <label htmlFor="bedrooms" className="block text-gray-800  w-1/4">
                                    Bedrooms
                                </label>
                                <input
                                    type="text"
                                    id="bedrooms"
                                    name="bedrooms"
                                    className="w-3/4 border border-gray-300 p-2 rounded-lg appearance-none"
                                    placeholder="Enter number of bedrooms"
                                    value={formData.bedrooms}
                                    onChange={(e) => handleInputChange(e, 'bedrooms')}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 justify-between'>
                            <div className="items-center">
                                <label htmlFor="bathrooms" className="block text-gray-800 w-1/4">
                                    Bathrooms
                                </label>
                                <input
                                    type="text"
                                    id="bathrooms"
                                    name="bathrooms"
                                    className="w-3/4 border border-gray-300 p-2 rounded-lg appearance-none"
                                    placeholder="Enter number of bathrooms"
                                    value={formData.bathrooms}
                                    onChange={(e) => handleInputChange(e, 'bathrooms')}
                                />
                            </div>
                            <div className="items-center">
                                <label htmlFor="guests" className="block text-gray-800  w-1/4">
                                    Guests
                                </label>
                                <input
                                    type="text"
                                    id="guests"
                                    name="guests"
                                    className="w-3/4 border border-gray-300 p-2 rounded-lg appearance-none"
                                    placeholder="Enter number of guests"
                                    value={formData.guests}
                                    onChange={(e) => handleInputChange(e, 'guests')}
                                />
                            </div>
                        </div>
                        <div className='flex-row justify-center gap-2'>
                            <div className="items-center">
                                <label htmlFor="guests" className="block text-gray-800 w-30">
                                    category
                                </label>
                                <Dropdown
                                    options={['Rooms', 'House', 'Camping','Villa','Resort','Farm']}
                                    onSelect={handleCategorySelect}
                                    label="Category"
                                />
                            </div>
                        </div>
                        <div className='flex-row justify-center gap-2'>
                            <div className="items-center">
                                <label htmlFor="guests" className="block text-gray-800 w-30">
                                    Sub description
                                </label>
                                <input
                                    type="text"
                                    id="subdesciption"
                                    name="subdescription"
                                    className="w-3/4 border border-gray-300 p-2 rounded-lg"
                                    placeholder="Sub description"
                                    value={formData.subdescription}
                                    onChange={(e) => handleInputChange(e, 'subdescription')}
                                />
                            </div>
                            <div className='my-10'>
                                <StateDistrictDropdown onSelectState={handleSelectState} />
                            </div>
                        </div>
                        <div className='flex-col justify-center gap-2'>
                            <div id="amenities" className='items-center'>
                                {amenities.length > 0 && (
                                    <><>
                                        <div>
                                            <label htmlFor="guests" className="block text-gray-800 w-30">
                                                Amenities
                                            </label>
                                        </div>
                                        <div>
                                            {amenities.join(', ')}
                                        </div>
                                    </><button onClick={handleRemoveLastAmenity}>Remove Amenity</button></>
                                )}
                            </div>
                        </div>
                        <div className='flex-col justify-center gap-2'>
                            <div className="items-center">
                                <label htmlFor="guests" className="block text-gray-800 w-30">
                                    Amenities
                                </label>
                                <div className='flex flex-row gap-2'>
                                    <Dropdown options={['Wifi','Parking', 'Kitchen','Locker','Spa','Reading room']} onSelect={handleAmenitySelect} label="Amenities" />
                                    <button type="button" onClick={handlePlusClick}>+</button>
                                </div>
                            </div>
                        </div>
                        {showAmenityField && (
                            <div className='flex-col justify-center gap-2'>
                                <div className="items-center">
                                    <label htmlFor="guests" className="block text-gray-800 w-30">
                                        Additional amenities
                                    </label>
                                    <div className='flex flex-row gap-2'>
                                        <input
                                            className="w-3/4 border border-gray-300 p-2 rounded-lg"
                                            type="text"
                                            value={newAmenity}
                                            onChange={(e) => setNewAmenity(e.target.value)}
                                        />
                                        <button onClick={handleSaveClick}>Save</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='flex-col justify-center gap-2'>
                            <div className="items-center">
                                <label htmlFor="guests" className="block text-gray-800 w-30">
                                    Room rent
                                </label>
                                <input
                                    type="number"
                                    id="rent"
                                    name="rent"
                                    className="w-3/4 border border-gray-300 p-2 rounded-lg"
                                    placeholder="Room rent"
                                    value={formData.rent}
                                    onChange={(e) => handleInputChange(e, 'rent')}
                                />
                            </div>
                        </div>
                        <div className="items-center">
                            <label htmlFor="description" className="block text-gray-800 w-1/4">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                className="w-3/4 border border-gray-300 p-2 rounded-lg"
                                placeholder="Enter room description"
                                value={formData.description}
                                onChange={(e) => handleInputChange(e, 'description')}
                            ></textarea>
                        </div>
                        <div className="items-center">
                            <label htmlFor="image" className="block text-gray-800 w-30">
                                Room Images (upto 5 images)
                            </label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                className="w-3/4 border border-gray-300 p-2 rounded-lg"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </div>
                        {roomImages.length > 0 && (
                            <div className="flex items-center space-x-6">
                                <label className="block text-gray-800 w-1/4">Uploaded Images</label>
                                <div className="flex flex-wrap gap-2">
                                    {roomImages.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={(image instanceof Blob || image instanceof File) ? URL.createObjectURL(image) : image}
                                                alt={`Room Image ${index + 1}`}
                                                className="w-10 h-10 object-cover rounded-lg"
                                            />
                                            <button
                                                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className='flex flex-row gap-5'>
                            <div className="items-center">
                                <label htmlFor="location" className="block text-gray-800 w-1/4">
                                    Location
                                </label>
                                {selectedLocation === null ? (
                                    <>
                                        {showMap ? (
                                            <button onClick={toggleMap} className='border p-2 rounded-md text-white bg-black'>
                                                Close Map
                                            </button>
                                        ) : (
                                            <button onClick={toggleMap} className='border p-2 rounded-md text-white bg-black'>
                                                Choose
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className='flex flex-row gap-5'>
                                            <div>
                                                Location selected
                                            </div>
                                            <div>
                                                <BiReset onClick={handleReset} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        {showMap && <AddLocation onSelectLocation={handleLocationSelect} />}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-1/2 rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <footer className="bg-blue-500 p-4 text-white text-center">
                <p>&copy; 2023 SojournNest. All rights reserved.</p>
            </footer>
        </div>
    );
};
export default EditRoom;