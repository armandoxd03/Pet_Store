import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPetById, updatePet } from "../api/petApi";
import { Pet } from "../types/Pet";

const EditPetForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Omit<Pet, "id">>({
        name: "",
        species: "",
        breed: "",
        gender: "",
        image: "",
        description: "",
        price: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPet = async () => {
            try {
                if (id) {
                    const pet = await fetchPetById(parseInt(id));
                    setFormData({
                        name: pet.name,
                        species: pet.species,
                        breed: pet.breed,
                        gender: pet.gender,
                        image: pet.image,
                        description: pet.description,
                        price: pet.price,
                    });
                }
            } catch (error) {
                console.error("Failed to load pet:", error);
            } finally {
                setLoading(false);
            }
        };
        loadPet();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, price: parseFloat(e.target.value) || 0 });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updatePet(parseInt(id), formData);
                alert("Pet updated successfully!");
                navigate("/manage");
            }
        } catch (error) {
            console.error("Failed to update pet:", error);
            alert("Error updating pet. Please try again.");
        }
    };

    if (loading) return <div>Loading pet data...</div>;

    return (
        <form className="pet-form" onSubmit={handleSubmit}>
            <h2>Edit Pet</h2>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Species:</label>
                <input
                    type="text"
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Breed:</label>
                <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Gender:</label>
                <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Image URL:</label>
                <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Price ($):</label>
                <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handlePriceChange}
                    required
                />
            </div>
            <button type="submit" className="submit-btn">Update Pet</button>
        </form>
    );
};

export default EditPetForm;
