package com.msultan.spring.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserLoginResponse {

	private boolean userLoginResponse;
	private boolean usernameExists;
	private boolean passwordValid;
	private String message;

	private String username;
	private String email;
	private String firstName;
	private String lastName;
}
