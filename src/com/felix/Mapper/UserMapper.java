package com.felix.Mapper;

import java.util.Map;
import java.util.Set;

import com.felix.entity.User;
public interface UserMapper {

	User findUserById(Long id);

	Set<String> findPermissions(String username);

	Set<String> findRoles(String username);

	User findByUsername(String userName);

	Map login(User user);

}
