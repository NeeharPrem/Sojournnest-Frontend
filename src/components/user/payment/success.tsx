import { useNavigate } from "react-router-dom"

const Successcomp = () => {

    const navigate= useNavigate()

    const handleViewbook=()=>{
        navigate('/bookings')
    }
  return (
        <>
          <div className="flex justify-center lg:pt-10">
              <div className="border-2 border-gray-600 p-5 rounded-md">
                  <div id='text' className="text-center ">
                      <p className="font-bold text-xl">Payment successful</p>
                  </div>
                  <div className="flex flex-row w-full justify-center lg:pt-5">
                      <div className="flex flex-row justify-between lg:gap-20 md:gap-14 sm:gap-10 border rounded-md p-5 items-center shadow-md ">
                          <div className="lg:gap-3">
                              <p>Room Name</p>
                              <p>Booked Date</p>
                              <p>Number of Guests Booked</p>
                          </div>
                          <div>
                              <div>
                                  <img
                                      src="https://res.cloudinary.com/db5rtuzcw/image/upload/v1699282053/samples/woman-on-a-football-field.jpg"
                                      alt="Profile Pic"
                                      className="lg:w-20 lg:h-20 md:w-10 md:h-10 sm:w-12 sm:h-12  object-cover rounded-md"
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="flex w-full justify-center lg:pt-4 lg:pb-2">
                      <div className="flex justify-start w-full max-w-96">
                          <p className="font-medium text-xl">Your trip details</p>
                      </div>
                  </div>
                  <div className="flex w-full justify-center">
                      <div className="flex flex-row justify-between w-full max-w-96">
                          <div className="flex flex-col gap-2">
                              <p className="text-gray-600">Payment</p>
                              <p className="text-gray-600">Payment id</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <p>1000 ₹</p>
                              <p>i83bi9</p>
                          </div>
                      </div>
                  </div>
                  <div className="flex w-full justify-center lg:pt-5 lg:pb-2">
                      <div className="flex justify-start w-full max-w-96">
                          <p className="font-medium text-md text-gray-800">Cancellation policy</p>
                      </div>
                  </div>
                  <div className="flex w-full justify-center">
                      <div className="flex justify-start w-full max-w-96">
                          <p className="font-medium text-xs pl-1">
                              Cancellation of booking before 48Hrs is free.
                              After that refund is partial
                          </p>
                      </div>
                  </div>
                  <div className="flex w-full justify-center lg:pt-5">
                      <div className="flex justify-start w-full max-w-96">
                          <button onClick={handleViewbook} className="bg-green-500 w-full rounded h-10">
                              view bookings
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        </>
  )
}

export default Successcomp