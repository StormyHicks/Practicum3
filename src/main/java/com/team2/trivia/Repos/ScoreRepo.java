package com.team2.trivia.Repos;

import com.team2.trivia.Models.*;
import org.springframework.data.repository.CrudRepository;

public interface ScoreRepo extends CrudRepository<Score, Integer> {
	
	Iterable<Score> findAllScoresByUserId(int userId);

	Iterable<Score> findAllScoresByCategoryId(int categoryId);
}
