package org.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Orders {

    @Id
    private String id;
    private String date;
    private double total;
    private int itemCount;

    @ManyToOne
    @JoinColumn(name = "customerId")
    private Customer customer;

    @ManyToMany
    private List<Item> items;

    public Orders(String id, String date, double total, int itemCount, Customer customer) {
        this.id = id;
        this.date = date;
        this.total = total;
        this.itemCount = itemCount;
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "id='" + id + '\'' +
                ", date='" + date + '\'' +
                ", total=" + total +
                ", itemCount=" + itemCount +
                ", customer=" + customer +
                '}';
    }
}
