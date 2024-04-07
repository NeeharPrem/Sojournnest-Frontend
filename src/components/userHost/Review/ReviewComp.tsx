import { useState,useEffect} from 'react';
import Rating from '@mui/material/Rating';
import { useQuery, useMutation } from "@tanstack/react-query";
import { getHostRating, hostReviewcheck } from '../../../api/userapi';
import { useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import { user_host_review } from '../../../api/userapi';
import { toast } from 'sonner';
import { getHost } from '../../../api/userapi';
import { HostReviewEdit } from '../../../api/userapi';

interface ReviewsData {
    createdAt: Date | string,
    userId: {
        fname: string;
        lname: string;
        profilePic: string
    };
    rating: number;
    experience: string
}


const ReviewComp = () => {
    const [showModal, setShowModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [rating, setRating] = useState(0.5);
    const [experience, setExperience] = useState('');
    const [bookingStat, setBookingstat] = useState(true)
    const [reviewStat, setReviewstat] = useState(true)
    const { hostId } = useParams()

    const { data: userReviewData, refetch} = useQuery({
        queryKey: ['userReviewData', hostId as string],
        queryFn: hostReviewcheck
    });

    const { data: reviewData, refetch: reviewDataref} = useQuery({
        queryKey: ['ratingData', hostId as string],
        queryFn: getHostRating
    });

  
    const { data: hostData} = useQuery({
        queryKey: ['userData', hostId as string],
        queryFn: getHost
    });

    useEffect(() => {
        if (userReviewData?.data.success === false && userReviewData?.data.reason === "nobooking") {
            setBookingstat(false)
        }
    }, [userReviewData]);

    useEffect(() => {
        if (userReviewData?.data.success === false && userReviewData?.data.reason === "noreview") {
            setReviewstat(false)
        }
    }, [userReviewData]);

    useEffect(() => {
        if (userReviewData?.data.success === true) {
            setExperience(userReviewData.data.data.experience)
            setRating(userReviewData.data.data.rating)
        }
    }, [userReviewData])


    const formatDateToLocaleString = (dateInput: Date | string | null) => {
        if (!dateInput) return 'Not selected';
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            console.error('formatDateToLocaleString was called with an invalid date:', dateInput);
            return 'Invalid date';
        }

        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();
        day = day.length < 2 ? '0' + day : day;
        month = month.length < 2 ? '0' + month : month;
        return `${day}/${month}/${year}`;
    };

    const { mutate: hostreview } = useMutation({
        mutationFn: user_host_review,
        onSuccess: (response) => {
            if (response?.status === 200) {
                toast.success(response?.data.message)
                setReviewstat(true)
            }
            refetch()
            reviewDataref()
        }
    })

    const reviewSubmit = () => {
        const submissionData = {
            hostId: hostData?.data?._id,
            data: {
                rating: rating,
                experience: experience
            }
        }
        hostreview(submissionData)
        setShowModal(false)
        refetch()
        reviewDataref()
    }

    const handleExperienceChange = (e: any) => {
        setExperience(e.target.value);
    };

    const { mutate: ReviewEdit } = useMutation({
        mutationFn: HostReviewEdit,
        onSuccess: (response) => {
            if (response.data.modifiedCount === 1) {
                toast.success(response?.message)
                setReviewstat(true)
            }
            reviewDataref()
            refetch()
        }
    })

    const reviewEditSubmit = () => {
        const submissionData = {
            hostId: hostData?.data?._id,
            data: {
                rating: rating,
                experience: experience
            }
        }
        console.log(submissionData)
        ReviewEdit(submissionData)
        setEditModal(false)
        refetch()
    }

    return (
        <>
            <div className='flex flex-col w-full p-4'>
                <div className='flex flex-col border-b-2 border-black pb-3'>
                    <div className='w-full flex flex-col justify-center items-center p-4'>
                        <img src={hostData?.data?.profilePic} alt="Host" className="mb-4 rounded-full w-24 h-24 object-cover" />
                        <p className="text-black text-lg">{hostData?.data?.fname} {hostData?.data?.lname}</p>
                    </div>
                    <div className='flex justify-end'>
                        {bookingStat && !reviewStat && <button onClick={() => setShowModal(true)}>Add review</button>}
                        {bookingStat && reviewStat && <button onClick={() => setEditModal(true)}>Edit review</button>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {reviewData && reviewData.length > 0 ? (
                        reviewData.map((item: ReviewsData, index: number) => (
                        <div key={index} className="flex gap-2 p-3 border rounded-md shadow-md">
                            <img src="https://res.cloudinary.com/db5rtuzcw/image/upload/v1705087621/profile-pics/ldyrmmxsfsq2p2zoaefx.png" alt="card" className="w-10 h-10 rounded-full" />
                            <div className='flex flex-col'>
                                <p className="text-sm font-bold">{item?.userId?.fname} {item?.userId?.lname}</p>
                                    <p className='text-xs'>{formatDateToLocaleString(item.createdAt)}</p>
                                <Rating name="half-rating-read" value={item.rating} precision={0.5} readOnly />
                                    <p>{item.experience}</p>
                            </div>
                        </div>
                    ))
                    ) : (
                    <p>No reviews available</p>
                    )}
                </div>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Body>
                        <div className=" bg-white p-4">
                            <div className='pb-2'>
                                <label className="font-semibold text-gray-700">Share your experience</label>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-2'>
                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-gray-600">Rating:</label>
                                        <Rating name="half-rating" defaultValue={0.5} precision={0.5} onChange={(_event, newValue) => {
                                            setRating(newValue || 0.5);
                                        }} className="text-primary" />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className="font-medium text-gray-600">Share your experience</label>
                                    <textarea
                                        name="experience"
                                        onChange={(e) => setExperience(e.target.value)}
                                        placeholder='Write something about the host'
                                        className="block w-full rounded-md py-2 px-3 ring-1 ring-inset ring-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={reviewSubmit}>Post</Button>
                        <Button color="gray" onClick={() => setShowModal(false)}>
                            Decline
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={editModal} onClose={() => setEditModal(false)}>
                    <Modal.Body>
                        <div className=" bg-white p-4">
                            <div className='pb-2'>
                                <label className="font-semibold text-gray-700">Edit Your Rating</label>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-2'>
                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-gray-600">Rating:</label>
                                        <Rating name="half-rating" value={rating} precision={0.5} onChange={(_event, newValue) => {
                                            setRating(newValue || 0.5);
                                        }} className="text-primary" />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className="font-medium text-gray-600">Share your experience</label>
                                    <textarea
                                        name="experience"
                                        value={experience}
                                        onChange={handleExperienceChange}
                                        placeholder='Write something about the host'
                                        className="block w-full rounded-md py-2 px-3 ring-1 ring-inset ring-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={reviewEditSubmit}>Post</Button>
                        <Button color="gray" onClick={() => setEditModal(false)}>
                            Decline
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default ReviewComp;
