package com.team2.trivia.Responses;

import com.team2.trivia.Models.Question;
import com.team2.trivia.Models.Answer;

public class GetQuestionResponse {
    private Question _question;
    private Iterable<Answer> _answers;
    private int _correctAnswer;

    public GetQuestionResponse (Question question, Iterable<Answer> answers, int correctAnswer) {
        _question = question;
        _answers = answers;
        _correctAnswer = correctAnswer;
    }

    public Question getQuestion() {
        return _question;
    }

    public Iterable<Answer> getAnswers() {
        return _answers;
    }

    public int getCorrectAnswer() {
        return _correctAnswer;
    }
}
