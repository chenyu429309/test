$(function(){
	/* 进入页面就会发生的事件*/
	pdfLoad.getPeEmailBylineAndPart();
	/* 进入页面就会发生的事件*/
	/**线体和段位变化时带动对应的email变化*/
	$('#ftb_line_pdf_data_up').off().on('change',function(){
		pdfLoad.getPeEmailBylineAndPart();
	})
	$('#ftb_part_pdf_data_up').off().on('change',function(){
		pdfLoad.getPeEmailBylineAndPart();
	})
	/**线体和段位变化时带动对应的email变化*/
	/* 上传PDF文件*/
	$('#ftb_btn_pdf_data_up').off().on('click',function(){
				var checkFile = $("#file").val();// 获取属性为file的值
				if (checkFile == "" || checkFile == null) {
					alert("可能沒有選擇文件！！！");
					return false;
				}
				var url="PDFUploadAndDisplay/PDFUploadMethod";
				var data =new Object();
				data.part=$('#ftb_part_pdf_data_up').val();
				data.line=$('#ftb_line_pdf_data_up').val();
				data.pmPeEmail=$('#ftb_email_pdf_data_up').val();
				$.ajaxFileUpload({
			        url: url, 
			        type: 'post',
			        secureuri: false, //一般设置为false
			        data:data, 
			        fileElementId: 'file', // 上传文件的id、name属性名
			        dataType: 'application/json', //返回值类型，一般设置为json、application/json  这里要用大写  不然会取不到返回的数据
			        success: function(data, status){  
			            alert(data);
			        },
			        error: function(data, status, e){ 
			            alert(e);
			        }
	    }); 
	})
	/* 上传PDF文件*/
	/* 保存线体段位对应的email*/
	$('#ftb_btn_save_pdf_data_in').off().on('click',function(){
		var data=new Object();
		var url="PDFUploadAndDisplay/savePDFMessage";
		data.line=$('#ftb_line_pdf_data_in').val();
		data.part=$('#ftb_part_pdf_data_in').val();
		data.email=$('#ftb_email_pdf_data_in').val();
		if(confirm("是否继续:")){
			$.ajax({ 
				type:"POST", 
				url:url, 
				dataType:"json",      
				contentType:"application/json",               
				data:JSON.stringify(data), 
				success:function(data){ 
					//后台返回一个msg（保存成功与否）
					alert(data.msg);
					if(data.flag){
						pdfLoad.loadWelcome("pageskip/loadPDFUpload");
					}
				} 
			}); 
		   }
		
	});
	/* 保存线体段位对应的email*/
});
var pdfLoad={
		/* 根据线体段位对应的email*/
		getPeEmailBylineAndPart:function(){
			var data=new Object();
			var url="PDFUploadAndDisplay/getPeEmailBylineAndPart";
			data.line=$('#ftb_line_pdf_data_up').val();
			data.part=$('#ftb_part_pdf_data_up').val();
				$.ajax({ 
					type:"POST", 
					url:url, 
					dataType:"json",      
					contentType:"application/json",               
					data:JSON.stringify(data), 
					success:function(data){ 
						//后台返回一个msg（保存成功与否）
						if(data.flag){
							$('#ftb_email_pdf_data_up').val(data.msg);
						}else
							alert(data.msg);
					} 
				}); 
		},
/* 根据线体段位对应的email*/
		loadWelcome:function(html){
			$.ajax({ 
	            type:"POST", 
	            url:html, 
	            data:{}, 
	            success:function(data){ 
	            			$('.pageBody').html(data);  
	            			var starttargetUrlPath=html.indexOf('load');
	            			var targetUrlPath=html.substring(starttargetUrlPath+4);
	            			var breadcrumb_second_flag_content="<a href='#' data-url='"+html+"' class='targetUrl'>"+targetUrlPath+"</a>"
	            			$('.breadcrumb_second_flag').html(breadcrumb_second_flag_content);
	            } 
	         }); 
		}
}