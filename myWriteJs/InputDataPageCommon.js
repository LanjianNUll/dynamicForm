var divArrayList = new Array();//存放表单 中的控件
$(document).ready(function(){
	//一开始就加载菜单
	$.ajax({
            type : "POST",  //提交方式  
            url : "/NodeSpark/SystemMaintenance/getAllJsonFile.html",//路径  
            success : function(result) {
            	result = eval("("+result+")");
            	//console.log(result);
            	for(var li = 0; li<result.data.length;li++){
            		console.log(result.data[li]);
            		$("<a>",{'class':'aclass','click':function(){
            			getJsonFile(event);}}).html(result.data[li]+"</br>").appendTo($("#collapseOne").children(".panel-body"));
            	}
            }
	});
});
//获取具体的json文件
function getJsonFile(event){
	var ffileName = $(event.srcElement).text();
	ffileName = ffileName;
	//console.log(ffileName);
	$.ajax({  
            type : "POST",  //提交方式  
            url : "/NodeSpark/SystemMaintenance/getJsonFile.html",//路径  
            data:{
            	"filejsonFileName":ffileName
            },
            success : function(result) {
//          	console.log(result);

				result = eval("("+result+")").data;
				//对接收的数据进行base64解密
				//console.log(result);
				result = utf8to16(base64decode(result));
				console.log(result);
            	displayJson(result);
            	
            }
	});
}
//获取指定的json文件数据
function displayJson(result){
		//处理json数据  这里要注意这个括号的  么有 会报错  具体怎么的大概是因为  json数据有一个括号包起来的缘故吧
		var obj = eval("("+result+")");
		
		//获取版本号
		var version = obj.version;
		//console.log(version);
		//获取创建日期
		var creatDate = obj.creatDate;
		//console.log(creatDate);
		//获取author
		var author = obj.author;
		//console.log(author);
		//获取画布信息
		var canvas = obj.canvas;
		//console.log(canvas.length);
		//console.log(canvas.width);
		//console.log(canvas.background);
		//console.log(canvas.background_picture);
		//画布的初始化
		initCanvas(canvas.width,canvas.height,canvas.background,canvas.background_picture);
		//获取控件数量
		var itemCount = obj.itemCount;
		//console.log(itemCount);
		//获取控件数据
		var domArray = obj.controlDivJsonArray;
		//console.log(domArray.length);
		
		//初始化控件
		initDivMethod(domArray);
}
/*这是json数据的格式 
 * 
 * 
 * {
	"version": "V1.0.0.1",
	"creatDate": "2016.4.9",
	"author": "null",
	"canvas": {
		"length": "500px",
		"width": "500px",
		"background": "#ff000000",
		"background_picture": "bg.png"
	},
	"itemCount": 0,
	"controlDivJsonArray": []//在这里放控件的json数组  
}
*/
//初始化画布
function initCanvas(width,height,background,background_pic){
	//这里的画板  还没定好  毕竟 用户录入界面的需求 还没有  
	//清空画板
	//console.log(width);
	console.log(background);
	$("#canvasBody").children("div").remove();
	//创建画板  这里真是草了狗   传过来的width后面有单位  搞了带单位测试了好久  真是粗心啊
	$("<div>",{'id':'canvasPanl'}).css({
		"position":"absolute",
		"width":width,
		"height":height,"background-color":background,
		"background-image":background_pic,
		"background-repeat":"no-repeat",
		"background-size":"cover"
	}).appendTo($("#canvasBody"));
		
	
//	console.log("宽度："+width);
//	
//	$("#canvasPanl").css({"width":width+"px"});
//	$("#canvasPanl").css({"height":height+"px"});
//	console.log("宽度："+$("#canvasPanl").css("height"));
//	$("#canvasPanl").css({"background-color":background});
//	$("#canvasPanl").css({"background-image":background_pic,
//		"background-repeat":"no-repeat",
//		"background-size":"cover"});
	
	//console.log(background);
}
//前台开始解析控件有关的函数
function initDivMethod(divArray){
	//console.log(divArray);
	for(var dii = 0;dii<divArray.length;dii++){
		//将各个控件的position设置成absolute
		divArray[dii][1].style ="position:absolute;"+ divArray[dii][1].style;
		//console.log(divArray[dii][1].style );
		//将json数组转换成Dom对象
		var Dom = JsonML.toHTML(divArray[dii]);
		//拿到json数据中的控件名称
		var realNameStr = divArray[dii][1].name;
		var defaultproerty = null;
		if(divArray[dii][1].defaultproerty!=null)
			defaultproerty = divArray[dii][1].defaultproerty;
		//console.log(defaultproerty);
		//console.log(realNameStr);
		//分别处理各个不同的控件
		switch (realNameStr){
			case "Rec":
				break;
			case "P":
				break;
			case "Line":
				break;
			case "InputOne":
				dealWithInputOne(Dom,defaultproerty);
				break;
			case "TextArea":
				dealWithTextArea(Dom,defaultproerty);
				break;
			case "xialaSelect":
				break;
			case "ListBoxOne":
				dealWithListBoxOne(Dom,defaultproerty);
				break;
			case "ListBoxTwo":
				dealWithListBoxTwo(Dom,defaultproerty);
				break;
			case "DateBox":
				dealWithDateBox(Dom,defaultproerty);
				break;
			case "fileSelect":
				dealWithfileSelec(Dom,defaultproerty);
				break;
			case "ErWeiMa":
				break;
			case "Radio":
				break;
			case "CheckBox":
				break;
			case "Submit":
				break;
			default:
				break;
		}
		//将控件加入到录入界面的div中
		$(Dom).appendTo("#canvasPanl");
		//存放divArray
		divArrayList.push($(Dom));
	}//for
	initDefalutAction();
}

