package org.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.entity.Customer;
import org.example.service.CustomerService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@WebServlet("/customer/*")
public class CustomerController extends HttpServlet {

    private CustomerService customerService = new CustomerService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String path = req.getPathInfo();

        if(req.getParameter("newid")!=null){

            String newId = customerService.generateNewId();
            resp.setContentType("application/json");
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write(newId);
        }
        else if(path!=null){

            String[] arr = path.split("/");
            String id = arr[1];

            Customer customer = customerService.searchById(id);

            resp.setContentType("application/json");

            if(customer==null){
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("can't find customer");
            }
            else{
                resp.setStatus(HttpServletResponse.SC_OK);
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.writeValue(resp.getWriter(),customer);
            }
        }

        else {
            List<Customer> customerList = customerService.getAll();

            resp.setContentType("application/json");
            resp.setStatus(HttpServletResponse.SC_OK);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(resp.getWriter(), customerList);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        ObjectMapper objectMapper= new ObjectMapper();
        Map<String,String> customer = objectMapper.readValue(req.getInputStream(), Map.class);
        Customer customer1 = new Customer(customer.get("id"),customer.get("name"),customer.get("address"),customer.get("nic"),customer.get("phoneNo"));
        boolean result = customerService.add(customer1);

        if(result){
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("true");
        }
        else{
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("false");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        String path = req.getPathInfo();
        String[] arr = path.split("/");

        boolean result = customerService.delete(arr[1]);

        if(result){
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("true");
        }
        else{
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("false");
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,String> customer = objectMapper.readValue(req.getInputStream(),Map.class);

        Customer customer1 = new Customer(customer.get("id"),customer.get("name"),customer.get("address"),customer.get("nic"),customer.get("phoneNo"));
        boolean result = customerService.update(customer1);

        if(result){
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("true");
        }
        else{
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("false");
        }
    }
}













