package com.felix.service;

import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.felix.Mapper.UserMapper;
import com.felix.entity.User;


@Service
@SuppressWarnings("rawtypes")
public class UserService {
	@Autowired
	private UserMapper userMapper;
	
	public User findUserById(Long id) {
		return userMapper.findUserById(id);
	}
	public Set<String> findRoles(String username) {
	
		return userMapper.findRoles(username);
	}

	public Set<String> findPermissions(String username) {
		// TODO Auto-generated method stub
		return userMapper.findPermissions(username);
	}
	public User findByUsername(String userName) {
		// TODO Auto-generated method stub
		return userMapper.findByUsername(userName);
	}
	public Map login(User user) {
		return userMapper.login(user);
	}

}
