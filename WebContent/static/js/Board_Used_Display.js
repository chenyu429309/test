/**
 * 炉温板信息使用查询页面
 */
$(function(){
	$('#ftb-used-serarch-btn-bud').off().on('click',function(){
		var data=new Object();
		var url="data/getUseRecord";
		data.mechine=$('#ftb-used-project-bud').val();
		data.number=parseInt($('#ftb-used-no-bud').val());
		data.line=$('#ftb-used-line-bud').val();
		data.part=$('#ftb-used-part-bud').val();
		var heads=["编号","机种","段位","使用线体","橱柜","已使用次数","使用者","工号","使用时间","狀態","備註"];
		var headsData=["number","mechine","part","line","sideboard","useNumN","name","workId","time","status","remark"];
		var classId="Board-Used-Display-table";
		TableUtils.tableCreateUtils(1, 10, data, heads, headsData, url, classId);
//		board_used_display.ftb_used_search_btn_bud_Method(1);
	})
})
var board_used_display={
	ftb_used_search_btn_bud_Method:function(page){
		var data=new Object();
		var url="data/getUseRecord";
		data.mechine=$('#ftb-used-project-bud').val();
		data.number=parseInt($('#ftb-used-no-bud').val());
		data.line=$('#ftb-used-line-bud').val();
		data.part=$('#ftb-used-part-bud').val();
		if(page==undefined){
			page=1;
		}
		data.size=10;
		data.page=(page-1)*data.size;
			$.ajax({ 
				type:"POST", 
				url:url, 
				dataType:"json",      
				contentType:"application/json",               
				data:JSON.stringify(data), 
				success:function(data){ 
					var heads=["编号","机种","段位","使用线体","橱柜","已使用次数","使用者","工号","使用时间","狀態","備註"];
					var headsData=["number","mechine","part","line","sideboard","useNumN","name","workId","time","status","remark"];
					//使用Content--start
					var html=board_used_display.createTable(data.recordList,heads,headsData);
					html+=board_used_display.createFootPage(data);
					$('.Board-Used-Display-table').html(html);
					//使用分页效果--end
					board_used_display.pageUtils();
				} 
			}); 
	},
	/**创建页码*/
	createFootPage:function(pageList){
		var html = "<div><div class='col-sm-4 text-left sm-center' style='float: left;back;background-color:gary;' >页次：<font> "
			+ pageList['currentPage'] + "</font> /<font id='pageCount'>";
		html += "" + pageList['pageCount']
				+ "</font>&nbsp;页 &nbsp; 每页显示：&nbsp;<font>"
				+ pageList['pageSize']
				+ "&nbsp;条 </font>&nbsp; 总记录数:&nbsp;<font>"
				+ pageList['recordCount'] + "</font>&nbsp;条</div>";
		html += "<div class='pagination' style='float: right'> <ul class='pagination'>"
				+ " <li><a href='#' id='firstPage' "
				+ "title='FirstPage' >  " +
						"Previous</a></li>";
		if (pageList['pageCount'] <= 1) {
			html += "<li><a href='#' class='PageNum'>1</a></li>";
		} else {
			for (var num = pageList['beginPageIndex']; num <= pageList['endPageIndex']; num++) {
				html += "<li><a href='#' class='PageNum'>" + num + "</a></li>";
			}
		}
		html += "<li><a href='#' id='endPage' "
				+ "title='EndPage' >End</a></li></ul></div></div>";
		return html;
	},
	/**创建页码*/
	/**设置分页的操作*/
	pageUtils:function(){
		$('#firstPage').off().on('click', function() {
			board_used_display.ftb_used_search_btn_bud_Method(1);
			$(this).parent().nextAll().removeClass("active");
			$(this).parent().addClass("active");
		});
		$('#endPage').off().on('click',function(e) {
			var page = $('#pageCount').text() == 0 ? 1 : $('#pageCount').text();
			board_used_display.ftb_used_search_btn_bud_Method(page);
			$(this).parent().nextAll().removeClass("active");
			$(this).parent().addClass("active");
		});
		$('.PageNum').off().on('click', function() {
			var page = this.innerHTML;
			board_used_display.ftb_used_search_btn_bud_Method(page);
			$('.PageNum').parent().nextAll().removeClass("active");
			$(this).parent().addClass("active");
		});
	},
	/**设置分页的操作*/
	createTable:function(datas,heads,headsData){
		var html="";
		html += "<div><table class='table table-bordered table-sortable' ><thead><tr style='background: Linen;'>";
		/***顯示標頭*/
		for ( var _index=0;_index< heads.length;_index++) {
			html += "<th style='text-align: center;vertical-align: middle;'>" + heads[_index] + "</th>"
		}
		html += "</tr></thead><tbody>";
		if(datas.length>0){
			/**正文*/
			for ( var i in datas) {
				html += "<tr>";
				for ( var index in headsData) {
					var colData=datas[i][headsData[index]];
					if( headsData[index]=='time'){
						html += "<td style='text-align: center;vertical-align: middle;'>" +board_used_display.dateformat(new Date(colData)) + "</td>";
					}else{
						html += "<td style='text-align: center;vertical-align: middle;'>" + colData + "</td>";
					}
				}
				html += "</tr>";
			}
		}
		html += "</tbody></table></div>";
		console.log(html);
		return html;
		
	},
	dateformat : function(date) {
		if (date == "") {
			return ""
		};
		var yy=date.getFullYear();//
		var mon=(date.getMonth()+1) < 10 ? ('0' + (date.getMonth()+1)) : (date.getMonth()+1);//
		var d=date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();//
		var hour= date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();//
		var min=date.getMinutes() < 10 ? ('0' + date.getMinutes()): date.getMinutes();//
		var ss=date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
		return  yy+ "-" + mon+ "-" + d+ "  " + hour+ ":" + min+ ":" + ss;
	},
}