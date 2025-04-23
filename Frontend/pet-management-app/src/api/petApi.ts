import axios from "axios";
import { Pet } from "../types/Pet";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/ducut/pets";

export const fetchPets = async (): Promise<Pet[]> => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const fetchPetById = async (id: number): Promise<Pet> => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const addPet = async (pet: Omit<Pet, "id">): Promise<Pet> => {
    const response = await axios.post(BASE_URL, pet);
    return response.data;
};

export const updatePet = async (id: number, pet: Omit<Pet, "id">): Promise<Pet> => {
    const response = await axios.put(`${BASE_URL}/${id}`, pet);
    return response.data;
};

export const deletePet = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
};

export const searchPets = async (keyword: string): Promise<Pet[]> => {
    const response = await axios.get(`${BASE_URL}/search/${keyword}`);
    return response.data;
};

export const searchPetsByPrice = async (price: number): Promise<Pet[]> => {
    const response = await axios.get(`${BASE_URL}/search/price/${price}`);
    return response.data;
};