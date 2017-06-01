package com.felix.shiro;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.web.filter.PathMatchingFilter;
import org.springframework.beans.factory.annotation.Autowired;

import com.felix.service.UserService;

public class SysUserFilter extends PathMatchingFilter {
	private Logger logger=Logger.getLogger(SysUserFilter.class);
	 @Autowired
	    private UserService userService;

	    @Override
	    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
	    		
	        String username = (String)SecurityUtils.getSubject().getPrincipal();
	        logger.info(username);
	        if(username!=null){
		        request.setAttribute(Constants.CURRENT_USER, userService.findByUsername(username));
		        return true;
	        }else
	        		return false;
	    }
}                                      																																																															                          
