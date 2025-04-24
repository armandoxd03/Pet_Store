import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPetPage from "./pages/AddPetPage";
import "./index.css";
import PetDetailPage from "./pages/PetDetailPage";
import EditPetForm from "./components/EditPetForm";



const App = () => {
    return (
        <div className="app-container">
            <nav className="navbar">
                <h1>Pet Store</h1>
                <div className="nav-links">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/add" className="nav-link">Add Pet</a>
                </div>
            </nav>
            
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add" element={<AddPetPage />} />
                    <Route path="/pets/:id" element={<PetDetailPage />} />
                    <Route path="/edit/:id" element={<EditPetForm />} />


                    
                    
                </Routes>
            </main>
        </div>
    );
};

export default App;