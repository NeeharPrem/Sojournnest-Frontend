import React, { useState } from 'react';

interface DropdownProps {
    options: string[];
    onSelect: (selectedValue: string) => void;
    label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, label }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="relative">
            <label htmlFor="dropdown" className="sr-only">
                {label}
            </label>
            <button
                id="dropdown"
                className="flex items-center justify-between w-48 px-4 py-2 text-lg font-medium text-gray-800 bg-white border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                type="button"
            >
                {selectedOption || "Choose"}
                <svg
                    className={`w-5 h-5 ml-2 transition-transform duration-200 ease-in-out transform ${isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute top-10 left-0 w-48 bg-white border border-gray-300 rounded-md shadow-md">
                    <ul className="py-2">
                        {options.map((option) => (
                            <li
                                key={option}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => selectOption(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;