import { Link } from "react-router-dom"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";

const ManageComp = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentDate, setCurrentDate] = useState(today);
    const [nextMonthDate, setNextMonthDate] = useState(new Date(today.getFullYear(), today.getMonth() + 1, 1));

    const handleDateChange = (date:any) => {
        setCurrentDate(date);
        setNextMonthDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    const handleNextMonth = () => {
        const newNextMonthDate = new Date(nextMonthDate.setMonth(nextMonthDate.getMonth() + 1));
        setNextMonthDate(newNextMonthDate);
    };
  return (
      <>
          <div className='font-thin'>
              <Link to="/host">Your Listing</Link> / Manage Date
          </div>
          <div className='flex lg:mt-2'>
              <p className="text-3xl font-semibold tracking-wide">Manage your availability</p>
          </div>
          <div className="flex flex-col justify-center lg:p-10">
            <div className="flex flex-row gap-3 w-full justify-center">
                <div>
                      <Calendar
                          minDate={today}
                          value={currentDate}
                          onChange={handleDateChange}
                          onActiveStartDateChange={handleNextMonth}
                      />
                </div>
                 <div>
                      <Calendar
                          value={nextMonthDate}
                      />
                 </div>
            </div>
            <div className="flex flex-col mt-5">
                <p className="font-semibold">Blocked Dates</p>
                <div className="flex flex-row justify-between lg:p-2">
                    <p>blockd date</p>
                    <p>unblock the date</p>
                </div>
            </div>
          </div>
      </>
  )
}

export default ManageComp