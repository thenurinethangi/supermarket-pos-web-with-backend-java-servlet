package org.example.repository;

import org.example.config.FactoryConfiguration;
import org.example.entity.Orders;
import org.hibernate.Session;

public class PlaceOrderRepository {

    public String generateNewId() {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            Orders orders = session.createQuery("from Orders order by id desc",Orders.class).setMaxResults(1).uniqueResult();

            if(orders==null){
                return "ORD-000001";
            }

            String lastId = orders.getId();
            String noPart = lastId.substring(4);
            int no = Integer.parseInt(noPart);
            no++;
            String newId = String.format("ORD-%06d",no);
            return newId;

        } catch (Exception e) {
            e.printStackTrace();
            return "ORD-000001";
        }
        finally {
            session.close();
        }
    }
}
