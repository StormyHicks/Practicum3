package com.team2.trivia.Repos;

import com.team2.trivia.Models.*;

import org.springframework.data.repository.CrudRepository;
import java.util.ArrayList;

public interface Question_AnswerRepo extends CrudRepository<Question_Answer, Integer> {
	public ArrayList<Question_Answer> findAllByQuestionId(int questionId);
}
