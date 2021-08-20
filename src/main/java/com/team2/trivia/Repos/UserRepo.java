package com.team2.trivia.Repos;

import com.team2.trivia.Models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, Integer> {
	
	User findUserByUserName(String userName);
}
