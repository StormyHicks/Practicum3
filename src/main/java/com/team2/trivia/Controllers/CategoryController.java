package com.team2.trivia.Controllers;

import java.util.ArrayList;
import java.util.Optional;

import com.team2.trivia.Models.*;
import com.team2.trivia.Repos.*;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:3000/")
public class CategoryController {
    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private QuestionRepo questionRepo;

    @Autowired
    private Question_AnswerRepo questionAnswerRepo;

    @Autowired
    private ScoreRepo scoreRepo;


    @RequestMapping(method=RequestMethod.GET, value="get_category", produces="application/json")
    public Category getCategory(int categoryId) {
        return categoryRepo.findById(categoryId).get();
    }

    @RequestMapping(method=RequestMethod.POST, value="sort_category", produces="application/json")
    public Iterable<Category> sortCategory(String sortMethod) {

        ArrayList<Category> sorted =(ArrayList<Category>) categoryRepo.findAll();

        switch (sortMethod) {
            case "ID" : sorted.sort((o1, o2) -> (((Integer)((Category)o1).getCategoryId()).compareTo(((Category)o2).getCategoryId())));
            break;
            case "Alpha" : sorted.sort((o1, o2) -> ((Category)o1).getCategoryName().compareTo(((Category)o2).getCategoryName()));
            break;
            case "Newest" : sorted.sort((o1, o2) -> (((Integer)((Category)o2).getCategoryId()).compareTo(((Category)o1).getCategoryId())));
            break;
            case "RevAlpha" : sorted.sort((o1, o2) -> ((Category)o2).getCategoryName().compareTo(((Category)o1).getCategoryName()));
            break;
        }   
        return sorted;
    }

    @RequestMapping(method=RequestMethod.POST, value="delete", produces="application/json")
    public void delete(int categoryId) {
       Optional<Category> deleteOpt = categoryRepo.findById(categoryId);
 
       Category deleteCat = deleteOpt.get();
      
       System.out.println("1: ****************************************** " + String.valueOf(categoryId));
       Iterable<Question> questionResult =  questionRepo.getAllQuestionsByCategory(categoryId);
       Iterable<Score> scores = scoreRepo.findAllScoresByCategoryId(categoryId);
       scoreRepo.deleteAll(scores);
      
       ArrayList<Question_Answer> questionAnswerResult = new ArrayList<Question_Answer>();
       for (Question currentQuestion : questionResult)
       {
            questionAnswerResult = (ArrayList<Question_Answer>)questionAnswerRepo.findAllByQuestionId(
                currentQuestion.getQuestionId());
            questionAnswerRepo.deleteAll(questionAnswerResult);
            questionRepo.delete(currentQuestion);
  
       }

       categoryRepo.delete(deleteCat);
    }


    @RequestMapping(method=RequestMethod.POST, value="search_category", produces="application/json")
    public Iterable<Category> searchCategory(String searchString) {
        Iterable<Category> allCategories = categoryRepo.findAll();
        ArrayList<Category> returnCat = new ArrayList<Category>();
        for (Category curCat : allCategories) {
            if (curCat.getCategoryName().toLowerCase().contains(searchString.toLowerCase()) || 
                    (curCat.getCategoryDescription().toLowerCase().contains(searchString.toLowerCase())))
                {
                    returnCat.add(curCat);
                }
        }
        return returnCat;
    }


    @RequestMapping(method=RequestMethod.GET, value="get_all", produces="application/json")
    public Iterable<Category> getAll() {
        return categoryRepo.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="create", produces="application/json")
    public Category createCategory(@RequestBody Category category) {
        return categoryRepo.save(category);
    }

    @RequestMapping(method=RequestMethod.POST, value="update_category", produces="application/json")
    public Category newCategory(@RequestParam String categoryName,@RequestParam String categoryDescription, @RequestParam String categoryId ) {
        Category newCat;
        Optional<Category> tempCat;
        int intId;
        if (categoryId.equals("New Category"))
        {
            newCat = new Category(categoryName, categoryDescription);    
        }
        else{ 
            intId = Integer.parseInt(categoryId);
            tempCat = categoryRepo.findById(intId);
            if (tempCat.isPresent())
            {
                newCat = tempCat.get();
                newCat.setCategoryDescription(categoryDescription);
                newCat.setCategoryName(categoryName);
            }
            else {return null;}
        }
        return categoryRepo.save(newCat);
    }
}
