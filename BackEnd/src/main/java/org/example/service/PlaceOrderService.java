package org.example.service;

import org.example.entity.Customer;
import org.example.entity.Item;
import org.example.repository.CustomerRepository;
import org.example.repository.ItemRepository;
import org.example.repository.PlaceOrderRepository;

import java.util.ArrayList;
import java.util.List;

public class PlaceOrderService {

    private PlaceOrderRepository placeOrderRepository = new PlaceOrderRepository();
    private CustomerRepository customerRepository = new CustomerRepository();
    private ItemRepository itemRepository = new ItemRepository();

    public String generateNewId() {

        return placeOrderRepository.generateNewId();
    }

    public List<String> getAllCustomers() {

        List<Customer> customers = customerRepository.getAll();
        List<String> ids = new ArrayList<>();

        for (int i = 0; i < customers.size(); i++) {
            ids.add(customers.get(i).getId());
        }
        return ids;
    }

    public List<String> getAllItems() {

        List<Item> items = itemRepository.getAll();
        List<String> ids = new ArrayList<>();

        for (int i = 0; i < items.size(); i++) {
            ids.add(items.get(i).getId());
        }
        return ids;
    }

    public Customer searchCustomerById(String customerId) {

        return customerRepository.searchById(customerId);
    }

    public Item searchItemById(String itemId) {

        return itemRepository.searchById(itemId);
    }
}
