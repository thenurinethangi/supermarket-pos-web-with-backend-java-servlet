package org.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.entity.Customer;
import org.example.entity.Item;
import org.example.service.PlaceOrderService;

import java.io.IOException;
import java.util.List;

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

    }
}
