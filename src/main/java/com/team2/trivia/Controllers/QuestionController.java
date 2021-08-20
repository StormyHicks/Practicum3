package com.team2.trivia.Controllers;

import java.util.ArrayList;
import java.util.Optional;
import javax.transaction.Transactional;
import com.team2.trivia.Models.*;
import com.team2.trivia.Repos.*;
import com.team2.trivia.Requests.CreateQuestionRequest;
import com.team2.trivia.Responses.GetQuestionResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/question")
@CrossOrigin(origins = "http://localhost:3000/")
public class QuestionController {
    @Autowired
    private QuestionRepo questionRepo;

    @Autowired
    private AnswerRepo answerRepo;

    @Autowired
    private Question_AnswerRepo question_AnswerRepo;

    
    
    
   
    
    @RequestMapping(method=RequestMethod.POST, value="create", produces="application/json")
    public int createQuestion(@RequestBody CreateQuestionRequest request) {
        
        Question questionResult = questionRepo.save(request.getQuestion());

        int CorrectAns = request.getCorrectAnswer();
        Iterable<Answer> answerResult = answerRepo.saveAll(request.getAnswers());
        int corrIndex = request.getCorrectAnswer();

        ArrayList<Question_Answer> questionAnswers = new ArrayList<Question_Answer>();
        
        int i = 0;
        for (Answer answer : answerResult) {
            i++;
            Question_Answer questionAnswer = new Question_Answer();
            if (corrIndex <= 4) {
                if (i == corrIndex) {
                    questionAnswer.setIsCorrect(true);
                } 
            }
            else {
                questionAnswer.setIsCorrect(answer.getAnswerId() == CorrectAns);
            }
            questionAnswer.setQuestionId(questionResult.questionId);
            questionAnswer.setAnswerId(answer.getAnswerId());
            questionAnswers.add(questionAnswer);
        }
        question_AnswerRepo.saveAll(questionAnswers);

        return questionResult.questionId;
    }

    

    @RequestMapping(method=RequestMethod.GET, value="get_all", produces="application/json")
    public Iterable<GetQuestionResponse> getAll() {
        ArrayList<GetQuestionResponse> response = new ArrayList<GetQuestionResponse>();

        Iterable<Question> questionResult = questionRepo.findAll();

        populateQuestionAnswers(questionResult, response);

        return response;
    }

    @RequestMapping(method=RequestMethod.POST, value="get_random", produces="application/json")
    public Iterable<GetQuestionResponse> getRandom(int numberOfQuestions, int categoryId) {

        ArrayList<GetQuestionResponse> response = new ArrayList<GetQuestionResponse>();
        
        Iterable<Question> questionResult = questionRepo.getRandomQuestionsByCategory(numberOfQuestions, categoryId);

        populateQuestionAnswers(questionResult, response);

        return response;
    }

    @RequestMapping(method=RequestMethod.POST, value="get_allcategory", produces="application/json")
    public Iterable<GetQuestionResponse> getAllByCategory(int categoryId) {

        ArrayList<GetQuestionResponse> response = new ArrayList<GetQuestionResponse>();
        
        Iterable<Question> questionResult = questionRepo.getAllQuestionsByCategory(categoryId);

        populateQuestionAnswers(questionResult, response);

        return response;
    }




    private void populateQuestionAnswers(Iterable<Question> questions, ArrayList<GetQuestionResponse> response) {
        for (Question question : questions) {
            ArrayList<Question_Answer> qa = question_AnswerRepo.findAllByQuestionId(question.questionId);
            ArrayList<Answer> answers = new ArrayList<Answer>();

            int correctAnswer = 0;

            for (Question_Answer question_Answer : qa) {
                Optional<Answer> answer = answerRepo.findById(question_Answer.answerId);
                answers.add(answer.get());
                if (question_Answer.isCorrect) {
                    correctAnswer = question_Answer.answerId;
                }
            }
            response.add(new GetQuestionResponse(question, answers, correctAnswer));
        }
    }

    //William's work below. Somehow got removed during mergers 
    @RequestMapping(method = RequestMethod.DELETE, value = "delete", produces = "application/json")
    @Transactional
    public boolean deleteCategory(int questionId) {

        Iterable<Question_Answer> answers = question_AnswerRepo.findAllByQuestionId(questionId);

        question_AnswerRepo.deleteAll(answers);

        for (Question_Answer qa : answers) {
            answerRepo.deleteById(qa.getAnswerId());
        }

        questionRepo.deleteById(questionId);

        return true;
    }
}