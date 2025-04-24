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
        onDelete(id); // Directly call onDelete without confirmation
    };

    const petImage = pet.image || 'https://via.placeholder.com/300x225?text=No+Image+Available';

    return (
        <div className="pet-card">
            <Link to={`/pets/${pet.id}`} className="pet-card-link">
                <div className="pet-image-container">
                    <img 
                        src={petImage} 
                        alt={pet.name}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x225?text=Image+Not+Found';
                        }}
                    />
                </div>
            </Link>
            <div className="pet-content">
                <h3 className="pet-name">{pet.name}</h3>
                <div className="pet-details">
                    <p><span className="detail-label">Species:</span> {pet.species}</p>
                    <p><span className="detail-label">Breed:</span> {pet.breed}</p>
                    <p><span className="detail-label">Gender:</span> {pet.gender}</p>
                    <p className="pet-price">${pet.price.toFixed(2)}</p>
                </div>
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
