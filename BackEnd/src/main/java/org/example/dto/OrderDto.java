package org.example.dto;

import jakarta.persistence.Entity;
import lombok.*;
import org.example.entity.Customer;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDto {

    private String id;
    private String date;
    private double total;
    private int itemCount;
    private Customer customer;

}
