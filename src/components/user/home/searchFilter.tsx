import React, { useState } from 'react';

// Assuming onSearch, onSort, and onFilter are functions that expect a string argument
const RoomSearchBar = ({ onSearch, onSort, onFilter }: { onSearch: (arg: string) => void; onSort: (arg: string) => void; onFilter: (arg: string) => void; }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sort, setSort] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    // Improved event typing using React.ChangeEvent<HTMLInputElement> for inputs
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    // Using React.ChangeEvent<HTMLSelectElement> for select elements
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
        onSort(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
        onFilter(event.target.value);
    };

    return (
        <div className="room-search-bar">
            <input
                type="text"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select value={sort} onChange={handleSortChange}>
                <option value="">Sort By</option>
                <option value="price-low-high">Price Low to High</option>
                <option value="price-high-low">Price High to Low</option>
                <option value="size-small-large">Size Small to Large</option>
                <option value="size-large-small">Size Large to Small</option>
            </select>
            <select value={filter} onChange={handleFilterChange}>
                <option value="">Filter By</option>
                <option value="available">Available Now</option>
                <option value="not-available">Not Available</option>
                <option value="single-room">Single Room</option>
                <option value="double-room">Double Room</option>
            </select>
        </div>
    );
};

export default RoomSearchBar;
