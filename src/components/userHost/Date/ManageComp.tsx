import { Link, useParams } from "react-router-dom"
import { useState, useRef } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../index.css'
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blockDates} from "../../../api/userapi";
import { blockedDates } from "../../../api/userapi";
import { removeDates } from "../../../api/userapi";
import Loader from "../../common/Loader";

interface DateRange {
 startDate: string;
 endDate: string;
}

const ManageComp = () => {
    let { roomId } = useParams();
    const blockNameRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const { isLoading, data: dateData } = useQuery({
        queryKey: ['dateDetail', roomId as string],
        queryFn: blockedDates
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [viewedMonth, setViewedMonth] = useState(new Date().getMonth());
    const [viewedYear, setViewedYear] = useState(new Date().getFullYear());


    const handleDateChange = (value: Date | Date[] | null | any) => {
        const selectedDate = Array.isArray(value) ? value[0] : value;
        if (!selectedDate) return;

        if (!startDate || (endDate && selectedDate < startDate)) {
            setStartDate(selectedDate);
            setEndDate(null);
        } else if (!endDate || (selectedDate >= startDate)) {
            setEndDate(selectedDate);
        }
    };

    const isDateInRange = (date: Date) => {
        if (!startDate || !endDate) return false;
        return date >= startDate && date <= endDate;
    };

    const formatDateToLocaleString = (date: Date | null) => {
        if (!date) return 'Not selected';

        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString(); 
        const year = date.getFullYear().toString();
        day = day.length < 2 ? '0' + day : day;
        month = month.length < 2 ? '0' + month : month;
        return `${day}/${month}/${year}`;
    };

    const { mutate: blockDate } = useMutation({
        mutationFn: blockDates,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dateDetail', roomId] });
        },
    });

    const { mutate: removeDate } = useMutation({
        mutationFn: removeDates,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dateDetail', roomId] });
        },
    });
    
    const handleDateblock=()=>{
        let start
        let end
        const blockName = blockNameRef.current ? blockNameRef.current.value : '';
        if (!startDate || !endDate || !blockName.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }
        if(startDate && endDate && blockName){
            start = startDate.toISOString();
            end = endDate.toISOString();
        }
        const data={
            name:blockName,
            startDate: start,
            endDate: end
        }
        blockDate({id:roomId,data})
        setStartDate(null)
        setEndDate(null)
        if (blockNameRef.current) {
            blockNameRef.current.value = '';
        }
    }

    const handleDateremove=(dateIndex:number)=>{
        const data= {
            index: dateIndex
        }
        removeDate({id: roomId, data})
    }

    const handleDatereset=()=>{
      if(startDate && endDate){
          setStartDate(null)
          setEndDate(null)
          toast.success('Dates reseted')
      }
    }
    
  return (
      <>
          <div className='font-thin'>
              <Link to="/host">Your Listing</Link> / Manage Date
          </div>
          <div className='flex lg:mt-2'>
              <p className="text-3xl font-semibold tracking-wide">Manage your availability</p>
          </div>
          <div className="flex flex-col justify-center lg:p-10">
            <div className="flex flex-row gap-5 w-full justify-center">
                <div>
                      <Calendar
                          tileDisabled={({ date, view }) => {
                              if (view !== 'month') return false;
                              if (date.getMonth() !== viewedMonth || date.getFullYear() !== viewedYear) return false; // Only disable dates in the currently viewed month

                              return dateData?.data?.some(({ startDate, endDate }: DateRange) => {
                                  const start = new Date(startDate);
                                  const end = new Date(endDate);
                                  start.setHours(0, 0, 0, 0);
                                  end.setHours(23, 59, 59, 999);
                                  return date >= start && date <= end;
                              });
                          }}
                          onActiveStartDateChange={({ activeStartDate }) => {
                              if (activeStartDate) {
                                  setViewedMonth(activeStartDate.getMonth());
                                  setViewedYear(activeStartDate.getFullYear());
                              }
                          }}
                          minDate={today}
                          onChange={handleDateChange}
                          tileClassName={({ date, view }) => {
                              if (view === 'month' && new Date().toDateString() === date.toDateString()) {
                                  return 'calendar-tile-current-date';
                              }
                              if (isDateInRange(date)) {
                                  return 'calendar-tile-selected-range';
                              }
                          }}
                          value={startDate && endDate ? [startDate, endDate] : startDate ? [startDate, startDate] : undefined}
                      />
                </div>
                <div className="flex flex-col">
                      <div className="lg:pb-3">
                          <label className="block text-gray-800 font-semibold text-sm"
                          >Input Name </label
                          >
                          <div className="mt-2">
                              <input
                                  type="text"
                                  name="inputname"
                              ref={blockNameRef}
                                  className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                              />
                          </div>
                      </div>
                      <p>Starting date: {formatDateToLocaleString(startDate)}</p>
                      <p>End date: {formatDateToLocaleString(endDate)}</p>
                      <div className="flex flex-row justify-between lg:pt-3">
                          <button onClick={handleDateblock}
                              className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-4 py-2 text-base hover:border-[#fff] cursor-pointer transition"
                          >
                              Block
                          </button>
                          <button onClick={handleDatereset} className="bg-yellow-300 text-black lg:px-4 rounded-md">
                            Reset
                        </button>
                      </div>
                </div>
            </div>
            <div className="flex flex-col mt-5">
                <p className="font-bold">Blocked Dates</p>
            {dateData?.data?.map((block: { name: string; startDate:string|Date;endDate: string|Date; }, index: number)=>(
                <div key={index} className="flex flex-row justify-between lg:p-4 border shadow-md rounded-md">
                        <div  className="flex flex-col lg:gap-1">
                              <div className="flex flex-row">
                            <p className="font-semibold">Name :</p>
                            <p className="ps-1">{block.name}</p>
                              </div>
                              <p>{`${new Date(block.startDate).toLocaleDateString()} - ${new Date(block.endDate).toLocaleDateString()}`}</p>
                        </div>
                        <div className="flex flex-col justify-center">
                        <button onClick={() => handleDateremove(index)} className="border bg-blue-gray-200 py-2 px-4 rounded-md">
                          unblock
                         </button>
                        </div>
                </div>
            ))}
            </div>
          </div>
          {isLoading && <Loader/>}
      </>
  )
}

export default ManageComp
