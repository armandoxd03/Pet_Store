import React, { useState, useEffect } from "react";
import { fetchPets, deletePet, searchPets, searchPetsByPrice } from "../api/petApi";
import { Pet } from "../types/Pet";
import AddPetForm from "../components/AddPetForm";
import SearchBar from "../components/SearchBar";
import PetList from "../components/PetList";
import { Link } from "react-router-dom";
Link


const PetManagementPage: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPets();
    }, []);

    const loadPets = async () => {
        setLoading(true);
        try {
            const data = await fetchPets();
            setPets(data);
        } catch (error) {
            console.error("Failed to fetch pets:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePet(id);
            setPets(pets.filter(pet => pet.id !== id));
        } catch (error) {
            console.error("Failed to delete pet:", error);
        }
    };

    const handleSearch = async (keyword: string) => {
        try {
            const results = await searchPets(keyword);
            setPets(results);
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    const handlePriceSearch = async (maxPrice: number) => {
        try {
            const results = await searchPetsByPrice(maxPrice);
            setPets(results);
        } catch (error) {
            console.error("Price search failed:", error);
        }
    };

    return (
        <div className="management-page">
            <h2>Manage Pets</h2>
            <SearchBar 
                onSearch={handleSearch}
                onPriceSearch={handlePriceSearch}
                onReset={loadPets}
            />
            <AddPetForm onPetAdded={loadPets} />
            {loading ? (
                <div>Loading pets...</div>
            ) : (
                <PetList pets={pets} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default PetManagementPage;