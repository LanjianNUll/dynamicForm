//工作区间的边界值，为了判断对齐等操作是否会让表单控件超出区域
var xNum = $("#workSpace").offsetLeft+$("#workSpace").offsetWidth;
var yNum = $("#workSpace").offsetTop+$("#workSpace").offsetHeight;

function leftAlign(){
	/***
	 * 选取第一个为对于标准*
	 * */
	var XLeft =  currentDivArrayList[0].offsetLeft;
	console.log(XLeft);
	for(var x = 1; x<currentDivArrayList.length;x++)
	{
			currentDivArrayList[x].style.left = XLeft + "px";
	}
	removeAllDivBoder();//操作完成，取消边框
}
function rightAlign(){
	/***
	 * 选取第一个为对于标准*
	 * */
	var XLeft =  currentDivArrayList[0].offsetLeft+currentDivArrayList[0].offsetWidth;
	console.log(XLeft);
	for(var x = 1; x<currentDivArrayList.length;x++)
	{
		currentDivArrayList[x].style.left = XLeft - currentDivArrayList[x].offsetWidth+ "px";
	}
	removeAllDivBoder();//操作完成，取消边框
}
//清空工作区
function clearAll(){
	//清除画板
	$('#dialog_clearAllDiv').dialog({
      resizable: false,
      height:140,
      modal: true,
      buttons: {
        "确定": function() {
          $( this ).dialog( "close" );
          $("#workSpace").children().remove();
			currentDragDivMap.clear();
			currentSerialNum = 0;
			currentDragDiv = null;
			isMouseLeftKeyDown = false;
			currentDriection = null;
			keyControlAction = null;
			keyCanMoveDiv = false;
			//清空用到的控件
			disPlayHistory();
		  },
        "取消": function() {
          $( this ).dialog( "close" );
        }
      }
    });
}
//等高
function equalHeight(){
	var XHeight = currentDivArrayList[0].offsetHeight;
	for(var x = 1; x<currentDivArrayList.length;x++)
	{
		currentDivArrayList[x].style.height = XHeight + "px";
	}
	removeAllDivBoder();//操作完成，取消边框
}
//等宽
function equalWidth(){
	var XWidth = currentDivArrayList[0].offsetWidth;
	for(var x = 1; x<currentDivArrayList.length;x++)
	{
		currentDivArrayList[x].style.width = XWidth + "px";
	}
	removeAllDivBoder();//操作完成，取消边框
}
//居中
function centerAlign(){
	
	
	var XCenter = $("#workSpace").width()/2;
	var XCenterLeft = $("#selectTag").width();
	//console.log(XCenterLeft);
	var leftVar ;
	
	if(currentDivArrayList.length == 0){
		leftVar = XCenter - (currentDragDiv.offsetWidth)/2 + XCenterLeft;
		currentDragDiv.style.left = leftVar  + "px";
	}
	for(var x = 0; x<currentDivArrayList.length;x++)
	{
		leftVar = XCenter - (currentDivArrayList[x].offsetWidth)/2 + XCenterLeft;
		currentDivArrayList[x].style.left = leftVar  + "px";
		//console.log(currentDivArrayList[x].style.left);
	}
	removeAllDivBoder();//操作完成，取消边框
}
var r = 1;//缩放比例
var leftOfWorkSpace;
var topOfWorkSpace;
//预览
function previewOtherPage(){
	//避免在用户点击画板是产生行的div
	isCanCreateChirdren = false;
	isPreViewIng = true;
	$("#exitPreViewpage").show();//显示退出预览的按钮
	
//	leftOfWorkSpace = $("#workSpace").offset().left;
//	topOfWorkSpace = $("#workSpace").offset().top;
//	
//	var widthOfWorkSpace = $("#workSpace").width();
//	var heightOfWorkSpace = $("#workSpace").height();
//	console.log(widthOfWorkSpace);
	
	//隐藏其他控件
	$("#selectTag").slideUp("slow");
	$("#top").slideUp("slow");
	$("#historyAndProperty").slideUp("slow");
	$("#afterbody").hide();
	
	$("#topAndSpace").css({"width":"100%","height":"100%"});
	$("#workSpaceBody").css({"width":"100%","height":"100%"});
	
//	var afterWidthOfWorkSpace = $("#workSpace").width();
//	var afterHeightOfWorkSpace = $("#workSpace").height();
//	console.log(afterWidthOfWorkSpace);
//	//缩放比例
//	r = afterWidthOfWorkSpace/widthOfWorkSpace;
//	console.log(r);
	//全屏预览时 控件的缩放  
	for(var ic = 0; ic < currentDragDivMap.values().length; ic++){
//		currentDragDivMap.values()[ic].style.left = 
//					$(currentDragDivMap.values()[ic]).offset().left-leftOfWorkSpace+"px";
//		currentDragDivMap.values()[ic].style.top = 
//					$(currentDragDivMap.values()[ic]).offset().top-topOfWorkSpace+"px";
//					
//		currentDragDivMap.values()[ic].style.width =  $(currentDragDivMap.values()[ic]).width()*r + "px";	
//		currentDragDivMap.values()[ic].style.height =  $(currentDragDivMap.values()[ic]).height()*r + "px";	
		removeBoder(currentDragDivMap.values()[ic]);
		
	}
}
//退出预览
function exitPreViewPage(){
	isPreViewIng = false;
	$("#exitPreViewpage").hide();//隐藏退出预览的按钮
	//隐藏其他控件
	$("#selectTag").slideDown("slow");
	$("#top").slideDown("slow");
	$("#historyAndProperty").slideDown("slow");
	$("#afterbody").show();
	
	$("#topAndSpace").css({"width":"92%","height":"95%"});
	$("#workSpaceBody").css({"width":"100%","height":"90%"});
	
//	for(var ic = 0; ic < currentDragDivMap.values().length; ic++){
//		currentDragDivMap.values()[ic].style.left = 
//					$(currentDragDivMap.values()[ic]).offset().left+leftOfWorkSpace+"px";
//		currentDragDivMap.values()[ic].style.top = 
//					$(currentDragDivMap.values()[ic]).offset().top+topOfWorkSpace+"px";
//					
//		currentDragDivMap.values()[ic].style.width =  $(currentDragDivMap.values()[ic]).width()*(1/r) + "px";	
//		currentDragDivMap.values()[ic].style.height =  $(currentDragDivMap.values()[ic]).height()*(1/r) + "px";
//	}
}
//保存
//文件名
var savaFileName = "";
function saveCurrentDivPage(){
	//打开模态框
	$('#savaModal').modal('show');
	//请求分类名
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
//向服务器提交json及表单属性
var t2;
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
	//将版本之类的信息写入json，以便传给服务器
	obj.version = "V1.0.0.1";
	obj.category = "";
	obj.creatDate = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
	obj.author = $("#userName").text();//获取用户名
	canvasObj.height = $("#workSpace").css("height");
	canvasObj.width =  $("#workSpace").css("width");
	canvasObj.background = $("#workSpace").css("background");
	canvasObj.background_picture = $("#workSpace").css("background-image");
	obj.canvas = canvasObj;
	obj.itemCount = currentDragDivMap.values().length;
	//获取画板控件的json数组
	obj.controlDivJsonArray = getJsonObjArray();
	jsonObj = JSON.stringify(obj);
	//打印json数据
	console.log(JSON.stringify(obj));
	//加密的base564
	jsonObj = base64encode(utf16to8(jsonObj));
	console.log("加密的"+jsonObj);
//	jsonObj = base64decode(jsonObj);
//	console.log("解密的"+jsonObj);
	
	//将json打印到控制台
	//printLog(getJsonObjArray())
	
	//console.log(jsonObj);
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
            url : "/NodeSpark/SystemMaintenance/post_interface.html",//路径  
            //dataType:'jsonp',跨域就加上
            data : {  
            	//"fileDocmentNumber":fileDocmentNumber,
            	//"fileAuthor":fileAuthor,
            	"data_class":fileSavaPath,
            	//"fileCreateDate":fileCreateDate,
            	"jsonFileName":fileName,
            	//"version":	obj.version,
                "json_data" : jsonObj
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
//转换成标准自定义的json格式
function getJsonObjArray(){
	var jsonObjArray = new Array();
	if(currentDragDivMap.values().length!=0){
		for(var divs = 0; divs < currentDragDivMap.values().length;divs++){
			jsonObjArray.push(toJsonObj(currentDragDivMap.values()[divs]));
		}
	}
	return jsonObjArray;
}
//将控件转换成json对象
function toJsonObj(currentObj){
	//获取的jq对象
	var spanObj = $(currentObj).children(".selectTag");
	//将获取的jq对象转成dom对象
	var spanDom = spanObj[0];
	return JsonML.fromHTML(spanDom);
}

//打印数组log的方法
function printLog(arrayList){
	for (var logi = 0 ; logi < arrayList.length;logi++) {
		console.log(JSON.stringify(arrayList[logi]))
	}
}
//json对象格式定义
var canvasObj = new Object();
canvasObj.height = "500px";
canvasObj.width = "500px";
canvasObj.background = "";
canvasObj.background_picture = "bg.png";

var controlJsonArray = new Array();
var obj = new Object();
obj.category = "文档";
obj.version = "V1.0.0.1";
obj.creatDate = "2016.4.9";
obj.author = "null";
obj.canvas = canvasObj;
obj.itemCount = 0;
obj.controlDivJsonArray = controlJsonArray;

//页面属性
function pageAboutProperty(){
	//打开模态框
	$('#pagePropertyModal').modal('show');
	//页面属性要去服务器取得相关的模板  和获取分类名
	//清除子项，
	$("#defaultModal").children().remove();
	$.ajax({
            type : "POST",  //提交方式
            url : "/NodeSpark/SystemMaintenance/getJsonCategory.html",//路径  
            success : function(jsonresult) {
            	jsonresult = eval("("+jsonresult+")");
    			//console.log(jsonFile.data[0]);
    			for(var jsf = 0;jsf < jsonresult.data.length;jsf++){
    				$('<option>').text(jsonresult.data[jsf]).appendTo($("#defaultModalCategory"));
    			}
    			//第一个获取文件列表
    			changeDefaultCategory();
            }
	
	});
}
//改变文件分类是的函数
function changeDefaultCategory(){
	$("#defaultfile").children().remove();
	//console.log($("#defaultModalCategory").val());
	$.ajax({
        type : "POST",  //提交方式
        url : "/NodeSpark/SystemMaintenance/getJsonFileName.html",//路径  
        data:{"catagory":$("#defaultModalCategory").val()},
        success : function(jsonresult) {
        	jsonresult = eval("("+jsonresult+")");
			//console.log(jsonFile.data[0]);
			for(var jsf = 0;jsf < jsonresult.data.length;jsf++){
				$('<option>').text(jsonresult.data[jsf]).appendTo($("#defaultfile"));
			}
        }
});
}
//点击确定
function okPageProperty(){
	//隐藏模态框
	$('#pagePropertyModal').modal('hide');
	savaFileName = $("#pagePropertySaveFileName").val();
	var getJsonModelFileName = $("#defaultfile").val();
	//console.log( $(defaultModal).val());
	//清屏
	$("#workSpace").children().remove();
	currentDragDivMap.clear();//清除画板中所有的元素
	$.ajax({  
            type : "POST",  //提交方式  
            url : "/NodeSpark/SystemMaintenance/getJsonFile.html",//路径  
            data:{
            	"filejsonFileName":getJsonModelFileName
            },
            success : function(result) {
          	
            	result = eval("("+result+")").data;
				//对接收的数据进行base64解密
				result = utf8to16(base64decode(result));
				//console.log(result);
            	displayJsonToWorkSpace(result);
            }
	});
}

//显示模板到workSpace中
function displayJsonToWorkSpace(result){
	//处理json数据
	var obj = eval("("+result+")");
	var domArray = obj.controlDivJsonArray;
	//console.log(obj.canvas.background_picture);
	$("#workSpace").css({
		"background-image":obj.canvas.background_picture,
		"background-repeat":"no-repeat",
		"background-size":"cover"})
	for(var dii = 0;dii<domArray.length;dii++){
		var ddom = JsonML.toHTML(domArray[dii]);
		
		var currentLeft = parseInt($(ddom).css("left").substring(0, $(ddom).css("left").length-2));
		var currentTop = parseInt($(ddom).css("top").substring(0, $(ddom).css("top").length-2)); 
		var currentWidth = parseInt($(ddom).css("width").substring(0, $(ddom).css("width").length-2));
		var currentHeight = parseInt($(ddom).css("height").substring(0, $(ddom).css("height").length-2));
		
		
		//console.log(currentLeft);
		//console.log(currentTop);
		//console.log(currentWidth);
		//console.log(currentHeight);
		ww = currentWidth;
   		hh = currentHeight;
   		var e = new Object();
   		e.clientX = currentLeft;
   		e.clientY = currentTop;
   		//创建一个控件
		createTag($(ddom));
		//将标识设置为可创建
		isCanCreateChirdren = true;
		//模拟鼠标点击创建一个div
		CreateChirdren(e);
		//console.log(dii);
	}
}
//退出表单设计界面
function exitDesginForm(){
	$('#dialog_exit').dialog({
		      resizable: false,
		      height:180,
		      modal: true,
		       buttons: {
		        "继续": function() {
		        	window.location.href="guide.html";
		          	$( this ).dialog( "close" );
				  },
				 "取消": function() {
		          $( this ).dialog( "close" );
				  }
	        }
		 });
}