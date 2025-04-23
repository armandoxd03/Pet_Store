import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (keyword: string) => void;
    onPriceSearch: (maxPrice: number) => void;
    onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onPriceSearch, onReset }) => {
    const [keyword, setKeyword] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleKeywordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(keyword);
    };

    const handlePriceSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(maxPrice);
        if (!isNaN(price)) {
            onPriceSearch(price);
        }
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleKeywordSubmit}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search by name, breed, etc."
                />
                <button type="submit">Search</button>
            </form>
            
            <form onSubmit={handlePriceSubmit}>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max price"
                    min="0"
                    step="0.01"
                />
                <button type="submit">Filter by Price</button>
            </form>
            
            <button onClick={onReset}>Reset Filters</button>
        </div>
    );
};

export default SearchBar;