package org.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.dto.OrderDto;
import org.example.entity.Customer;
import org.example.entity.Item;
import org.example.entity.Orders;
import org.example.service.PlaceOrderService;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@WebServlet("/placeorder/*")
public class PlaceOrderController extends HttpServlet {

    private PlaceOrderService placeOrderService = new PlaceOrderService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        if(req.getParameter("newid")!=null){
            String newId = placeOrderService.generateNewId();
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write(newId);
        }
        else if(req.getParameter("customers")!=null){
            List<String> customerIds = placeOrderService.getAllCustomers();
            resp.setStatus(HttpServletResponse.SC_OK);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(resp.getWriter(),customerIds);
        }
        else if(req.getParameter("items")!=null){
            List<String> itemIds = placeOrderService.getAllItems();
            resp.setStatus(HttpServletResponse.SC_OK);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(resp.getWriter(),itemIds);
        }
        else if(req.getParameter("customerid")!=null){
            Customer customer = placeOrderService.searchCustomerById(req.getParameter("customerid"));
            resp.setStatus(HttpServletResponse.SC_OK);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(resp.getWriter(),customer);
        }
        else if(req.getParameter("itemid")!=null){
            Item item = placeOrderService.searchItemById(req.getParameter("itemid"));
            resp.setStatus(HttpServletResponse.SC_OK);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(resp.getWriter(),item);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,String> order = objectMapper.readValue(req.getInputStream(), Map.class);

        Object itemListObj = order.get("itemList");
        String[] ar;

        if (itemListObj instanceof ArrayList) {
            ArrayList<String> itemList = (ArrayList<String>) itemListObj;
            ar = itemList.toArray(new String[0]);
        } else if (itemListObj instanceof String) {
            String itemList = (String) itemListObj;
            ar = itemList.split(",");
        } else {
            throw new IllegalArgumentException("Invalid itemList format");
        }
        List<Item> items = new ArrayList<>();
        for (int i = 0; i < ar.length; i=i+2) {
            Item item = placeOrderService.searchItemById(ar[i]);
            items.add(item);
        }

        Customer customer = placeOrderService.searchCustomerById(order.get("customer"));

        Orders orders = new Orders(order.get("id"),order.get("date"),Double.parseDouble(order.get("total")),Integer.parseInt(order.get("itemCount")),customer,items);

        boolean result = placeOrderService.placeOrder(orders,ar);

        if(result) {
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("true");
        }
        else{
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("false");
        }

    }
}
