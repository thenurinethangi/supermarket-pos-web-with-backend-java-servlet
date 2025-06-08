package org.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.entity.Item;
import org.example.service.ItemService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@WebServlet("/item/*")
public class ItemController extends HttpServlet {

    private ItemService itemService = new ItemService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String path = req.getPathInfo();

        if(req.getParameter("newid")!=null){

            String newId = itemService.generateNewId();
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.setContentType("application/json");
            resp.getWriter().write(newId);
        }
        else if(path!=null){

            String[] arr = path.split("/");
            String id = arr[1];

            Item item = itemService.searchById(id);
            resp.setContentType("application/json");

            if(item==null){
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("can't find item");
            }
            else{
                resp.setStatus(HttpServletResponse.SC_OK);
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.writeValue(resp.getWriter(),item);
            }
        }

        else {
            List<Item> itemList = itemService.getAll();

            resp.setContentType("application/json");
            resp.setStatus(HttpServletResponse.SC_OK);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(resp.getWriter(), itemList);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        ObjectMapper objectMapper= new ObjectMapper();
        Map<String,String> item = objectMapper.readValue(req.getInputStream(), Map.class);
        Item item1 = new Item(item.get("id"),item.get("description"),Double.parseDouble(item.get("price")),Integer.parseInt(item.get("qty")));
        boolean result = itemService.add(item1);

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

        boolean result = itemService.delete(arr[1]);

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
        Map<String,String> item = objectMapper.readValue(req.getInputStream(),Map.class);

        Item item1 = new Item(item.get("id"),item.get("description"),Double.parseDouble(item.get("price")),Integer.parseInt(item.get("qty")));
        boolean result = itemService.update(item1);

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
