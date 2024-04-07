import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadInitialBookingState = () => {
    const storedBooking = localStorage.getItem('booking');
    return storedBooking ? JSON.parse(storedBooking) : null;
};

const initialBookingState = loadInitialBookingState() || {
    roomName: '',
    checkInDate: '',
    checkOutDate: '',
    guestsCount: 0,
    roomRent: 0,
    image:'',
    hostId:''
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState: initialBookingState,
    reducers: {
        saveBookingDetails: (state, action) => {
            const newState = { ...state, ...action.payload };
            localStorage.setItem('booking', JSON.stringify(newState));
            return newState;
        },
        clearBookingDetails: () => {
            localStorage.removeItem('booking');
            return {
                roomName: '',
                checkInDate: '',
                checkOutDate: '',
                guestsCount: 0,
                roomRent: 0,
                image:'',
                hostId:''
            };
        },
    },
});

const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
    },
});

setTimeout(() => {
    store.dispatch(bookingSlice.actions.clearBookingDetails());
}, 1800000);

export const { saveBookingDetails, clearBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
