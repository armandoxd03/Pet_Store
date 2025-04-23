package com.ducut.pet.controller;

import com.ducut.pet.model.Pet;
import com.ducut.pet.repository.PetRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/ducut/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {
    private final PetRepository petRepository;

    public PetController(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    // Retrieve all pets
    @GetMapping
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    // Retrieve a pet by ID
    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        Optional<Pet> pet = petRepository.findById(id);
        return pet.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new pet
    @PostMapping
    public Pet addPet(@RequestBody Pet pet) {
        return petRepository.save(pet);
    }

    // Update a pet by ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {
        Optional<Pet> existingPet = petRepository.findById(id);
        if (existingPet.isPresent()) {
            Pet pet = existingPet.get();
            pet.setName(petDetails.getName());
            pet.setSpecies(petDetails.getSpecies());
            pet.setBreed(petDetails.getBreed());
            pet.setGender(petDetails.getGender());
            pet.setImage(petDetails.getImage());
            pet.setDescription(petDetails.getDescription());
            pet.setPrice(petDetails.getPrice());
            petRepository.save(pet);
            return ResponseEntity.ok("Pet with id " + id + " updated.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a pet by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return ResponseEntity.ok("Pet with id " + id + " deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Search for pets by keyword in name, species, breed, gender, or description
    @GetMapping("/search/{key}")
    public List<Pet> searchPets(@PathVariable String key) {
        return petRepository.findByNameContainingIgnoreCaseOrSpeciesContainingIgnoreCaseOrBreedContainingIgnoreCaseOrGenderContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                key, key, key, key, key);
    }

    // Search for pets with price less than or equal to the given value
    @GetMapping("/search/price/{price}")
    public List<Pet> searchPetsByPrice(@PathVariable Double price) {
        return petRepository.findByPriceLessThanEqual(price);
    }
}