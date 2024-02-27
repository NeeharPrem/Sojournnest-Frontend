const Cancelled = () => {
  return (
      <div className="flexbg-blue-gray-500 mt-5 px-5">
          <div className="flex flex-row justify-between items-center p-5 w-full shadow-md rounded-md border">
              <div className="flex flex-row gap-2">
                  <div>
                      <img
                          src="https://a0.muscache.com/im/pictures/miso/Hosting-821668347227918484/original/71e0d8e0-3dee-414f-850f-018c42a8f460.jpeg?im_w=960"
                          alt="Profile Pic"
                          className="lg:w-20 lg:h-20  object-cover rounded-md"
                      />
                  </div>
                  <div className="lg:pt-3">
                      <div className="flex flex-row gap-1">
                          <p>Room name</p>
                          {/* <p>{room.bedrooms} Bedrooms</p> */}
                      </div>
                      <div className="flex flex-row gap-1">
                          {/* <p>{room.guests} Guests .</p>
                                    <p>{room.bathrooms} Bathrooms .</p> */}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Cancelled