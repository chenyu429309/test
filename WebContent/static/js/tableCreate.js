tableCreate = {
	create : function(heads, pageList) {
		var html = "";
		if(pageList!=null){
		var datas = pageList['recordList'];
		html = "<div><table class='table table-bordered table-sortable' ><thead><tr style='background: Linen;'>";
		for ( var _index in heads) {
			html += "<th style='text-align: center;vertical-align: middle;'>" + heads[_index] + "</th>"
		}
		html += "</tr></thead><tbody>";
		for ( var i in datas) {
			html += "<tr>";
			for ( var _index in heads) {
				html += "<td style='text-align: center;vertical-align: middle;'>" + datas[i][heads[_index]] + "</td>"
			}
			html += "</tr>";
		}
		html += "</tbody></table></div>";
		html += "<div><div class='col-sm-4 text-left sm-center' style='float: left;back;background-color:gary;' >页次：<font> "
				+ pageList['currentPage'] + "</font> /<font id='pageCount'>";
		html += "" + pageList['pageCount']
				+ "</font>&nbsp;页 &nbsp; 每页显示：&nbsp;<font>"
				+ pageList['pageSize']
				+ "&nbsp;条 </font>&nbsp; 总记录数:&nbsp;<font>"
				+ pageList['recordCount'] + "</font>&nbsp;条</div>";
		html += "<div style='float:right;'> <ul class='pagination pagination-sm'>"
				+ " <li><a href='#' id='firstPage' "
				+ "title='FirstPage' style='cursor: hand;'> << </a></li>";
		if (pageList['pageCount'] <= 1) {
			html += "<li><a href='#' class='PageNum'>1</a></li>";
		} else {
			for (var num = pageList['beginPageIndex']; num <= pageList['endPageIndex']; num++) {
				html += "<li><a href='#' class='PageNum'>" + num + "</a></li>";
			}
		}
		html += "<li><a href='#' id='endPage' "
				+ "title='EndPage' style='cursor: hand;'> >> </a></li></ul></div></div>";
		}
		return html;
	},
	createFootPage:function(pageList){
		var html = "<div><div class='col-sm-4 text-left sm-center' style='float: left;back;background-color:gary;' >页次：<font> "
			+ pageList['currentPage'] + "</font> /<font id='pageCount'>";
		html += "" + pageList['pageCount']
				+ "</font>&nbsp;页 &nbsp; 每页显示：&nbsp;<font>"
				+ pageList['pageSize']
				+ "&nbsp;条 </font>&nbsp; 总记录数:&nbsp;<font>"
				+ pageList['recordCount'] + "</font>&nbsp;条</div>";
		html += "<div class='pagination' style='float: right'> <ul class='pagination'>"
				+ " <li><a href=''#' aria-label='Previous' id='firstPage' "
				+ "title='FirstPage' >  " +
						"Previous</a></li>";
		if (pageList['pageCount'] <= 1) {
			html += "<li><a href='#' class='PageNum'>1</a></li>";
		} else {
			for (var num = pageList['beginPageIndex']; num <= pageList['endPageIndex']; num++) {
				html += "<li><a href='#' class='PageNum'>" + num + "</a></li>";
			}
		}
		html += "<li><a href=''#' aria-label='Previous' id='endPage' "
				+ "title='EndPage' >End</a></li></ul></div></div>";
		return html;
	},
	/**
	 * 设置分页的操作，要去什么链接，需要什么参数
	 * 
	 * @param url
	 * @param data
	 */
	pageUtils : function(url, data,contentName) {
		$('td').first().addClass("selected");
		$('#firstPage').off().on('click', function() {
//			sessionStorage.setItem("page", 1);
			data.page = 1;
//			sessionStorage.setItem("page", data.page);
//			$('#firstPage').parent().nextAll().removeClass("active");
//			$(this).parent().addClass("active");
			$.post(url, data, function(res) {
				var heads = res.heads;
				var pageList = res.pageList;
				var html = tableCreate.create(heads, pageList);
				$(''+contentName).html(html);
				tableCreate.pageUtils(url, data,contentName);
			}, 'json');
		});
		$('#endPage').off().on(
				'click',
				function(e) {
					var endPage = $('#pageCount').text() == 0 ? 1 : $(
							'#pageCount').text();
					data.page = endPage;
//					sessionStorage.setItem("page", data.page);
//					$('#endPage').parent().nextAll().removeClass("active");
//					$(this).parent().addClass("active");
					$.post(url, data, function(res) {
						var heads = res.heads;
						var pageList = res.pageList;
						var html = tableCreate.create(heads, pageList);
						$(''+contentName).html(html);
						tableCreate.pageUtils(url, data,contentName);
					}, 'json');
				});
		$('.PageNum').off().on('click', function() {
			//$(this).text()
//			console.error("this  "+ this.innerHTML);//取得当前a标签的值
						data.page = this.innerHTML;
						sessionStorage.setItem("page", data.page );
						$('.PageNum').parent().nextAll().removeClass("active");
						$(this).parent().addClass("active");
						$.post(url, data, function(res) {
							var heads = res.heads;
							var pageList = res.pageList;
							var html = tableCreate.create(heads, pageList);
							$(''+contentName).html(html);
							tableCreate.pageUtils(url, data,contentName);
						}, 'json');
				
		});
	}
}
