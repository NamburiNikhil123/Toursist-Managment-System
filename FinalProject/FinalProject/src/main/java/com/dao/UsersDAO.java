package com.dao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.model.Users;


@Service
public class UsersDAO {
	
	@Autowired
	UsersRepository usersRepo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public Users userLogin(String emailId, String password) {
        Users user = usersRepo.findByEmailId(emailId);

        if (user != null) {
            if (bCryptPasswordEncoder.matches(password, user.getPassword())) {
                return user; 
                
            }
        }

        return null; // User not found or passwords do not match
    }

	public Users registerUser(Users user) {	
		String plainTextPassword = user.getPassword();
		String hashedPassword = bCryptPasswordEncoder.encode(plainTextPassword);
		user.setPassword(hashedPassword);
		return usersRepo.save(user);
	}
	




}
