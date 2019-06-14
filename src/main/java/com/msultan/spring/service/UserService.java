package com.msultan.spring.service;

import com.msultan.spring.model.User;
import com.msultan.spring.repository.UserRepository;
import com.msultan.spring.response.UserLoginResponse;
import com.msultan.spring.response.UserRegistrationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

	private UserRepository repository;

	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	public UserService(UserRepository repository, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.repository = repository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	public List<User> findAll(){
		return repository.findAll();
	}

	public Optional<User> findById(String id){
		return repository.findById(id);
	}

	public Optional<User> findByEmail(String email){
		return repository.findByEmail(email);
	}

	public Optional<User> findByUserName(String userName){
		return repository.findByUserName(userName);
	}

	public UserRegistrationResponse save(User user){
		UserRegistrationResponse userRegistrationResponse = new UserRegistrationResponse();
		Optional<User> email = findByEmail(user.getEmail());
		if(email.isPresent()){
			userRegistrationResponse.setEmailTaken(true);
			userRegistrationResponse.setRegistrationResponse(false);
		}
		Optional<User> username = findByUserName(user.getUserName());
		if(username.isPresent()){
			userRegistrationResponse.setUserNameTaken(true);
			userRegistrationResponse.setRegistrationResponse(false);
		}
		if(!userRegistrationResponse.isEmailTaken() && !userRegistrationResponse.isUserNameTaken()){
			userRegistrationResponse.setRegistrationResponse(true);
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			repository.save(user);
		}
		return userRegistrationResponse;
	}

	public UserLoginResponse verify(User user){
		UserLoginResponse userLoginResponse = new UserLoginResponse();
		Optional<User> query = findByUserName(user.getUserName());
		System.out.println(user.toString());
		if(query.isPresent()){
			userLoginResponse.setUsernameExists(true);
			if(bCryptPasswordEncoder.matches(user.getPassword(),query.get().getPassword())) {
				userLoginResponse.setUsername(query.get().getUserName());
				userLoginResponse.setEmail(query.get().getEmail());
				userLoginResponse.setFirstName(query.get().getFirstName());
				userLoginResponse.setLastName(query.get().getLastName());
				userLoginResponse.setPasswordValid(true);
				userLoginResponse.setMessage("Welcome!");
				userLoginResponse.setUserLoginResponse(true);
			}
			else{
				userLoginResponse.setMessage("Incorrect password");
				userLoginResponse.setUserLoginResponse(false);
			}
		}
		else{
			userLoginResponse.setMessage("The username does not exist");
			userLoginResponse.setUserLoginResponse(false);
		}
		return userLoginResponse;
	}

	public void deleteById(String id){
		repository.deleteById(id);
	}
}