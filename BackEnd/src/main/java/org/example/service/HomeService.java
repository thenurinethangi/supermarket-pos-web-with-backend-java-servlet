package org.example.service;

import org.example.repository.HomeRepository;

public class HomeService {

    private HomeRepository homeRepository = new HomeRepository();

    public int getCustomerStatics() {

        return homeRepository.getCustomerStatics();
    }

    public int getItemStatics() {

        return homeRepository.getItemStatics();
    }

    public int getOrderStatics() {

        return homeRepository.getOrderStatics();
    }
}
