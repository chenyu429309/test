package com.felix.utils;

import org.apache.log4j.Logger;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.crypto.hash.HashRequest;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.util.SimpleByteSource;
import org.junit.Test;

public class TestDemo {
	private Logger logger=Logger.getLogger(TestDemo.class);
	@Test
	public void hexDemo() {
		DefaultHashService hashService = new DefaultHashService(); // 默认算法SHA-512
		hashService.setHashAlgorithmName("SHA-512");///算法
		hashService.setPrivateSalt(new SimpleByteSource("123")); // 私盐，默认无
		hashService.setGeneratePublicSalt(true);// 是否生成公盐，默认false
		hashService.setRandomNumberGenerator(new SecureRandomNumberGenerator());// 用于生成公盐。默认就这个
		hashService.setHashIterations(1); // 生成Hash值的迭代次数

		HashRequest request = new HashRequest.Builder().setAlgorithmName("MD5")
				.setSource(ByteSource.Util.bytes("hello")).setSalt(ByteSource.Util.bytes("123")).setIterations(2)
				.build();
		String hex = hashService.computeHash(request).toHex();
		logger.info(hex);
	}
	@Test
	public void hashHex(){
		String algorithmName = "md5";  
		String username = "liu";  
		String password = "123";  
		String salt1 = username;  
//		String salt2 = new SecureRandomNumberGenerator().nextBytes().toHex();  //3f887cdc783bfe26238633c248b547e1
		int hashIterations = 2;  
//		SimpleHash hash = new SimpleHash(algorithmName, password, salt1 + salt2, hashIterations);  
		SimpleHash hash = new SimpleHash(algorithmName, password, salt1, hashIterations);  
		String encodedPassword = hash.toHex();   
		logger.info(encodedPassword);
	}
}
