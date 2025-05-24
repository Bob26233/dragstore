package com.bob.drugstore.controller;

import com.bob.drugstore.entity.Drug;
import com.bob.drugstore.repository.DrugRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/drugs")
@CrossOrigin(origins = "http://localhost:5173") // 替换为您的前端URL
public class DrugController {

    private final DrugRepository drugRepository;

    public DrugController(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    // 获取所有药品
    @GetMapping
    public ResponseEntity<List<Drug>> getAllDrugs() {
        return ResponseEntity.ok(drugRepository.findAll());
    }

    // 添加药品
    @PostMapping
    public ResponseEntity<Drug> addDrug(@RequestBody Drug drug) {
        try {
            Drug savedDrug = drugRepository.save(drug);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDrug);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 删除药品
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDrug(@PathVariable Integer id) {
        try {
            drugRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 表示成功删除，无内容返回
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 返回合适的错误状态码
        }
    }

    // 更新药品
    @PutMapping("/{id}")
    public ResponseEntity<Drug> updateDrug(@PathVariable Integer id, @RequestBody Drug drug) {
        Optional<Drug> existingDrug = drugRepository.findById(id);

        if (existingDrug.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // 更新字段
        Drug updatedDrug = existingDrug.get();
        updatedDrug.setName(drug.getName());
        updatedDrug.setPrice(drug.getPrice());
        updatedDrug.setStock(drug.getStock());
        updatedDrug.setManufacturer(drug.getManufacturer());
        updatedDrug.setProductionDate(drug.getProductionDate());
        updatedDrug.setExpiryDate(drug.getExpiryDate());

        return ResponseEntity.ok(drugRepository.save(updatedDrug));
    }
}
