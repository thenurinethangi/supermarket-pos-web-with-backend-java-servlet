package org.example.service;

import org.example.entity.User;
import org.example.repository.SignInRepository;

public class SignInService {

    private SignInRepository signInRepository = new SignInRepository();

    public User searchByUserName(String userName) {

        return signInRepository.searchByUserName(userName);
    }
}
