package org.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.entity.User;
import org.example.service.SignInService;

import java.io.IOException;
import java.util.Map;

@WebServlet("/signin/*")
public class SignInController extends HttpServlet {

    private SignInService signInService = new SignInService();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("text/plain");

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,String> user = objectMapper.readValue(req.getInputStream(), Map.class);

        User user1 = signInService.searchByUserName(user.get("userName"));
        if(user1==null){
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("not exist");
            return;
        }

        String password = user1.getPassword();
        String p = user.get("password");

        if(password.equalsIgnoreCase(p)){
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("true");
        }
        else{
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("false");
        }
    }
}
