package org.example.service;

import org.example.entity.Customer;
import org.example.entity.Item;
import org.example.repository.ItemRepository;

import java.util.List;

public class ItemService {

    private ItemRepository itemRepository = new ItemRepository();

    public String generateNewId() {

        return itemRepository.generateNewId();
    }

    public Item searchById(String id) {

        return itemRepository.searchById(id);
    }

    public List<Item> getAll() {

        return itemRepository.getAll();
    }

    public boolean add(Item item1) {

        return itemRepository.add(item1);
    }

    public boolean delete(String id) {

        return itemRepository.delete(id);
    }

    public boolean update(Item item) {

        return itemRepository.update(item);
    }
}
