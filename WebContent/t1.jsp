<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>test</title>
<script type="text/javascript" src="/Shiro-Javaee/static/lib/jquery-1.8.1.min.js"></script>
<script type="text/javascript">
	$(function() {
		//根据机种获取编号
		//test.getNumber();

		//点击使用，次数加一
		//test.saveUseMessage();

		//炉温板信息录入
		//test.dataInput();

		//点击查询，炉温板使用查询
		//test.getTbUseData(1, 5);
		//test.scrapFTB();
		//test.getDataInputRecord(1, 5);
		//test.getUseRecord(1, 5);
		//test.getPDFTable();
// 		test.getLastUseTime(); 
		test.login();
	});
	var test = {
			login : function() {
				var data = new Object();
				data.username = "java";
				data.password = "123";
				$.ajax({
					type : "POST",
					url : "user/login",
					dataType : "json",
					contentType : "application/json",
					data : JSON.stringify(data),
					success : function(data) {
						alert(data);
					}
				});
			},
			getLastUseTime : function() {
				var data = new Object();
				data.part = "TOP";
				$.ajax({
					type : "POST",
					url : "PDFUploadAndDisplay/getLastUseTime",
					dataType : "json",
					contentType : "application/json",
					data : JSON.stringify(data),
					success : function(data) {
						alert(data.number);
					}
				});
			},
		getNumber : function() {
			var data = new Object();
			data.mechine = 25;
			$.ajax({
				type : "POST",
				url : "data/getNumber",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(data),
				success : function(data) {
					alert(data.number);
				}
			});
		},
		saveUseMessage : function() {
			var data = new Object();
			data.id = 33;
			data.tbNumber = "001";
			data.tbMechine = "kirin";
			data.tbPart = "TOP";
			data.tbAvailableLine = "l1";
			data.tbUsingLine = "l1";
			data.tbSideBoard = "no1";
			data.userId = 1;
			data.useNum = 20;
			$.ajax({
				type : "POST",
				url : "data/saveUseMessage",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(data),
				success : function(data) {
					alert(data.number);
				}
			});
		},

		scrapFTB : function() {
			var data = new Object();
			data.id = 35;
			data.tbNumber = "001";
			data.tbMechine = "kirin";
			data.tbPart = "TOP";
			data.tbAvailableLine = "l1";
			data.tbUsingLine = "l1";
			data.tbSideBoard = "no1";
			data.userId = 1;
			data.useNum = 20;
			data.tbRemark = "不想用了"
			$.ajax({
				type : "POST",
				url : "data/scrapFTB",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(data),
				success : function(data) {
					alert(data.number);
				}
			});
		},

		getTbUseData : function(page, size) {
			var data = new Object();
			data.mechine = "kirin";
			data.line = "l1";
			data.part = "TOP";
			if (page == undefined || page == '') {
				page = 1;
			}
			data.page = page;
			data.size = size;
			$.ajax({
				type : "POST",
				url : "data/getTbUseData",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(data),
				success : function(data) {
					alert(data.number);
				}
			});
		},
		dataInput : function() {
			var data = {
				"number" : "110",
				"mechine" : "kirin1",
				"part" : "BOT6",
				"line" : "line010",
				"sideBoard" : "no11",
				"userId" : "1",
				"userNumF" : 115,
				"userNumN" : 200
			};
			$.ajax({
				type : "POST",
				url : "data/saveDataInputMessage",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(data),
				success : function(data) {
					alert(data.number);
				}
			});
		},
		getDataInputRecord : function(page, size) {
			var data = new Object();
			data.mechine = "kirin";
			data.line = "l1";
			data.part = "TOP";
			data.number = "";
			data.page = page;
			data.size = size;
			$.ajax({
				type : "POST",
				url : "data/getDataInputRecord",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(data),
				success : function(data) {
					alert(data.number);
				}
			});
		},
		getUseRecord : function(page, size) {
			var data = new Object();
			data.mechine = "kirin";
			data.line = "l1";
			data.part = "TOP";
			data.number = "";
			data.page = page;
			data.size = size;
			$.ajax({
				type : "POST",
				url : "data/getUseRecord",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(data),
				success : function(data) {
					alert(data.number);
				}
			});
		},
		getPDFTable : function() {
			var data = new Object();
			data.line = "line1";
			data.part = "top";
			$.ajax({
				type : "POST",
				url : "PDFUploadAndDisplay/getPDFTable",
				dataType : "json",
				contentType : "application/json",
				data : JSON.stringify(data),
				success : function(data) {
					alert(data.number);
				}
			});
		}
	}
</script>
</head>
<body>

</body>
</html>