import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PetManagementPage from "./pages/PetManagementPage";
import EditPetForm from "./components/EditPetForm";
import "./index.css";

const App = () => {
    return (
        <div className="container">
            <header className="header">
                <h1>Pet Adoption Center</h1>
                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/manage">Manage Pets</Link>
                </nav>
            </header>
            
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/manage" element={<PetManagementPage />} />
                <Route path="/edit/:id" element={<EditPetForm />} />
            </Routes>
        </div>
    );
};

export default App;