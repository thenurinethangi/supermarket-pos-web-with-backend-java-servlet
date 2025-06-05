package org.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Customer {

    @Id
    private String id;
    private String name;
    private String address;
    private String nic;
    private String phoneNo;

    @ManyToMany(mappedBy = "customer")
    private List<Orders> orders;
}
