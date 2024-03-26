import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void; 
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="flex flex-col lg:gap-3 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2>Cancel Reservation</h2>
                <p>Are you sure you want to cancel this reservation?</p>
               <div className="flex flex-row justify-between">
                    <button className="bg-red-400 rounded-md p-2" onClick={onConfirm}>Yes, Cancel</button>
                    <button className="bg-black rounded-md p-2 text-white" onClick={onClose}>No, Go Back</button>
               </div>
            </div>
        </div>
    );
};

export default Modal;