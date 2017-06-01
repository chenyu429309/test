/**第一個模塊*/
	/*** 頁面內嵌跳轉**/
window.UrlUtils={
		/***url以load開頭，開台頁面顯示HOME/當前頁面的位置
		 * 顯示的形式為：<a href='#' data-url='"+url+"' class='targetUrl'>"+targetUrlPath+"</a>
		 * */
	urlload:function(url,classId,secondId){
		$.ajax({ 
            type:"POST", 
            url:html, 
            data:{}, 
            success:function(data){ 
//            		$('.pageBody').html(data);  
            			$('.'+content).html(data);  
            			var starttargetUrlPath=url.indexOf('load');
            			var targetUrlPath=url.substring(starttargetUrlPath+4);
            			var breadcrumb_second_flag_content="<a href='#' data-url='"+url+"' class='targetUrl'>"+targetUrlPath+"</a>"
//            			$('.breadcrumb_second_flag').html(breadcrumb_second_flag_content);
            			$('.'+secondId).html(breadcrumb_second_flag_content);
            } 
         }); 
	}
}
/***數日期相關的方法**/
	window.	MathUtils={
		/**将数字变成三位的字符串--start*/
		convertNumber:function(num){
			var str="";
					 if(num<10){
						str=str.concat("00"+num);}
					 else if(10<=num<100){
						str=str.concat("0"+num);}
					 else if(100<=num<1000){
						str=str.concat(""+num);
					}
			return str;
		},
		/**将数字变成三位的字符串--end*/
		/**日期格式化：yyyy-MM-dd HH:mm:ss --start*/
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
		/**日期格式化：yyyy-MM-dd HH:mm:ss --end*/
		
	}



/***表創建和分頁模塊：**/
window.TableUtils={
		/**創建表格的總方法：1，需要的參數：**/
		/**   page：當前頁；size：每頁條數；obj：要傳入的對象（考慮先將obj變成json，在解析為對象）**/
		/**   heads:表頭（中文標頭在表格中顯示）headsData：返回的數據中的鍵，利用鍵值對獲取對應的值 **/
		/**  url：要請求的連結；classId：在頁面中存放的位置 **/
		tableCreateUtils:function(page,size,obj,heads,headsData,url,classId){
			if(page==undefined){
				page=1;
			}
			obj.size=size;
			obj.page=(page-1)*size;
			$.ajax({ 
				type:"POST", 
				url:url, 
				dataType:"json",      
				contentType:"application/json",               
				data:JSON.stringify(obj), 
				success:function(data){ 
					/**創建表格內容和表頭   這裡傳過來的是一個PageBean對象，其中包含recordList這個參數即需要的數據**/
					var html=TableUtils.createTable(data.recordList,heads,headsData);
					/**創建表格頁碼 這裡需要的參數很多，但在PageBean對象中已經處理好了**/
					html+=TableUtils.createFootPage(data);
					/** 將獲取到的Html 加載到指定的位置上**/
					$('.'+classId).html(html);
					//使用分页效果--end
					/*** 將頁面上的首頁和尾頁還有頁碼的調轉的**/
					TableUtils.pageUtils(obj,heads,headsData,url,classId);
				} 
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
						html += "<td style='text-align: center;vertical-align: middle;'>" + colData + "</td>";
					}
					html += "</tr>";
				}
				/**正文*/
			}
			html += "</tbody></table></div>";
			return html;
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
					+ " <li><a href='#' id='firstPage' "+ "title='FirstPage' >  " +"Previous</a></li>";
			if (pageList['pageCount'] <= 1) {
				html += "<li><a href='#' class='PageNum'>1</a></li>";
			} else {
				for (var num = pageList['beginPageIndex']; num <= pageList['endPageIndex']; num++) {
					html += "<li><a href='#' class='PageNum'>" + num + "</a></li>";
				}
			}
			html += "<li><a href='#' id='endPage' "+ "title='EndPage' >End</a></li></ul></div></div>";
			return html;
		},
		/**创建页码*/
		
		/**设置分页的操作*/
		pageUtils:function(obj,heads,headsData,url,classId){
			$('#firstPage').off().on('click', function() {
				TableUtils.tableCreateUtils(1,10,obj,heads,headsData,url,classId);
				$('.pagination li').removeClass("active");
				$(this).parent().addClass("active");
			});
			$('#endPage').off().on('click',function(e) {
				var page = $('#pageCount').text() == 0 ? 1 : $('#pageCount').text();
				TableUtils.tableCreateUtils(page,10,obj,heads,headsData,url,classId);
				$('.pagination li').removeClass("active");
				$(this).parent().addClass("active");
			});
			$('.PageNum').off().on('click', function() {
				var page = this.innerHTML;
				console.log("123");
				TableUtils.tableCreateUtils(page,10,obj,heads,headsData,url,classId);
				$('.pagination li').removeClass("active");
				$(this).parent().addClass("active");
			});
		}
		/**设置分页的操作*/
}




