package org.example.repository;

import org.example.config.FactoryConfiguration;
import org.example.entity.User;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

public class SignUpRepository {

    public boolean isExist(String username) {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            Query<User> query = session.createQuery("from User where userName = :u", User.class);
            query.setParameter("u",username);
            User user = query.uniqueResult();
            if(user==null){
                return false;
            }
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        finally {
            session.close();
        }
    }

    public boolean add(User user1) {

        Session session = FactoryConfiguration.getInstance().getSession();
        Transaction transaction = session.beginTransaction();

        try{
            session.persist(user1);
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
}



















