import React from "react";
import AddPetForm from "../components/AddPetForm";

const AddPetPage: React.FC = () => {
    return (
        <div className="add-pet-page">
            <div className="form-container">
                <h1>Add New Pet</h1>
                <AddPetForm onPetAdded={() => {}} />
            </div>
        </div>
    );
};

export default AddPetPage;