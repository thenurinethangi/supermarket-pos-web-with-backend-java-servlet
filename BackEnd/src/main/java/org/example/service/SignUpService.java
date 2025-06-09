package org.example.service;

import org.example.entity.User;
import org.example.repository.SignUpRepository;

public class SignUpService {

    private SignUpRepository signUpRepository = new SignUpRepository();

    public boolean isExist(String username) {
        return signUpRepository.isExist(username);
    }

    public boolean add(User user1) {
        return signUpRepository.add(user1);
    }
}
