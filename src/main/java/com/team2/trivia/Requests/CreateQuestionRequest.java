package com.team2.trivia.Requests;

import com.team2.trivia.Models.Question;
import com.team2.trivia.Models.Answer;

public class CreateQuestionRequest {
    private Question _question;
    private Iterable<Answer> _answers;
    private int _correctanswer;

    public CreateQuestionRequest (Question question, Iterable<Answer> answers, int correctanswer) {
        _question = question;
        _answers = answers;
        _correctanswer= correctanswer;
    }

    public Question getQuestion() {
        return _question;
    }

    public Iterable<Answer> getAnswers() {
        return _answers;
    }

    public int getCorrectAnswer() {
        return _correctanswer;
    }
}
