package com.bob.drugstore.service;

import com.bob.drugstore.entity.Drug;
import com.bob.drugstore.repository.DrugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DrugService {

    @Autowired
    private DrugRepository drugRepository;

    // 保存药品
    public Drug saveDrug(Drug drug) {
        return drugRepository.save(drug);
    }

    // 根据ID删除药品
    public void deleteDrugById(Integer id) {
        drugRepository.deleteById(id);
    }

    // 根据ID获取药品
    public Optional<Drug> getDrugById(Integer id) {
        return drugRepository.findById(id);
    }

    // 获取所有药品列表
    public List<Drug> getAllDrugs() {
        return drugRepository.findAll();
    }
}