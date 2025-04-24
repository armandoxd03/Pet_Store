import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPetById } from "../api/petApi";
import { Pet } from "../types/Pet";

const PetDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPet = async () => {
            try {
                if (id) {
                    const data = await fetchPetById(parseInt(id));
                    setPet(data);
                }
            } catch (error) {
                console.error("Failed to load pet:", error);
            } finally {
                setLoading(false);
            }
        };
        loadPet();
    }, [id]);

    if (loading) return <div className="loading">Loading pet details...</div>;
    if (!pet) return <div className="error">Pet not found</div>;

    return (
        <div className="pet-card detail-view">
            <img
                src={pet.image || 'https://via.placeholder.com/800x600?text=No+Image+Available'}
                alt={pet.name}
                className="pet-image"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
            />
            <div className="pet-info">
                <h2 className="pet-name">{pet.name}</h2>
                <p><strong>Species:</strong> {pet.species}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Description:</strong> {pet.description}</p>
                <p className="pet-price">${pet.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default PetDetailPage;
