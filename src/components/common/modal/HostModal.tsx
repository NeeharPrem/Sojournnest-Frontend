import React, { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selectedValue: string) => void;
}

const HostModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [selectedOption, setSelectedOption] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (selectedOption) {
            onConfirm(selectedOption);
        } else {
            console.warn('No option selected');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2>Choose an action</h2>
                <select
                    className="mb-4 p-2 border rounded"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="">choose</option>
                    <option value="confirm">Confirm</option>
                    <option value="cancelled">Cancel</option>
                </select>
                <div className="flex justify-between">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleConfirm}
                    >
                        Yes, Cancel
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={onClose}
                    >
                        No, Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HostModal;