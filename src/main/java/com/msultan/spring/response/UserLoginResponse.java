package com.msultan.spring.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class UserLoginResponse extends Response {

	private boolean usernameExists;
	private boolean passwordValid;
	private String username;
	private String email;
	private String firstName;
	private String lastName;

}
