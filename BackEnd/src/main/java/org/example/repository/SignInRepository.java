package org.example.repository;

import org.example.config.FactoryConfiguration;
import org.example.entity.User;
import org.hibernate.Session;
import org.hibernate.query.Query;

public class SignInRepository {

    public User searchByUserName(String userName) {

        Session session = FactoryConfiguration.getInstance().getSession();

        try{
            Query<User> query = session.createQuery("from User where userName = :u", User.class);
            query.setParameter("u",userName);
            User user = query.getSingleResultOrNull();
            return user;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        finally {
            session.close();
        }
    }
}
