package org.example.service;

import org.example.config.FactoryConfiguration;
import org.example.entity.Customer;
import org.example.entity.Item;
import org.example.entity.Orders;
import org.example.repository.CustomerRepository;
import org.example.repository.ItemRepository;
import org.example.repository.PlaceOrderRepository;
import org.hibernate.Session;
import org.hibernate.Transaction;

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

    public boolean placeOrder(Orders orders,String[] ar) {

        Session session = FactoryConfiguration.getInstance().getSession();
        Transaction transaction = session.beginTransaction();

        try{
            boolean isSave = placeOrderRepository.add(orders,session);
            if(!isSave){
                transaction.rollback();
                return false;
            }

            for (int i = 0; i < ar.length; i=i+2) {
                Item item = itemRepository.searchById(ar[i]);
                int qty = item.getQty();
                qty-=Integer.parseInt(ar[i+1]);
                item.setQty(qty);
                boolean isUpdate = itemRepository.updateQty(item,session);

                if(!isUpdate){
                    transaction.rollback();
                    return false;
                }
            }

            transaction.commit();
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
            return true;
        }
        finally {
            session.close();
        }
    }
}
