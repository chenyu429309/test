/**
 * Massage_In页面的脚本
 */
$(function(){
	//可选下拉框
	$('.editableSelect').editableSelect({
			effects : 'slide',
			filter : true
	});
	//加载页面就加载的方法（直接生成选中机种对应的编号）
	massageIn.getFTBNumberByMechine($('#ftb_project_me_in').val());
	$('#ftb_project_me_in').off().on('change',function(){
		massageIn.getFTBNumberByMechine($('#ftb_project_me_in').val());
	});
	//第二个方法，保存所有的数据
	$('#ftb_in_serarch_me_in').off().on('click',function(){
			var data=new Object();
			var url="data/saveDataInputMessage";
			data.mechine=$('#ftb_project_me_in').val();
			data.number=$('#ftb_no_me_in').val();
			data.line=massageIn.concatArrayToString($('#ftb_line_me_in').val());
			data.part=$('#ftb_part_me_in').val();
			data.sideBoard=$('#ftb_sideboard_me_in').val();
			data.useNumF=$('#ftb_first_count_me_in').val();
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
						massageIn.getFTBNumberByMechine($('#ftb_project_me_in').val());
					} 
				}); 
			   }
	})
 });
var massageIn={
		//第一个方法，加载编号（根据机种返回对应的编号，然后渲染在$('#ftb_no_me_in')上）
			getFTBNumberByMechine:function(mechine){
					var data=new Object();
					data.mechine=mechine;
					var url="data/getNumber";
			        $.ajax({ 
			            type:"POST", 
			            url:url, 
			            dataType:"json",      
			            contentType:"application/json",               
			            data:JSON.stringify(data), 
			            success:function(data){ 
			            			$('#ftb_no_me_in').val(data.number);                      
			            } 
			         }); 
			},
			//将数组变成以“，”结尾的字符串
			concatArrayToString:function(arr){
				var str="";
				for(var i in arr){
					str+=(arr[i]+',');
				}
				return str;
	    }
}