package org.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String userName;
    private String fullName;
    private String email;
    private String password;

    public User(String userName, String fullName, String email, String password) {
        this.userName = userName;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
}
