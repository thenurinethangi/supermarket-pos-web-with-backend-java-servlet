package org.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.entity.User;
import org.example.service.SignUpService;

import java.io.IOException;
import java.util.Map;

@WebServlet("/signup/*")
public class SignUpController extends HttpServlet {

    private SignUpService signUpService = new SignUpService();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,String> user = objectMapper.readValue(req.getInputStream(), Map.class);

        boolean isExist = signUpService.isExist(user.get("userName"));
        if(isExist){
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("exist");
            return;
        }

        User user1 = new User(user.get("userName"),user.get("fullName"),user.get("email"),user.get("password"));
        boolean isSave = signUpService.add(user1);
        if(isSave) {
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("true");
        }
        else{
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("false");
        }
    }
}
