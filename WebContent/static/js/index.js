/**
 * index页面的脚本
 */
$(function(){
    			//登陆信息事件---start
    			$('#fat-menu-user').hide();
    			$('.fat-menu-visitor-login-modal-btn').off().on('click',function(){
    				$('#fat-menu-user').show();
    				$('#fat-menu-visitor').hide();
    				$('.fat-menu-visitor-login-modal-close').click();
    			})
    			$('#fat-menu-user-loginOut').off().on('click',function(){
    				$('#fat-menu-user').hide();
    				$('#fat-menu-visitor').show();
    			})
    			//登陆信息事件---end
    			//切换样式事件----start
    			var flag=true;
    			$(".navbar-inner-changeBodyStyle").click(function(){
    				if(flag){
    					$('.content').attr("style","margin-left: 0px;");
    					flag=false;
    				}
    				else{
    					$('.content').removeAttr("style");
    					 flag=true;
    				}
			  });
			//切换样式事件---end
			
			//页面加载事件---start
				//一进页面就加载的事件
    			login.loadWelcome("pageskip/loadWelcome");
    				//点击链接，让pageBody来渲染页面
    			$('.targetUrl').off().on('click',function(){
	    			//菜单点亮事件---start
	    			$('.targetUrl').parent('li').siblings().removeClass("active");
	    			$(this).parent('li').addClass("active").siblings().removeClass("active");
	    			//菜单点亮事件---end
    				var html=$(this).data('url');
    				login.loadWelcome(html);
    			});
    			//页面加载事件---end
    		});
		var login={
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