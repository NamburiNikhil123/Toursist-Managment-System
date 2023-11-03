package com.dao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Users;




@Service
public class UsersDAO {
	
	@Autowired
	UsersRepository usersRepo;

	public Users userLogin(String emailId, String password) {
		return usersRepo.userLogin(emailId, password);
	}

	public Users registerUser(Users user) {
		return usersRepo.save(user);
	}
	




}
