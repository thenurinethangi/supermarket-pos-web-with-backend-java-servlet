package org.example.service;

import org.example.entity.Customer;
import org.example.repository.CustomerRepository;

import java.util.List;

public class CustomerService {

    private CustomerRepository customerRepository = new CustomerRepository();

    public List<Customer> getAll() {

        return customerRepository.getAll();
    }

    public String generateNewId() {

        return customerRepository.generateNewId();
    }

    public boolean add(Customer customer1) {

        return customerRepository.add(customer1);
    }

    public boolean delete(String customerId) {

        return customerRepository.delete(customerId);
    }

    public boolean update(Customer customer1) {

        return customerRepository.update(customer1);
    }

    public Customer searchById(String id) {

        return customerRepository.searchById(id);
    }
}
