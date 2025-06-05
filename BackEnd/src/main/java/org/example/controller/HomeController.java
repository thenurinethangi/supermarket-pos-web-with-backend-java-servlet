package org.example.controller;

//this project haven't object creation hiding, dto, interface for loosely coupling. this just practice quick application

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.service.HomeService;

import java.io.IOException;

@WebServlet("/home")
public class HomeController extends HttpServlet {

    private HomeService homeService = new HomeService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("text/plain");

        int customerAmount = homeService.getCustomerStatics();
        resp.getWriter().write(customerAmount+",");

        int itemAmount = homeService.getItemStatics();
        resp.getWriter().write(itemAmount+",");

        int orderAmount = homeService.getOrderStatics();
        resp.getWriter().write(orderAmount+"");
    }
}
