package org.example.config;

import org.example.entity.Customer;
import org.example.entity.Item;
import org.example.entity.Orders;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class FactoryConfiguration {

    private static FactoryConfiguration factoryConfiguration;
    private final SessionFactory sessionFactory;

    private FactoryConfiguration(){

        Configuration configuration = new Configuration();
        configuration.configure();
        configuration.addAnnotatedClass(Customer.class);
        configuration.addAnnotatedClass(Item.class);
        configuration.addAnnotatedClass(Orders.class);
        sessionFactory = configuration.buildSessionFactory();
    }

    public static FactoryConfiguration getInstance(){

        if(factoryConfiguration==null){
            factoryConfiguration = new FactoryConfiguration();
        }

        return factoryConfiguration;
    }

    public Session getSession(){

        return sessionFactory.openSession();
    }
}
