package com.team2.trivia.Repos;

import com.team2.trivia.Models.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepo extends CrudRepository<Question, Integer> {
	//@Query(value = "{call Get_Random_Questions_By_Category(:numberOfQuestions, :categoryId)}", nativeQuery = true)
	@Query(value = "SELECT * FROM Question q WHERE q.Category_Id = :categoryId ORDER BY RAND() LIMIT :numberOfQuestions", nativeQuery = true)
	Iterable<Question> getRandomQuestionsByCategory(@Param("numberOfQuestions") int numberOfQuestions, @Param("categoryId") int categoryId);

	@Query(value = "SELECT * FROM Question q WHERE q.Category_Id = :categoryId ORDER BY q.question_id", nativeQuery = true)
	Iterable<Question> getAllQuestionsByCategory(@Param("categoryId") int categoryId);
}
