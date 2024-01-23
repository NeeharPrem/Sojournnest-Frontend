import React, { useState } from 'react';
import AddLocation from '../addLocation/AddLocation';
import { BiReset } from "react-icons/bi";
import Dropdown from '../../common/DropDown/Dropdown';

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

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <main className="container mx-auto py-8 flex flex-col items-center">
        <div className="bg-white p-10  shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Add Room Details</h1>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                  type="number"
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
            <div className='flex-col justify-center gap-2'>
              <div className="items-center">
                <label htmlFor="guests" className="block text-gray-800 w-30">
                  Sub description
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  className="w-3/4 border border-gray-300 p-2 rounded-lg"
                  placeholder="Sub description"
                />
              </div>
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
                  <Dropdown />
                  <button onClick={handlePlusClick}>+</button>
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
              <label htmlFor="image" className="block text-gray-800 w-1/4">
                Room Images
              </label>
              <input
                type="file"
                id="image"
                name="image"
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
                ):(
                      <button onClick={toggleMap} className='border p-2 rounded-md text-white bg-black'>
                        Choose
                      </button>
                )}
                </>
              ) : (
               <>
               <div className='flex flex-row gap-5'>
                      <div>
                        {/* Latitude:{selectedLocation.latitude} Longitude:{selectedLocation.longitude} */}
                        Location selected
                      </div>
                      <div>
                        <BiReset onClick={handleReset} />
                      </div>
               </div>
               </>
              )}
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
    </div>
  );
};

export default AddRoom;