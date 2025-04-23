import React from "react";
import { Pet } from "../types/Pet";
import { Link } from "react-router-dom";

interface PetCardProps {
    pet: Pet;
    onDelete: (id: number) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onDelete }) => {
    const handleDelete = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this pet?")) {
            onDelete(id);
        }
    };

    // Default image if pet.image is empty
    const petImage = pet.image || 'https://via.placeholder.com/250x250?text=No+Image';

    return (
        <div className="pet-card">
            <img 
                src={petImage} 
                alt={pet.name} 
                onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/250x250?text=Image+Not+Found';
                }}
            />
            <div className="pet-info">
                <h3>{pet.name}</h3>
                <p><strong>Species:</strong> {pet.species}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Description:</strong> {pet.description}</p>
                <p><strong>Price:</strong> ${pet.price.toFixed(2)}</p>
                <div className="pet-actions">
                    <Link 
                        to={`/edit/${pet.id}`} 
                        className="edit-btn"
                        state={{ pet }}
                    >
                        Edit
                    </Link>
                    <button 
                        className="delete-btn"
                        onClick={(e) => handleDelete(e, pet.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetCard;