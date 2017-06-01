package com.felix.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import com.felix.entity.User;
import com.felix.service.UserService;
import com.mchange.lang.ByteUtils;

/** 自定義自己的Ralm */
public class MyRealm extends AuthorizingRealm {
	@Autowired
	private UserService userService;
	/** 獲取授權信息 即根據主體的名字，找到對應的role和permisssion */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		String username = (String)principals.getPrimaryPrincipal();
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
//        authorizationInfo.setRoles(userService.findRoles(username));
//        authorizationInfo.setStringPermissions(userService.findPermissions(username));
		return authorizationInfo;
	}

	/** 獲取認證信息 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		UsernamePasswordToken usernamepasswordtoken= (UsernamePasswordToken) token;
		String userName=(String) usernamepasswordtoken.getPrincipal();
	    User user = userService.findByUsername(userName);
	    if(user==null){
	    		throw new UnknownAccountException("帳戶不存在");
	    }
	    if(Boolean.TRUE.equals(user.getLOCK())){
	    		throw new LockedAccountException("帳戶被鎖定");
	    }
	    /**這裡的構造方法需要研究一下*/
	    /** 如果密碼在存入的時候已經加密過，這時不需要在加密一次，只需聲明他的鹽 **/
	    SimpleHash sh=new SimpleHash("md5",user.getPassword() , userName, 2);
	    SimpleAuthenticationInfo info=new SimpleAuthenticationInfo(userName, sh, getName());
	   /***設置認證時的鹽**/
	    info.setCredentialsSalt(ByteSource.Util.bytes(userName));
		return info;
	}

}
