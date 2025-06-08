package org.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.dto.OrderDto;
import org.example.entity.Item;
import org.example.service.OrdersService;

import java.io.IOException;
import java.util.List;

@WebServlet("/orders/*")
public class OrdersController extends HttpServlet {

    private OrdersService ordersService = new OrdersService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        String path = req.getPathInfo();
        if(path!=null){

            String[] ar = path.split("/");
            OrderDto orderDto = ordersService.searchById(ar[1]);

            if(orderDto==null){
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("false");
                return;
            }
            resp.setStatus(HttpServletResponse.SC_OK);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(resp.getWriter(),orderDto);
        }
        else if(req.getParameter("orderdetails")!=null){

            String id = req.getParameter("id");
            List<Item> itemList = ordersService.getOrderDetails(id);

            if(itemList.isEmpty()){
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("false");
            }
            else {
                resp.setStatus(HttpServletResponse.SC_OK);
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.writeValue(resp.getWriter(), itemList);
            }

        }
        else {
            List<OrderDto> orderDtoList = ordersService.getAll();
            resp.setStatus(HttpServletResponse.SC_OK);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(resp.getWriter(), orderDtoList);
        }
    }
}
