package com.bob.drugstore.repository;

import com.bob.drugstore.entity.Drug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrugRepository extends JpaRepository<Drug, Integer> {
    // 无需额外方法，继承 JpaRepository 即可
}