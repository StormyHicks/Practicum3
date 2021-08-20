package com.team2.trivia.Controllers;

import com.team2.trivia.Models.*;
import com.team2.trivia.Repos.*;
import com.team2.trivia.Responses.AuthorizeUserResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepo userRepo;

    @RequestMapping(method = RequestMethod.GET, value = "get", produces = "application/json")
    public User getUser(String userName, String password) {

        User user = userRepo.findUserByUserName(userName);

        return user;
    }

    @RequestMapping(method = RequestMethod.POST, value = "create")
    public User createUser(@RequestBody User user) {
        User rUser = userRepo.findUserByUserName(user.userName);
        user.setUserName(user.getUserName().toLowerCase());
        if (rUser != null) {
            if (!rUser.userName.equals(user.userName)) {
                user = userRepo.save(user);
                return user;
            }
            else {
                return null;
            }
        }
        else {
            user = userRepo.save(user);
            return user;
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "authorize", produces = "application/json")
    public AuthorizeUserResponse authorizeUser(String userName, String password) {

        User user = userRepo.findUserByUserName(userName);
        AuthorizeUserResponse response = null;

        if (user == null || !user.getUserPassword().equals(password)) {
            response = new AuthorizeUserResponse(false, null);
        }
        else {
            response = new AuthorizeUserResponse(true, user);
        }

        return response;
    }
}