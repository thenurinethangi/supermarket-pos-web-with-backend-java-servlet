package org.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Item {

    @Id
    private String id;
    private String description;
    private double price;
    private int qty;

    @ManyToMany(mappedBy = "items")
    private List<Orders> orders;
}
