import { useMutation} from '@tanstack/react-query';
import { useState} from "react";
import { paymentUpdate} from '../../api/adminapi';
import { toast } from 'sonner';


const Payments = () => {
    const [serviceFee, setServiceFee]=useState<number>(0)
    const [reason,setReason]=useState<string>('')
    
    const { mutate: paymetsUp } = useMutation({
        mutationFn: paymentUpdate,
        onSuccess: (response) => {
            if (response?.status === 200) {
                toast.success(response.data.message)
            }
        }
    })
     
    const handlesubmit=()=>{
        if (serviceFee === 0 || reason.trim() === '') {
            toast.error('Service fee and reason are required.');
            return;
        }
        const data={
            serviceFee: serviceFee,
            reason:reason
        }
        paymetsUp(data)
        setServiceFee(0)
        setReason('')
    }
    return (
        <div className='flex w-full justify-center'>
           <div className='flex justify-center'>
            <div className='flex flex-col rounded shadow-md lg:p-3 gap-3 bg-white w-96'>
                    <div>
                        <label form="inputname" className="block text-gray-800 font-semibold text-sm"
                        >Input service fee</label
                        >
                        <div className="mt-2">
                            <input
                                type="number"
                                value={serviceFee}
                                name="inputname"
                                onChange={(event) => setServiceFee(Number(event.target.value))}
                                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />
                        </div>
                    </div>
                    <div>
                        <label form="inputname" className="block text-gray-800 font-semibold text-sm"
                        >Update description</label
                        >
                        <div className="mt-2">
                            <input
                                type="text"
                                value={reason}
                                name="inputname"
                                onChange={(event) => setReason(event.target.value)}
                                className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />
                        </div>
                        <label className="pt-1 block text-gray-500 text-sm">This is the percentage of service charge payed by the hosts</label>
                    </div>
                    <button onClick={handlesubmit} className='border-1 border-black bg-red-400'>Proceed</button>
            </div>
           </div>
        </div>
    );
};

export default Payments;