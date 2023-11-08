package com.ts.main;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dao.UsersDAO;

import com.model.Users;


@RestController

public class UsersController {
	
	@Autowired
	UsersDAO usersDAO;
	

	
	
	
	@GetMapping("userLogin/{emailId}/{password}")
	public Users userLogin(@PathVariable("emailId") String emailId, @PathVariable("password") String password) {
		return usersDAO.userLogin(emailId, password);
	}
	
	@PostMapping("registerUser")
	public Users registerUser(@RequestBody Users user) {
		return usersDAO.registerUser(user);
	}

	


}
