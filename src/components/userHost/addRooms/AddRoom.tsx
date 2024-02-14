import React, { useState } from 'react';
import AddLocation from '../addLocation/AddLocation';
import { BiReset } from "react-icons/bi";
import Dropdown from '../../common/DropDown/Dropdown';
import { toast } from "react-toastify";
import { useMutation,useQuery} from '@tanstack/react-query';
// import StateDistrictDropdown from '../../common/DropDown/StateDistrictDropdown';
import { useNavigate } from 'react-router-dom';
import { addRoom } from '../../../api/userapi';
import Loader from '../../common/Loader';

interface Location {
  longitude: number;
  latitude: number;
}
const AddRoom: React.FC = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [newAmenity, setNewAmenity] = useState<string>('');
  const [showAmenityField, setShowAmenityField] = useState<boolean>(false);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [roomImages, setRoomImages] = useState<File[]>([]);
  // const [selectedState, setSelectedState] = useState<string>('');
  // const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [seletctedCategory, setCategory] = useState<string>('');

  const navigate = useNavigate()

  // const handleSelectState = (state: string, district: string) => {
  //   setSelectedState(state);
  //   setSelectedDistrict(district);
  // };
  
  const url =`https://api.geoapify.com/v1/geocode/reverse?lat=${selectedLocation?.latitude}&lon=${selectedLocation?.longitude}&apiKey=bbe9d00c85d542938910401c269a06cd`;
  const { data: locationData,isLoading} = useQuery({
    queryKey: ["userData", selectedLocation],
    queryFn: () => fetch(url).then((response) => response.json()),
    enabled: !!selectedLocation, 
  });

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

  const handleReset=()=>{
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //FormData
    const formData = new FormData(e.currentTarget);
    formData.append("latitude", selectedLocation?.latitude?.toString() || '')
    formData.append("longitude", selectedLocation?.longitude?.toString() || '')
    // formData.append('amenities', JSON.stringify(amenities));
    amenities.forEach((amenity, index) => {
      formData.append(`amenities[${index}]`, amenity);
    });
    formData.append('state', locationData?.features[0].properties?.state)
    formData.append('district', locationData?.features[0].properties?.state_district)
    formData.append('category',seletctedCategory)

    // Form validation
    const name = formData.get('name') as string;
    const bedrooms = formData.get('bedrooms') as string;
    const bathrooms = formData.get('bathrooms') as string;
    const guests = formData.get('guests') as string;
    const subdesciption = formData.get('subdescription') as string;
    const rent = formData.get('rent')as string;
    const description = formData.get('description')as string;
    const Latitude=formData.get('latitude') as string;
    const state= formData.get("state")as string;
    const district = formData.get('district') as string;
    const category= formData.get('category') as string;

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
    }else{
      toast.error('Bedrooms ');
      return;
    }

    if (!bathrooms) {
      toast.error('Add Bathrooms');
      return;
    }

    if (!isNaN(Number(bathrooms)) && Number(bathrooms) >= 1) {
    } else {
      toast.error('Bath count cannot be negative');
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

    if(!category){
      toast.error('select a category')
      return
    }

    // if (!subdesciption.trim()) {
    //   toast.error('Sub description cannot be empty');
    //   return;
    // }

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

    if(!state){
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

    const imageArray = formData.getAll('image');
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

    let amenitiesArray = [];
    for (const key of formData.keys()) {
      if (key.startsWith('amenities[')) {
        amenitiesArray.push(formData.get(key));
      }
    }
    if (amenitiesArray.length === 0) {
      toast.error('Please select at least one amenity');
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

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    roomData(formData)
   
  };

  const { mutate: roomData,isPending} = useMutation({
    mutationFn: addRoom,
    onSuccess: (response) => {
      if (response.status==200)
        navigate('/host')
    },
  });


  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <main className="container mx-auto py-8 flex flex-col items-center">
        <div className="bg-white p-10  shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Add Your Property</h1>
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
                />
              </div>
            </div>
            <div className='flex flex-row gap-2 justify-between'>
              <div className="items-center">
                <label htmlFor="bathrooms" className="block text-gray-800 w-1/4">
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  className="w-3/4 border border-gray-300 p-2 rounded-lg appearance-none"
                  placeholder="Enter number of bathrooms"
                />
              </div>
              <div className="items-center">
                <label htmlFor="guests" className="block text-gray-800  w-1/4">
                  Guests
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  className="w-3/4 border border-gray-300 p-2 rounded-lg appearance-none"
                  placeholder="Enter number of guests"
                />
              </div>
            </div>
            <div className='flex-row justify-center gap-2'>
              <div className="items-center">
                <label htmlFor="guests" className="block text-gray-800 w-30">
                  category
                </label>
                <Dropdown options={['room','home']} onSelect={handleCategorySelect} label="Category" />
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
                />
              </div>
              {/* <div className='my-10'>
                <StateDistrictDropdown onSelectState={handleSelectState} />
              </div> */}
            </div>
            <div className='flex-col justify-center gap-2'>
              <div id="amenities" className='items-center'>
                {amenities.length > 0 && (
                  <>
                    <div>
                      <label htmlFor="guests" className="block text-gray-800 w-30">
                        Selected amenities
                      </label>
                    </div>
                    <div>
                      {amenities.join(', ')}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='flex-col justify-center gap-2'>
              <div className="items-center">
                <label htmlFor="guests" className="block text-gray-800 w-30">
                  Amenities
                </label>
                <div className='flex flex-row gap-2'>
                  <Dropdown options={['wifi', 'car parking',"locker",'camp fire']} onSelect={handleAmenitySelect} label="Amenities" />
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
              ></textarea>
            </div>
            <div className="items-center">
              <label htmlFor="image" className="block text-gray-800 w-30">
                Room Images (choose 5 images below 10MB)
              </label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
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
                        src={URL.createObjectURL(image)}
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
                      <div className='flex flex-col'>
                          <div>
                            State: {locationData?.features[0].properties?.state}
                          </div>
                          <div>
                            District: {locationData?.features[0].properties?.state_district}
                          </div>
                          <div>
                            Place: {locationData?.features[0].properties?.county}
                          </div>
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
                Add Room
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer className="bg-blue-500 p-4 text-white text-center">
        <p>&copy; 2023 SojournNest. All rights reserved.</p>
      </footer>
      {isLoading && <Loader />}
      {isPending && <Loader />}
    </div>
  );
};
export default AddRoom;