//初始化控件的默认动作
function initDefalutAction(){
	for(var di = 0 ; di<divArrayList.length; di++){
		if($(divArrayList[di]).attr("linkDivId")!=undefined){
			var tep = divArrayList[di];
			$(tep).children("input").bind("change",function(){
				//console.log("#"+$(this).parent("span").attr("linkDivId"));
				//console.log($("#"+$(this).parent("span").attr("linkDivId")).attr("name"));
				//被这段代码恶心到了 
				$("#"+$(this).parent("span").attr("linkDivId")).children("input").val($(this).val());
			});
		}
	}
}
//创建一个录入数据的输入框
function dealWithDateBox(domObj,defaultvalue){
	//console.log($(domObj).children(".dateBoxinput").attr("class"));
	/**input在包装成datepicker之后会被添加class=“hasDatepicker”，
	你对最后一个tr进行复制，显然已经有这个属性了，之后再调用datepicker()就没有效果了，
	所以要通过html()复制之后立即清空class
	*/
	$(domObj).children(".dateBoxinput").removeClass();
	//console.log($(domObj).children("input").attr("dateformat"));
	//获取日期的格式
	var dateformat = $(domObj).children("input").attr("dateformat");
	$(domObj).children("input").datepicker({//添加日期选择功能
            numberOfMonths:1,//显示几个月  
            showButtonPanel:true,//是否显示按钮面板  
            dateFormat: dateformat,//日期格式  
            clearText:"清除",//清除日期的按钮名称  
            closeText:"关闭",//关闭选择框的按钮名称  
            yearSuffix: '年', //年的后缀  
            showMonthAfterYear:true,//是否把月放在年的后面  
            monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],  
            dayNamesMin: ['日','一','二','三','四','五','六'] 
         });
    //按钮显示现在时间
    $(domObj).children("button").click(function(){
    	//console.log(dateformat[2]);
	  	var d = new Date();
	 	var dStr = d.getFullYear()+dateformat[2]+(d.getMonth()+1)+dateformat[2]+d.getDate();
	 	if(dateformat[2] == "年")
	 		dStr = d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日";
    	$(domObj).children("input").val(dStr)
    });
    
    defaultValueToForm($(domObj).children("input"),defaultvalue);
}
//列表一
function dealWithListBoxOne(domObj,defaultvalue){
	 $(domObj).children("SELECT").change(function(){
    	$(this).prev("input").val($(this).val());
   })
}
//列表框二
function dealWithListBoxTwo(domObj,defaultvalue){
	 $(domObj).children("SELECT").change(function(){
    	$(this).prev("input").val($(this).prev("input").val()+"/"+$(this).val());
   })
}
//输入框
function dealWithInputOne(domObj,defaultvalue){
	defaultValueToForm($(domObj).children("INPUT"),defaultvalue);
}
//文本域框
function dealWithTextArea(domObj,defaultvalue){
	
}
//文件框
function dealWithfileSelec(domObj,defaultvalue){
	
}

/*自动填写的默认值函数
 处理各种默认值得函数 都在这里    这里可能还需要向服务器发送一些请求  比如  用户名 和 文档号之类的*/
function defaultValueToForm(inputDiv,defaultvalue){
	if(defaultvalue != null)
		switch (defaultvalue){
			case "currentTime":
				var d = new Date();
				var dstr = d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
				$(inputDiv).val(dstr);
				break;
			case "currentDateTime":
				var d = new Date();
				var dstr = d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日";
				$(inputDiv).val(dstr);
				break;
			case "currentUser":
			//取到用户名  
				$(inputDiv).val($("#userName"));
				break;
			case "currentFullUser":
			//取到用户的全名
				$(inputDiv).val($("#userFullName"));
				break;
			case "currentFileSer":
				break;
			case "currentTagRefer":
				break;
			case "currentFormSql":
				break;
			case "currentReferExist":
				break;
			default:
				break;
		}
}

