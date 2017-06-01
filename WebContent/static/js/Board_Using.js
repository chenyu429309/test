/**
 * Massage_In页面的脚本
 */
$(function(){
	//第二个方法，保存所有的数据
	$('.ftb_in_serarch_bo_us').off().on('click',function(){
		board_using.clickFtbBtnSearch(1);
	});
 });
var board_using={
		/**将数字变成三位的字符串*/
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
		/**将数字变成三位的字符串*/
		/**设置分页的操作*/
		pageUtils:function(){
			$('#firstPage').off().on('click', function() {
				board_using.clickFtbBtnSearch(1);
				$(this).parent().nextAll().removeClass("active");
				$(this).parent().addClass("active");
			});
			$('#endPage').off().on('click',function(e) {
				var page = $('#pageCount').text() == 0 ? 1 : $('#pageCount').text();
				board_using.clickFtbBtnSearch(page);
				$(this).parent().nextAll().removeClass("active");
				$(this).parent().addClass("active");
			});
			$('.PageNum').off().on('click', function() {
				var page = this.innerHTML;
				board_using.clickFtbBtnSearch(page);
				$('.PageNum').parent().nextAll().removeClass("active");
				$(this).parent().addClass("active");
			});
		},
		/**设置分页的操作*/
		/**查询录入信息*/
		clickFtbBtnSearch:function(page){
			var data=new Object();
			var url="data/getTbUseData";
			data.mechine=$('#ftb_project_bo_us').val();
			data.number=parseInt($('#ftb_no_bo_us').val());
			data.line=$('#ftb_line_bo_us').val();
			data.part=$('#ftb_part_bo_us').val();
			if(page==undefined){
				page=0
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
						var heads=["编号","机种","段位","可选线体","橱柜","使用次数","使用线体","操作"];
						var headByJavas=["id","number","mechine","part","line","sideBoard","useNumN"];
						//使用Content--start
						var html = "id";
						var datas = data['recordList'];
						html = "<div><table class='table table-bordered table-sortable' ><thead><tr style='background: Linen;'>";
						for ( var _index=0;_index< heads.length;_index++) {
							html += "<th style='text-align: center;vertical-align: middle;'>" + heads[_index] + "</th>"
						}
						html += "</tr></thead><tbody>";
						if(datas.length>0){
							html +=board_using.createTable(datas,heads,headByJavas);
						}
						html += "</tbody></table></div>";
						console.log(html);
						$('#ftb_in_table_bo_us_tbContent').html(html);
						//使用Content--end
						//使用分页效果--start
						$('#ftb_in_table_bo_us_tbFoot').html(board_using.createFootPage(data));
						//使用分页效果--end
						board_using.pageUtils();
						board_using.controlMethod();
					} 
				}); 
		},
		/**创建表*/
		createTable:function(datas,heads,headByJavas){
			var html="";
			for ( var i in datas) {
				html += "<tr>";
				for ( var _index=1;_index< headByJavas.length;_index++) {
					var colData=datas[i][headByJavas[_index]];
					if(_index==1){
						html +="<td><input type='hidden' value='"+datas[i][headByJavas[0]]+"'>"+board_using.convertNumber(colData)+"</td>";
					}else
						html += "<td style='text-align: center;vertical-align: middle;'>" + colData + "</td>";
				}
				html +='<td><select>'
					if(datas[i]['line']!=null){
						var arr=datas[i]['line'].split(",");
						for(var a_index in arr){
							html +='<option>'+arr[a_index]+'</option>';
						}
					}
				html +='</select></td>';
				html +="<td><a href='#' class='border-using'><i class='icon-pencil'></i>使用</a>"
					+"&nbsp;<span>|</span>&nbsp; <a href='#scrapModal' class='scrapModal' role='button' data-toggle='modal'><i class='icon-remove'></i>报废</a></td>";
				html += "</tr>";
			}
			return html;
		},
		/**创建表*/
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
		/**页面中的使用与报废信息 */
		/**一 ：使用则是 1，使用表加一条记录  2 录用表次数加一 */
		/** 都需要获取页面的信息（录用表的id ，加上使用表相关的信息）*/
		controlMethod:function(){
			//使用表使用按钮确认功能---start
			$(".border-using").off().on('click',function(){
				/**操作和报废一样*/
			   if(confirm("是否继续")){
				 //获取tr元素
					var $tr=$(this).parent().parent();
					var data=new Object();
					//获取tr上的子元素
					var $td=$tr.find('td');
					/**td序列，为了只是方便的获取对应列的值*/
					var headByJavas=["tbNumber","tbMechine","tbPart","tbAvailableLine","tbSideBoard","useNum"];
					/**将前6列分别存入到data中*/
					for(var i in headByJavas){
						/**如果是useNumN*/
						if(headByJavas[i]=='useNum'){
							data[headByJavas[i]]=Number($td[i].innerText)+1;
						}else
							data[headByJavas[i]]=$td[i].innerText;
					}
					/**获取录取时的id */
					data.di_id=$tr.find("input[type='hidden']").val();
					/**获取使用时的线体 */
					data.tbUsingLine=$tr.find("select").val();
					var url="data/saveUseMessage";
					$.ajax({ 
						type:"POST", 
						url:url, 
						dataType:"json",      
						contentType:"application/json",               
						data:JSON.stringify(data), 
						success:function(data){ 
							console.log(data);
							/**操作返回信息*/
							board_using.clickFtbBtnSearch(1);
						} 
					}); 
			   }
			});
			$(".scrapModal").off().on('click',function(){
				//获取tr元素
				var $tr=$(this).parent().parent();
				var data=new Object();
				//获取tr上的子元素
				var $td=$tr.find('td');
				console.log($td);
				var headByJavas=["tbNumber","tbMechine","tbPart","tbAvailableLine","tbSideBoard","useNum"];
				/**将前6列分别存入到data中*/
				for(var i in headByJavas){
					data[headByJavas[i]]=$td[i].innerText;
				}
				/**获取录取时的id */
				data.di_id=$tr.find("input[type='hidden']").val();
				/**获取使用时的线体 */
				data.tbUsingLine=$tr.find("select").val();
				/**将数据对象转成json*/
				$JsonData=JSON.stringify(data)
				sessionStorage.clear();
				sessionStorage.setItem("JsonData", $JsonData);
			});
			$('.scrapModal-modal-body-btn').off().on('click',function(){
				if(confirm("是否继续")){
					/**将json转成数据对象*/
					var data=	eval('('+sessionStorage.getItem("JsonData")+')');
					/**存贮原因属性*/
					data.tbRemark=$('#scrapModal-modal-body-textarea').val();
					data=JSON.stringify(data);
					var url="data/scrapFTB";
					$.ajax({ 
						type:"POST", 
						url:url, 
						dataType:"json",      
						contentType:"application/json",               
						data:data, 
						success:function(data){
							console.log(data);
							/**操作返回信息*/
							$('.scrapModal-modal-header-close').click();
							board_using.clickFtbBtnSearch(1);
						} 
					}); 
				   }
			})
			//使用表使用按钮确认功能---end
		}
		/**页面中的使用与报废信息*/
}