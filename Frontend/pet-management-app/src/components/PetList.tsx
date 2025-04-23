import React from "react";
import { Pet } from "../types/Pet";
import PetCard from "./PetCard";

interface PetListProps {
    pets: Pet[];
    onDelete: (id: number) => void;
}

const PetList: React.FC<PetListProps> = ({ pets, onDelete }) => {
    return (
        <div className="pet-list">
            {pets.length === 0 ? (
                <p>No pets found.</p>
            ) : (
                pets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} onDelete={onDelete} />
                ))
            )}
        </div>
    );
};

export default PetList;