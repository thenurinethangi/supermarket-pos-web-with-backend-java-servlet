package org.example.repository;

import org.example.config.FactoryConfiguration;
import org.example.entity.Customer;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class CustomerRepository {

    public List<Customer> getAll() {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            List<Customer> customerList = session.createQuery("from Customer",Customer.class).list();
            return customerList;

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
        finally {
            session.close();
        }
    }

    public String generateNewId() {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            Customer customer = session.createQuery("from Customer order by id desc",Customer.class).setMaxResults(1).uniqueResult();

            if(customer==null){
                return "C-000001";
            }

            String lastId = customer.getId();
            String noPart = lastId.substring(2);
            int no = Integer.parseInt(noPart);
            no++;
            String newId = String.format("C-%06d",no);
            return newId;

        } catch (Exception e) {
            e.printStackTrace();
            return "C-000001";
        }
        finally {
            session.close();
        }
    }

    public boolean add(Customer customer1) {

        Session session = FactoryConfiguration.getInstance().getSession();
        Transaction transaction = session.beginTransaction();

        try{
            session.save(customer1);
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

    public boolean delete(String customerId) {

        Session session = FactoryConfiguration.getInstance().getSession();
        Transaction transaction = session.beginTransaction();

        try{
            Customer customer = session.get(Customer.class,customerId);

            if(customer==null){
                return false;
            }

            session.remove(customer);
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

    public boolean update(Customer customer1) {

        Session session = FactoryConfiguration.getInstance().getSession();
        Transaction transaction = session.beginTransaction();

        try{
            Customer customer = session.get(Customer.class,customer1.getId());

            if(customer==null){
                return false;
            }

            session.merge(customer1);
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

    public Customer searchById(String id) {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            return session.get(Customer.class,id);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        finally {
            session.close();
        }
    }
}














