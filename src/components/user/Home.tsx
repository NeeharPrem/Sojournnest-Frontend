const hotels = [
  { id: 1, name: "Hotel A", image: "https://placekitten.com/300/200" },
  { id: 2, name: "Hotel B", image: "https://placekitten.com/301/200" },
  { id: 3, name: "Hotel C", image: "https://placekitten.com/302/200" },
  { id: 4, name: "Hotel A", image: "https://placekitten.com/300/200" },
];

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <header className="bg-blue-500 p-4 text-white text-center">
        <h1 className="text-4xl font-bold">Sojourn Nest</h1>
      </header> */}

      <main className="container mx-auto py-8 flex flex-col items-center">
        {/* <h2 className="text-2xl font-semibold mb-4">Featured Hotels</h2> */}

        <div className="flex flex-wrap justify-center gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white p-4 rounded shadow-md w-70">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
                Book Now
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white p-4 rounded shadow-md w-70">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-blue-500 p-4 text-white text-center">
        <p>&copy; 2023 Hotel Booking. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
