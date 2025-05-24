package com.bob.drugstore.controller;

import com.bob.drugstore.entity.Drug;
import com.bob.drugstore.repository.DrugRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drugs")
public class DrugController {

    private final DrugRepository drugRepository;

    // 构造器注入（推荐方式）
    public DrugController(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    @GetMapping
    public List<Drug> getAllDrugs() {
        return drugRepository.findAll();
    }

    @PostMapping
    public Drug addDrug(@RequestBody Drug drug) {
        return drugRepository.save(drug);
    }

    @DeleteMapping("/{id}")
    public void deleteDrug(@PathVariable Integer id) {
        drugRepository.deleteById(id);
    }
}