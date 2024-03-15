import React from "react";

interface ConfirmationModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ApproveModal: React.FC<ConfirmationModalProps> = ({
    message,
    onConfirm,
    onCancel,
}) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white flex flex-col w-1/3 rounded-lg mt-4">
                <div className="flex flex-col p-8 justify-between h-2/3">
                    <div className="flex-1 p-9">
                        <img src={message} alt="card" className="w-full h-full object-cover object-center" />
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                        <button onClick={onConfirm} className="bg-red-500 text-white py-2 px-4 rounded mr-2">
                            Confirm
                        </button>
                        <button onClick={onCancel} className="bg-gray-300 text-gray-700 py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ApproveModal;
