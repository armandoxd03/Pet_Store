package com.ducut.pet.repository;

import com.ducut.pet.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByNameContainingIgnoreCaseOrSpeciesContainingIgnoreCaseOrBreedContainingIgnoreCaseOrGenderContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String name, String species, String breed, String gender, String description);

    List<Pet> findByPriceLessThanEqual(Double price);
}