//自动绑定的文件



//文件名
var savaFileName = "";
//保存文件录入好的文件
function Save(){
	//打开模态框
	$('#savaModal').modal('show');
	//请求录入数据的分类名
	$.ajax({
		type:"POST",
		url:"/NodeSpark/SystemMaintenance/getJsonCategory.html",
		success: function(jsonFile){
			jsonFile = eval("("+jsonFile+")");
			//console.log(jsonFile.data[0]);
			for(var jsf = 0;jsf < jsonFile.data.length;jsf++){
				$('<option>').text(jsonFile.data[jsf]).appendTo($("#optio"));
			}
			
			
		}
	});
	//自动为用户填上
	//文件序列号 根据时间
	var d = new Date();
	if(savaFileName == "")
		$("#fileName").val(""+d.getFullYear()+d.getMonth()+d.getMinutes()+d.getMilliseconds());
	else
		$("#fileName").val(savaFileName);
	//文件创建时间
	$("#fileCreateDate").val(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate());
	//文件保存路径
	$("#fileCategory").val("默认");
	//作者
	$("#fileAuthor").val($("#userName").text());
	//fileDocmentNumber
	$("#fileDocmentNumber").val("服务器去");
	
	
}
var saveSuccess = false;
function postToService(){
	//关闭模态框
	$('#savaModal').modal('hide');
	/**
	 * h获取保存的文件名
	 * 保存时间
	 * 保存路径
	 * 作者
	 * 文档号
	 */
	var fileName = $("#fileName").val();
	var fileCreateDate = $("#fileCreateDate").val();
	var fileSavaPath = $("#fileCategory").val();
	var fileAuthor = $("#fileAuthor").val();
	var fileDocmentNumber = $("#fileDocmentNumber").val();
	
	//保存的数据
	var docOfCanvas = $("#canvasBody")[0];
	var canvasObj = JsonML.fromHTML(docOfCanvas);
	var canvasJson = JSON.stringify(canvasObj);
	//转换成base64
	var canvasJson = base64encode(utf16to8(canvasJson));
	//console.log(canvasJson);
	//设定一个计时器t2
	t2 = window.setInterval("progressAdd()",500);
	//去掉定时器的方法
	$('#progressDiv').dialog({
      resizable: false,
      height:100,
      modal: true
    });
    //console.log(obj.version);
    //将表单内容发送给服务器
    $.ajax({  
            type : "POST",  //提交方式  
          //  http://localhost:8080/NodeSpark/SystemMaintenance/post_interface.html
            url : "/NodeSpark/SystemMaintenance/post_data.html",//路径  
            //dataType:'jsonp',跨域就加上
            data : {
            	"fileCreateDate":fileCreateDate,
            	"data_class":fileSavaPath,
            	"jsonFileName":fileName,
                "json_data" : canvasJson,
                "fileAuthor":fileAuthor,
                "fileDocmentNumber":fileDocmentNumber
            },//数据，这里使用的是Json格式进行传输
            success : function(result) {//返回数据根据结果进行相应的处理  
            	console.log("服务器返回的值：");
            	console.log(result);
            	result = eval("("+result+")");
            	if(result.data == "success"){
            		//将文件名改回来,方便页面属性中设置
            		savaFileName = "";
            		saveSuccess = true;
					$('#saveSuccess').dialog({
				      resizable: false,
				      height:150,
				      modal: true,
				       buttons: {
				        "确定": function() {
				          $( this ).dialog( "close" );
				          window.clearInterval(t2); 
							$('#progressDiv').dialog("close");
							document.getElementById("porgressBar").style.width= 0 +"%";
							pro = 0;
						  }
			       }
			    });
			   }else{
			   		saveSuccess = false;
			   		 window.clearInterval(t2); 
					$('#progressDiv').dialog("close");
					document.getElementById("porgressBar").style.width= 0 +"%";
					pro = 0;
			   }
            }  
       });  
}
var pro = 0;
//进度条的定时函数
function progressAdd(){
	pro = pro +5 ;
	document.getElementById("porgressBar").style.width= pro+"%";
	if(pro > 100){
		window.clearInterval(t2); 
			$('#progressDiv').dialog("close");
			document.getElementById("porgressBar").style.width= 0 +"%";
			pro = 0;
		if(saveSuccess){//保存成功
			$('#saveSuccess').dialog({
		      resizable: false,
		      height:150,
		      modal: true,
		       buttons: {
		        "确定": function() {
		          $( this ).dialog( "close" );
				  }
	        }
		 });
		}else{
			$('#saveFail').dialog({
		      resizable: false,
		      height:150,
		      modal: true,
		       buttons: {
		        "确定": function() {
		          $( this ).dialog( "close" );
				  }
	        }
		 });
		}
	}
}

