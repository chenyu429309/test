package com.felix.entity;

import java.io.Serializable;

@SuppressWarnings("serial")
public class ReturnMap implements Serializable{
	private Boolean flag;
	private Object obj;
	public Boolean getFlag() {
		return flag;
	}
	public void setFlag(Boolean flag) {
		this.flag = flag;
	}
	public Object getObj() {
		return obj;
	}
	public void setObj(Object obj) {
		this.obj = obj;
	}
	
	
}
