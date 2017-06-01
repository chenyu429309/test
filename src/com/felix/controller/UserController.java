package com.felix.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.felix.entity.User;
import com.felix.service.UserService;

@Controller
@RequestMapping(value="user")
@SuppressWarnings("rawtypes")
public class UserController {
	@Autowired
	private UserService userService;
	@RequestMapping(value="login")
	@ResponseBody
	private Map login(@RequestParam(value="username") String username,
			@RequestParam(value="password") String password){
		User user=new User(username,password);
		return userService.login(user);
	}
}
