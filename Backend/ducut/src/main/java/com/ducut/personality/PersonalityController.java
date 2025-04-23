package com.ducut.personality;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/ducut/personalities")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonalityController {

    private final PersonalityRepository repository;

    public PersonalityController(PersonalityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Personality> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Personality addOne(@RequestBody Personality personality) {
        return repository.save(personality);
    }

    @PostMapping("/bulk")
    public List<Personality> addBulk(@RequestBody List<Personality> personalities) {
        return repository.saveAll(personalities);
    }
}
