package com.team2.trivia.Controllers;

import com.team2.trivia.Models.*;
import com.team2.trivia.Repos.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("api/score")
@CrossOrigin(origins = "http://localhost:3000/")
public class ScoreController {
    @Autowired
    private ScoreRepo scoreRepo;

    @RequestMapping(method = RequestMethod.GET, value = "get_by_user", produces = "application/json")
    public Iterable<Score> getByUserId(int userId) {
        return scoreRepo.findAllScoresByUserId(userId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "get_by_category", produces = "application/json")
    public Iterable<Score> getByCategoryId(int categoryId) {
        return scoreRepo.findAllScoresByCategoryId(categoryId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "create", produces = "application/json")
    public Score create(@RequestBody Score score) {
        return scoreRepo.save(score);
    }

}