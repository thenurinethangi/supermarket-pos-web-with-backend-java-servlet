package org.example.repository;

import org.example.config.FactoryConfiguration;
import org.example.entity.Item;
import org.example.entity.Orders;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

public class OrdersRepository{

    public List<Orders> getAll() {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            List<Orders> orders = session.createQuery("from Orders",Orders.class).list();
            return orders;

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
        finally {
            session.close();
        }
    }

    public Orders searchById(String id) {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            Orders orders = session.get(Orders.class,id);
            return orders;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        finally {
            session.close();
        }
    }

    public List<Item> getOrderDetails(String id) {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            Query<String> ids = session.createNativeQuery("select items_id from orders_item where Orders_id = :id",String.class);
            ids.setParameter("id",id);
            List<String> itemIds = ids.list();

            List<Item> itemList = new ArrayList<>();

            for (int i = 0; i < itemIds.size(); i++) {
                Item item = session.get(Item.class,itemIds.get(i));
                itemList.add(item);
            }

            return itemList;

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
        finally {
            session.close();
        }
    }
}
