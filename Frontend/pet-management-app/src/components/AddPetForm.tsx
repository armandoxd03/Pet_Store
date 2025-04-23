import React, { useState } from "react";
import { addPet } from "../api/petApi";
import { Pet } from "../types/Pet";

interface AddPetFormProps {
    onPetAdded: () => void;
}

const AddPetForm: React.FC<AddPetFormProps> = ({ onPetAdded }) => {
    const [formData, setFormData] = useState<Omit<Pet, "id">>({
        name: "",
        species: "",
        breed: "",
        gender: "",
        image: "",
        description: "",
        price: 0,
    });

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
            await addPet(formData);
            onPetAdded();
            setFormData({
                name: "",
                species: "",
                breed: "",
                gender: "",
                image: "",
                description: "",
                price: 0,
            });
            alert("Pet added successfully!");
        } catch (error) {
            console.error("Failed to add pet:", error);
            alert("Error adding pet. Please try again.");
        }
    };

    return (
        <form className="pet-form" onSubmit={handleSubmit}>
            <h2>Add New Pet</h2>
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
            <button type="submit" className="submit-btn">Add Pet</button>
        </form>
    );
};

export default AddPetForm;