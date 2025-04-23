import React, { useEffect, useState } from "react";
import { fetchPets, searchPets, searchPetsByPrice } from "../api/petApi";
import { Pet } from "../types/Pet";
import PetCard from "../components/PetCard";

const HomePage: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [maxPrice, setMaxPrice] = useState<number | null>(null);

    useEffect(() => {
        const loadPets = async () => {
            try {
                let data;
                if (searchTerm) {
                    data = await searchPets(searchTerm);
                } else if (maxPrice !== null) {
                    data = await searchPetsByPrice(maxPrice);
                } else {
                    data = await fetchPets();
                }
                setPets(data);
            } catch (error) {
                console.error("Failed to fetch pets:", error);
            } finally {
                setLoading(false);
            }
        };
        loadPets();
    }, [searchTerm, maxPrice]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const searchInput = form.elements.namedItem('search') as HTMLInputElement;
        setSearchTerm(searchInput.value);
        setMaxPrice(null); // Reset price filter when doing text search
    };

    const handlePriceSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const priceInput = form.elements.namedItem('price') as HTMLInputElement;
        setMaxPrice(Number(priceInput.value));
        setSearchTerm(""); // Reset text search when doing price filter
    };

    const resetFilters = () => {
        setSearchTerm("");
        setMaxPrice(null);
    };

    if (loading) return <div className="loading">Loading pets...</div>;

    return (
        <div className="home-page">
            <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by name, species or breed"
                        defaultValue={searchTerm}
                    />
                    <button type="submit">Search</button>
                </form>
                
                <form onSubmit={handlePriceSearch} className="price-form">
                    <input
                        type="number"
                        name="price"
                        placeholder="Max price"
                        min="0"
                        step="0.01"
                        defaultValue={maxPrice || ""}
                    />
                    <button type="submit">Filter by Price</button>
                </form>
                
                {(searchTerm || maxPrice !== null) && (
                    <button onClick={resetFilters} className="reset-btn">
                        Reset Filters
                    </button>
                )}
            </div>

            <div className="pet-grid">
                {pets.length > 0 ? (
                    pets.map((pet) => (
                        <PetCard key={pet.id} pet={pet} onDelete={() => {}} />
                    ))
                ) : (
                    <div className="no-results">
                        No pets found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;