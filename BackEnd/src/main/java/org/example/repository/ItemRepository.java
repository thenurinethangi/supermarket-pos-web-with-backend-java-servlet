package org.example.repository;

import org.example.config.FactoryConfiguration;
import org.example.entity.Customer;
import org.example.entity.Item;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class ItemRepository {

    public String generateNewId() {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            Item item = session.createQuery("from Item order by id desc", Item.class).setMaxResults(1).uniqueResult();
            if(item==null){
                return "I-00001";
            }

            String lastId = item.getId();
            String noPart = lastId.substring(2);
            int no = Integer.parseInt(noPart);
            no++;
            String newId = String.format("I-%05d",no);
            return newId;

        } catch (Exception e) {
            e.printStackTrace();
            return "I-00001";
        }
        finally {
            session.close();
        }
    }

    public Item searchById(String id) {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            return session.get(Item.class,id);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        finally {
            session.close();
        }
    }

    public List<Item> getAll() {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            List<Item> itemList = session.createQuery("from Item",Item.class).list();
            return itemList;

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
        finally {
            session.close();
        }
    }

    public boolean add(Item item1) {

        Session session = FactoryConfiguration.getInstance().getSession();
        Transaction transaction = session.beginTransaction();

        try{
            session.save(item1);
            transaction.commit();
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
            return false;
        }
        finally {
            session.close();
        }
    }

    public boolean delete(String id) {

        Session session = FactoryConfiguration.getInstance().getSession();
        Transaction transaction = session.beginTransaction();

        try{
            Item item = session.get(Item.class,id);

            if(item==null){
                return false;
            }

            session.remove(item);
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

    public boolean update(Item item) {

        Session session = FactoryConfiguration.getInstance().getSession();
        Transaction transaction = session.beginTransaction();

        try{
            Item item1 = session.get(Item.class,item.getId());
            if(item1==null){
                return false;
            }

            session.merge(item);
            transaction.commit();
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
            return false;
        }
        finally {
            session.close();
        }
    }

    public boolean updateQty(Item item,Session session) {

        try{
            session.update(item);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
