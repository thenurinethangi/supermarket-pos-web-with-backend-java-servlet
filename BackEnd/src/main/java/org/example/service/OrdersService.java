package org.example.service;

import org.example.dto.OrderDto;
import org.example.entity.Item;
import org.example.entity.Orders;
import org.example.repository.OrdersRepository;

import java.util.ArrayList;
import java.util.List;

public class OrdersService {

    private OrdersRepository ordersRepository = new OrdersRepository();

    public List<OrderDto> getAll() {

        List<Orders> orders = ordersRepository.getAll();
        List<OrderDto> orderDtos = new ArrayList<>();
        for (int i = 0; i <orders.size() ; i++) {
            Orders x = orders.get(i);
            orderDtos.add(new OrderDto(x.getId(),x.getDate(),x.getTotal(),x.getItemCount(),x.getCustomer()));
        }
        return orderDtos;
    }

    public OrderDto searchById(String id) {

        Orders orders = ordersRepository.searchById(id);
        if(orders==null){
            return null;
        }
        return new OrderDto(orders.getId(),orders.getDate(),orders.getTotal(),orders.getItemCount(),orders.getCustomer());
    }

    public List<Item> getOrderDetails(String id) {

       List<Item> itemList = ordersRepository.getOrderDetails(id);
       return itemList;
    }
}
