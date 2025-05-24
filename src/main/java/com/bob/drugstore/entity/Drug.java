package com.bob.drugstore.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "drug")
public class Drug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private Double price;
    private Integer stock;
    private String manufacturer;
    private LocalDate productionDate;
    private LocalDate expiryDate;

    // 构造函数
    public Drug() {}

    public Drug(String name, Double price, Integer stock, String manufacturer, LocalDate productionDate, LocalDate expiryDate) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.manufacturer = manufacturer;
        this.productionDate = productionDate;
        this.expiryDate = expiryDate;
    }

    // Getter 和 Setter
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public LocalDate getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(LocalDate productionDate) {
        this.productionDate = productionDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }
}
