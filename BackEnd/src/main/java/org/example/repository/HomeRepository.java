package org.example.repository;

import org.example.config.FactoryConfiguration;
import org.example.entity.Customer;
import org.example.entity.Item;
import org.example.entity.Orders;
import org.hibernate.Session;

import java.util.List;

public class HomeRepository {

    public int getCustomerStatics() {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            List<Customer> customers = session.createQuery("from Customer", Customer.class).list();
            return customers.size();
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            session.close();
        }
    }

    public int getItemStatics() {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            List<Item> items = session.createQuery("from Item", Item.class).list();
            return items.size();
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            session.close();
        }
    }

    public int getOrderStatics() {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            List<Orders> orders = session.createQuery("from Orders", Orders.class).list();
            return orders.size();
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            session.close();
        }
    }
}
