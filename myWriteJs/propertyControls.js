//调色板
$(function(){
	$("#recbox,#WorkspaceBackgroundColor,#listBoxTwoBackgroundColor,#listBoxTwoBoderColor,#listBoxOneBackgroundColor,#listBoxOneBoderColor,#full,#fontColor,#boderColor,#LineColor,#fontShadow,#inputBoderColor,#inputBackgroundColor,#textAreaBoderColor,#textAreaBackgroundColor,#xialaSelectBoderColor,#xialaSelectBackgroundColor,#dateBoxBoderColor,#dateBoxBackgroundColor,#submitBackgroundColor")
	.spectrum({
	    color: "#ffffff",//显示当前选定的颜色
	    flat: false,
	    showInput: true,
	    className: "full-spectrum",
	    showInitial: true,
	    showPalette: true,
	    showSelectionPalette: true,
	    maxPaletteSize: 10,
	    preferredFormat: "hex",
	    move: function (color) {
	        
	    },
	    show: function () {
	    
	    },
	    beforeShow: function () {
	    
	    },
	    hide: function () {
	    
	    },
	    change: function() {
	        
	    },
	    palette: [
	        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
	        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
	        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
	        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
	        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
	        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
	        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
	        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
	        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
	        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
	        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
	        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
	        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
	        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
	    ]
	});	
});

var lastcurrentDragDiv = null;
var xialaOptionList = new Array();
var RadioOptionList = new Array();
var CheckOptionList = new Array();
//当鼠标选定某个控件是初始化属性栏的值
function initPropertySomeMsg(currentName){
	//初始化大小和位置的值
	var DX = $(currentDragDiv).css("left");
	DX = DX.substring(0,DX.length-2);//去除"px"
	var DY = $(currentDragDiv).css("top");
	DY = DY.substring(0,DY.length-2);
	var DW = $(currentDragDiv).css("width");
	DW = DW.substring(0,DW.length-2);
	var DH = $(currentDragDiv).css("height");
	DH = DH.substring(0,DH.length-2);
	
	$("#divX").val(DX);
	$("#divY").val(DY);
	$("#divWidth").val(DW);
	$("#divHeight").val(DH);
	
	//初始化边框的值
	var BD = $(currentDragDiv).children(".selectTag").css("border-width");
	var BS = $(currentDragDiv).children(".selectTag").css("border-style");
	var BC = $(currentDragDiv).children(".selectTag").css("border-color");
	
	$("#boderWidth").val(BD);
	$("#boderStyle").val(BS);
	$("#boderColor").val(BC);
	
	//画板的大小
	$("#WorkspaceHeight").val($("#workSpace").offsetHeight);
	$("#WorkspaceWidth").val($("#workSpace").offsetWidth);
	
	
	
	if(lastcurrentDragDiv != currentDragDiv && currentName == 'xialaSelect'){
		//console.log(currentName);
		$("#itemXiala").children('input').remove();//防止二次进入这个个性设置是有添加到itemOne，进入之前先清空
		$("#itemXiala").children('button').remove();
		
		$('select.xialaselectTag > option').each(function(i){
		 	//console.log( $(this).attr("class"));
			var classStr = $(this).attr("class").substring(12,$(this).attr("class").length);
			//创建一个input并绑定函数
			$("<input>",{'class':'XialainputClass','change':function(){
				$('select.xialaselectTag > option.selectOption'+classStr).text($(this).val());
			}}).val($(this).val()).appendTo($("#itemXiala"));
			//删除条目的按钮
			$('<button>',{'click':function(){
				$('select.xialaselectTag > option.selectOption'+classStr).remove();//去除控件里的选项
				$(event.srcElement).prev(".XialainputClass").remove();//将个性面板中的相应的条目删除
				$(event.srcElement).remove();//把自己也干掉
			}}).text('删除').appendTo($("#itemXiala"));
		});
		//console.log(lis.length);
		lastcurrentDragDiv = currentDragDiv;
	}
	for (var i = 0; i < xialaOptionList.length; i++) {
		//console.log(xialaOptionList[i]);
		var x = i+1;
		$("#optionXiala"+x).val(xialaOptionList[i]);
	}
	
	if(lastcurrentDragDiv != currentDragDiv && currentName == 'Radio'){
		//选定下拉框是初始化
		var LabelList = $(currentDragDiv).children(".selectTag").children("label");
		for (var i = 0; i<LabelList.length;i++) {
			//console.log(OptionList.length);
			RadioOptionList[i] = $(LabelList[i]).text();
		}
		lastcurrentDragDiv = currentDragDiv;
	}
	for (var i = 0; i < RadioOptionList.length; i++) {
		//console.log(RadioOptionList[i]);
		var xx = i+1;
		$("#optionRadio"+xx).val(RadioOptionList[i]);
	}
	
	if(lastcurrentDragDiv != currentDragDiv && currentName == 'CheckBox'){
		//选定下拉框是初始化
		var labelList2 = $(currentDragDiv).children(".selectTag").children("label");
		for (var i = 0; i<labelList2.length;i++) {
			//console.log(OptionList.length);
			CheckOptionList[i] = $(labelList2[i]).text();
		}
		lastcurrentDragDiv = currentDragDiv;
	}
	for (var i = 0; i < CheckOptionList.length; i++) {
		//console.log(RadioOptionList[i]);
		var xxx = i+1;
		$("#optioncheck"+xxx).val(CheckOptionList[i]);
	}
	//处理列表框一的初始化
	//console.log(currentName);
	if(lastcurrentDragDiv != currentDragDiv && currentName == 'ListBoxOne'){
		//console.log(currentName);
		$("#itemOne").children('input').remove();//防止二次进入这个个性设置是有添加到itemOne，进入之前先清空
		$("#itemOne").children('button').remove();
		$('select.listBoxOneinputTag > option').each(function(i){
		 	//console.log( $(this).attr("class"));
			var classStr = $(this).attr("class").substring(16,$(this).attr("class").length);
			//创建一个input并绑定函数
			$("<input>",{'class':'listBoxOneinputClass','change':function(){
				$('select.listBoxOneinputTag > option.listBoxOneOption'+classStr).text($(this).val());
			}}).val($(this).val()).appendTo($("#itemOne"));
			//删除条目的按钮
			$('<button>',{'click':function(){
				$('select.listBoxOneinputTag > option.listBoxOneOption'+classStr).remove();//去除控件里的选项
				$(event.srcElement).prev(".listBoxOneinputClass").remove();//将个性面板中的相应的条目删除
				$(event.srcElement).remove();//把自己也干掉
			}}).text('删除').appendTo($("#itemOne"));
		});
		//console.log(lis.length);
		lastcurrentDragDiv = currentDragDiv;
	}
	if(lastcurrentDragDiv != currentDragDiv && currentName == 'ListBoxTwo'){
		//console.log(currentName);
		$("#itemTwo").children('input').remove();
		$("#itemTwo").children('button').remove();
		$('select.listBoxTwoinputTag > option').each(function(i){
			//console.log($(this).val());
			var classStr = $(this).attr("class").substring(16,$(this).attr("class").length);
			$("<input>",{'class':'listBoxTwoinputClass','change':function(){
				$('select.listBoxTwoinputTag > option.listBoxTwoOption'+classStr).text($(this).val());
				//console.log("选项"+i);
				//console.log($(this).val());
			}}).val($(this).val()).appendTo($("#itemTwo"));
			
			//删除条目的按钮
			$('<button>',{'click':function(){
				$('select.listBoxTwoinputTag > option.listBoxTwoOption'+classStr).remove();//去除控件里的选项
				$(event.srcElement).prev(".listBoxTwoinputClass").remove();//将个性面板中的相应的条目删除
				$(event.srcElement).remove();//把自己也干掉
			}}).text('删除').appendTo($("#itemTwo"));
			
		});
		//console.log(lis.length);
		lastcurrentDragDiv = currentDragDiv;
	}
}

//改变控件的背景颜色
function changeBackgroundColor(){
	//console.log($("#full").val())
	var color = $("#full").val();
	$(currentDragDiv).children(".selectTag").css({"background-color":color});
	if(currentDivArrayList.length>0)
		for(var lx = 0; lx<currentDivArrayList.length;lx++){
			$(currentDivArrayList[lx]).children(".selectTag").css({"background-color":color});
		}
}
//改变控件的背景图案
function changeBackgroundPicture(){
	//console.log($("#picture").val());
}
//改变控件的高度
function changeDivHeight(){
	currentDragDiv.style.height = $("#divHeight").val()+"px";
}
//控件的宽度
function changeDivWidth(){
	currentDragDiv.style.width = $("#divWidth").val()+"px";
}
//控件位置 X
function changeDivX(){
	currentDragDiv.style.left = $("#divX").val()+"px";
}
//Y
function changeDivY(){
	currentDragDiv.style.top = $("#divY").val()+"px";
}
//改变边框的宽度
function changeBoderWidth(){
	//console.log($("#boderWidth").val());
	$(currentDragDiv).children(".selectTag").css({"border-width":$("#boderWidth").val()});
	if(currentDivArrayList.length>0)
			for(var lx = 0; lx<currentDivArrayList.length;lx++){
				$(currentDivArrayList[lx]).children(".selectTag").css({"border-width":$("#boderWidth").val()});
			}
}
//样式
function changeBoderStyle(){
	
	//console.log($("#boderStyle").val());
	$(currentDragDiv).children(".selectTag").css({"border-style":$("#boderStyle").val()});
	if(currentDivArrayList.length>0)
			for(var lx = 0; lx<currentDivArrayList.length;lx++){
				$(currentDivArrayList[lx]).children(".selectTag").css({"border-style":$("#boderStyle").val()});
			}
}
//颜色
function changeBoderColor(){
	//console.log($("#boderColor").val());
	$(currentDragDiv).children(".selectTag").css({"border-color":$("#boderColor").val()});
	if(currentDivArrayList.length>0)
			for(var lx = 0; lx<currentDivArrayList.length;lx++){
				$(currentDivArrayList[lx]).children(".selectTag").css({"border-color":$("#boderColor").val()});
			}
}
/**个性属性**/
//方框
function changeRecBackgroundColor(){
	$(currentDragDiv).css({"background":$("#recbox").val()})
}
//文字大小
function changeFontContent(){
	$(currentDragDiv).children(".selectTag").children(".pP").text($("#fontContent").val());
}
function changeFontSize(){
	$(currentDragDiv).children(".selectTag").children(".pP").css({"font-size":$("#fontSize").val()+"px"});
}
//改变文字颜色
function changeFontColor(){
	$(currentDragDiv).children(".selectTag").children(".pP").css({"color":$("#fontColor").val()});
}
//粗体
var isBold = false;
function changeFontBold(){
	isBold = !isBold;
	if(isBold)
		$(currentDragDiv).children(".selectTag").children(".pP").css({"font-weight":"bold"});
	else
		$(currentDragDiv).children(".selectTag").children(".pP").css({"font-weight":""});
}
//斜体
var isItalic = false;
function changeFontItalic(){
	isItalic = !isItalic;
	if(isItalic)
		$(currentDragDiv).children(".selectTag").children(".pP").css({"font-style":"italic"});
	else
		$(currentDragDiv).children(".selectTag").children(".pP").css({"font-style":""});
}
//直线  的宽度
function changeLineWidth(){
	$(currentDragDiv).children(".selectTag").children(".Hr").css({"boder-width":$("#LineWidth").val()});
}
//直线的样式
function changeLineStyle(){
	$(currentDragDiv).children(".selectTag").children(".Hr").css({"boder-style":$("#LineStyle").val()});
}
//直线的颜色
function changeLineColor(){
	$(currentDragDiv).children(".selectTag").children(".Hr").css({"boder-color":$("#LineColor").val()});
}
//改变输入框控件的名称
function changeInputName(){
	$(currentDragDiv).children(".selectTag").children(".inputName").text($("#inputNameId").val());
}
function changeInputTip(){
	$(currentDragDiv).children(".selectTag").children(".inputOne").attr("placeholder",$("#inputTip").val());
}
//改变输入框的边框样式
function changeInputStyle(){
	$(currentDragDiv).children(".selectTag").children(".inputOne").css({"border-style":$("#inputBoderStyle").val()});
}
function changeInputBoderColor(){
	$(currentDragDiv).children(".selectTag").children(".inputOne").css({"border-color":$("#inputBoderColor").val()});
}
function changeInputBackgroundColor(){
	$(currentDragDiv).children(".selectTag").children(".inputOne").css({"background":$("#inputBackgroundColor").val()});
}
var isPassword = false;
function isPasswordInputmethod(){
	isPassword = !isPassword;
	if(isPassword)
		$(currentDragDiv).children(".selectTag").children(".inputOne").attr("type","password");
	else
		$(currentDragDiv).children(".selectTag").children(".inputOne").attr("type","text");
}
//文本框
function changetextAreaName(){
	$(currentDragDiv).children(".selectTag").children(".textAreaP").text($("#textAreaNameId").val());
}
function changetextAreaTip(){
	$(currentDragDiv).children(".selectTag").children(".textAreaclass").attr("placeholder",$("#textAreaTip").val());
}
//改变输入框的边框样式
function changetextAreaStyle(){
	$(currentDragDiv).children(".selectTag").children(".textAreaclass").css({"border-style":$("#textAreaBoderStyle").val()});
}
function changetextAreaBoderColor(){
	$(currentDragDiv).children(".selectTag").children(".textAreaclass").css({"border-color":$("#textAreaBoderColor").val()});
}
function changetextAreaBackgroundColor(){
	$(currentDragDiv).children(".selectTag").children(".textAreaclass").css({"background-color":$("#textAreaBackgroundColor").val()});
}
function changetextAreaOverflowStyle(){
	$(currentDragDiv).children(".selectTag").children(".textAreaclass").attr("overflow",$("#textAreaOverflowStyle").val());
}
//下拉框的个性设置
function changexialaSelectName(){
	$(currentDragDiv).children(".selectTag").children(".xialaSeclectClass").text($("#xialaSelectNameId").val());
}
function changexialaSelectBoderStyle(){
	$(currentDragDiv).children(".selectTag").children(".xialaselectTag").css({"border-style":$("#ixialaSelectStyle").val()});
}
function changexialaSelectBoderColor(){
	$(currentDragDiv).children(".selectTag").children(".xialaselectTag").css({"border-color":$("#xialaSelectBoderColor").val()});
}
function changexialaSelectBackgroundColor(){
	$(currentDragDiv).children(".selectTag").children(".xialaselectTag").css({"background":$("#xialaSelectBackgroundColor").val()});
}
//添加条目
var xialaAdd = 50;
function addItemXia(){
	xialaAdd++;
	var selectObj = $(currentDragDiv).children(".selectTag").children(".xialaselectTag");
	$('<option>',{'class':'selectOption'+xialaAdd}).appendTo(selectObj);
	//创建一个input并绑定函数
	$("<input>",{'class':'XialainputClass'+xialaAdd,'change':function(){
		var ser = $(event.srcElement).attr('class').substring(15,$(event.srcElement).attr('class').length);
		$('select.xialaselectTag > option.selectOption'+ser).text($(event.srcElement).val());
	}}).appendTo($("#itemXiala"));
	
	//删除条目的按钮
	$('<button>',{'class':'XialabuttonClass'+xialaAdd,'click':function(){
		var ser = $(event.srcElement).attr('class').substring(16,$(event.srcElement).attr('class').length);
		$('select.xialaselectTag > option.selectOption'+ser).remove();//去除控件里的选项
		$(event.srcElement).prev("input").remove();//将个性面板中的相应的条目删除
		$(event.srcElement).remove();//把自己也干掉
	}}).text('删除').appendTo($("#itemXiala"));
	
}
//日期控件的个性
function changedateBoxName(){
	$(currentDragDiv).children(".selectTag").children(".dateBoxlabel").text($("#dateBoxNameId").val());
}
function changedateBoxBoderStyle(){
	$(currentDragDiv).children(".selectTag").children(".dateBoxinput").css({"border-style":$("#dateBoxStyle").val()});
}
function changedateBoxBoderColor(){
	$(currentDragDiv).children(".selectTag").children(".dateBoxinput").css({"border-color":$("#dateBoxBoderColor").val()});
}
function changedateBoxBackgroundColor(){
	$(currentDragDiv).children(".selectTag").children(".dateBoxinput").css({"background":$("#dateBoxBackgroundColor").val()});
}
function changedateBoxContentStyle(){
	$(currentDragDiv).children(".selectTag").children(".dateBoxinput")
		.datepicker('option', 'dateFormat', $(dateContenteStyle).val());
	//为input for date 添加一个属性
	$(currentDragDiv).children(".selectTag").children(".dateBoxinput")
		.attr("dateFormat",$(dateContenteStyle).val())
		
	
}
//二维码
function changeErWeiMaUrl(){
	//console.log($("#erWeiMaUrl").val());
	$(currentDragDiv).children(".selectTag").children(".Img").attr("src",$("#erWeiMaUrl").val());
}
//单选
function changeRadioSelectName(){
	//console.log($(currentDragDiv).children(".selectTag").children(".radioP").text());
	$(currentDragDiv).children(".selectTag").children(".radioP").text($("#Radio1NameId").val())
}
function changeRadioOption1(){
	if($("#optionRadio1").val()!=''){
		RadioOptionList[0] = $("#optionRadio1").val();
		$(currentDragDiv).children(".selectTag").children(".radioLabel1").text(RadioOptionList[0]).show();
		$(currentDragDiv).children(".selectTag").children(".radioInput1").show();
	}else{
		RadioOptionList[0] = null;
		$(currentDragDiv).children(".selectTag").children(".radioLabel1").text("").hide();
		$(currentDragDiv).children(".selectTag").children(".radioInput1").hide();
	}
}
function changeRadioOption2(){
	if($("#optionRadio2").val()!=''){
		RadioOptionList[1] = $("#optionRadio2").val();
		$(currentDragDiv).children(".selectTag").children(".radioLabel2").text(RadioOptionList[1]).show();
		$(currentDragDiv).children(".selectTag").children(".radioInput2").show();
	}else{
		RadioOptionList[1] = null;
		$(currentDragDiv).children(".selectTag").children(".radioLabel2").text("").hide();
		$(currentDragDiv).children(".selectTag").children(".radioInput2").hide();
	}
}
function changeRadioOption3(){
	if($("#optionRadio3").val()!=''){
		RadioOptionList[2] = $("#optionRadio3").val();
		$(currentDragDiv).children(".selectTag").children(".radioLabel3").text(RadioOptionList[2]).show();
		$(currentDragDiv).children(".selectTag").children(".radioInput3").show();
	}else{
		RadioOptionList[2] = null;
		$(currentDragDiv).children(".selectTag").children(".radioLabel3").text("").hide();
		$(currentDragDiv).children(".selectTag").children(".radioInput3").hide();
	}
}
function changeRadioOption4(){
	if($("#optionRadio4").val()!=''){
		RadioOptionList[3] = $("#optionRadio4").val();
		$(currentDragDiv).children(".selectTag").children(".radioLabel4").text(RadioOptionList[3]).show();
		$(currentDragDiv).children(".selectTag").children(".radioInput4").show();
	}else{
		RadioOptionList[3] = null;
		$(currentDragDiv).children(".selectTag").children(".radioLabel4").text("").hide();
		$(currentDragDiv).children(".selectTag").children(".radioInput4").hide();
	}
}
//复选框
function changecheckSelectName(){
		$(currentDragDiv).children(".selectTag").children(".checkBoxP").text($("#checkNameId").val())
}
function changecheckOption1(){
	if($("#optioncheck1").val()!=''){
		CheckOptionList[0] = $("#optioncheck1").val();
		$(currentDragDiv).children(".selectTag").children(".Clabel1").text(CheckOptionList[0]).show();
		$(currentDragDiv).children(".selectTag").children(".checkBox1").show();
	}else{
		CheckOptionList[0] = null;
		$(currentDragDiv).children(".selectTag").children(".Clabel1").text("").hide();
		$(currentDragDiv).children(".selectTag").children(".checkBox1").hide();
	}
}

function changecheckOption2(){
	if($("#optioncheck2").val()!=''){
		CheckOptionList[1] = $("#optioncheck2").val();
		$(currentDragDiv).children(".selectTag").children(".Clabel2").text(CheckOptionList[1]).show();
		$(currentDragDiv).children(".selectTag").children(".checkBox2").show();
	}else{
		CheckOptionList[1] = null;
		$(currentDragDiv).children(".selectTag").children(".Clabel2").text("").hide();
		$(currentDragDiv).children(".selectTag").children(".checkBox2").hide();
	}
}

function changecheckOption3(){
	if($("#optioncheck3").val()!=''){
		CheckOptionList[2] = $("#optioncheck3").val();
		$(currentDragDiv).children(".selectTag").children(".Clabel3").text(CheckOptionList[2]).show();
		$(currentDragDiv).children(".selectTag").children(".checkBox3").show();
	}else{
		CheckOptionList[2] = null;
		$(currentDragDiv).children(".selectTag").children(".Clabel3").text("").hide();
		$(currentDragDiv).children(".selectTag").children(".checkBox3").hide();
	}
}

function changecheckOption4(){
	if($("#optioncheck4").val()!=''){
		CheckOptionList[3] = $("#optioncheck4").val();
		$(currentDragDiv).children(".selectTag").children(".Clabel4").text(CheckOptionList[3]).show();
		$(currentDragDiv).children(".selectTag").children(".checkBox4").show();
	}else{
		CheckOptionList[3] = null;
		$(currentDragDiv).children(".selectTag").children(".Clabel4").text("").hide();
		$(currentDragDiv).children(".selectTag").children(".checkBox4").hide();
	}
}
//提交按钮
function changeSubmitName(){
	$(currentDragDiv).children(".selectTag").children(".submitBtn").val($("#submitNameId").val())
}
function changeSubmitBackgroundColor(){
	$(currentDragDiv).children(".selectTag").children(".submitBtn").css({"background":$("#submitBackgroundColor").val()});
}
//列表框一
function changeListBoxOneName(){
	$(currentDragDiv).children(".selectTag").children(".ListBoxOneName").text($("#ListBoxOneNameId").val())
}
function changelistBoxOneBoderStyle(){
	$(currentDragDiv).children(".selectTag").children(".listBoxOneinputClass").css({"border-style":$("#listBoxOnetStyle").val()})
}
function changelistBoxOneBoderColor(){
	$(currentDragDiv).children(".selectTag").children(".listBoxOneinputClass").css({"border-color":$("#listBoxOneBoderColor").val()})
}
function changelistBoxOneBackgroundColor(){
	$(currentDragDiv).children(".selectTag").children(".listBoxOneinputClass").css({"background-color":$("#listBoxOneBackgroundColor").val()})
}

//列表框二
function changeListBoxTwoName(){
	$(currentDragDiv).children(".selectTag").children(".ListBoxTwoName").text($("#ListBoxTwoNameId").val())
}
function changelistBoxTwoBoderStyle(){
	$(currentDragDiv).children(".selectTag").children(".listBoxTwoinputClass").css({"border-style":$("#listBoxTwoStyle").val()})
}
function changelistBoxTwoBoderColor(){
	$(currentDragDiv).children(".selectTag").children(".listBoxTwoinputClass").css({"border-color":$("#listBoxTwoBoderColor").val()})
}
function changelistBoxTwoBackgroundColor(){
		$(currentDragDiv).children(".selectTag").children(".listBoxTwoinputClass").css({"background-color":$("#listBoxTwoBackgroundColor").val()})
}
//为列表框添加条目
var newStatrOne = 50;//设置一个  设50应该不会重复了 
function addItemOne(){
	newStatrOne++;
	//console.log(newStatrOne);
	var selectObj = $(currentDragDiv).children(".selectTag").children(".listBoxOneinputTag");
	$('<option>',{'class':'listBoxOneOption'+newStatrOne}).appendTo(selectObj);
	//创建一个input并绑定函数
	$("<input>",{'class':'listBoxOneinputClass'+newStatrOne,'change':function(){
		var ser = $(event.srcElement).attr('class').substring(20,$(event.srcElement).attr('class').length);
		$('select.listBoxOneinputTag > option.listBoxOneOption'+ser).text($(event.srcElement).val());
	}}).appendTo($("#itemOne"));


	//删除条目的按钮
	$('<button>',{'class':'listBoxOnebuttonClass'+newStatrOne,'click':function(){
		var ser = $(event.srcElement).attr('class').substring(21,$(event.srcElement).attr('class').length);
		$('select.listBoxOneinputTag > option.listBoxOneOption'+ser).remove();//去除控件里的选项
		$(event.srcElement).prev("input").remove();//将个性面板中的相应的条目删除
		$(event.srcElement).remove();//把自己也干掉
	}}).text('删除').appendTo($("#itemOne"));
}
var  newStatrTwo = 50;
function addItemTwo(){
	newStatrTwo++;
	var selectObj = $(currentDragDiv).children(".selectTag").children(".listBoxTwoinputTag");
	$('<option>',{'class':'listBoxTwoOption'+newStatrTwo}).appendTo(selectObj);
	//创建一个input并绑定函数
	$("<input>",{'class':'listBoxTwoinputClass'+newStatrTwo,'change':function(){
		var ser = $(event.srcElement).attr('class').substring(20,$(event.srcElement).attr('class').length);
		$('select.listBoxTwoinputTag > option.listBoxTwoOption'+ser).text($(event.srcElement).val());
	}}).appendTo($("#itemTwo"));
	//删除条目的按钮
	$('<button>',{'class':'listBoxOnebuttonClass'+newStatrOne,'click':function(){
		var ser = $(event.srcElement).attr('class').substring(21,$(event.srcElement).attr('class').length);
		$('select.listBoxTwoinputTag > option.listBoxTwoOption'+ser).remove();//去除控件里的选项
		$(event.srcElement).prev("input").remove();//将个性面板中的相应的条目删除
		$(event.srcElement).remove();//把自己也干掉
	}}).text('删除').appendTo($("#itemTwo"));
}
//画板设置

function changeWorkspaceHeight(){
	$("#workSpace").css({"height":$("#WorkspaceHeight").val()+"px"});
}

function changeWorkspaceWidth(){
	$("#workSpace").css({"width":$("#WorkspaceWidth").val()+"px"});
}

function changeWorkspaceBackgroundColor(){
	$("#workSpace").css({"background-color":$("#WorkspaceBackgroundColor").val()})
}
function changeWorkspaceBackgroundPicture(){
	if($("#WorkspaceBackgroundPicture").val() =="")
		$("#workSpace").css({"background":"#FFF8DC"})
	else{
		var picurl = null;
		//console.log($("#WorkspaceBackgroundPicture").val());
		if($("#WorkspaceBackgroundPicture").val() !="")
			picurl = "url(./img/"+$('#WorkspaceBackgroundPicture').val()+".jpg)";
		$("#workSpace").css({
			"background-image":picurl,
			"background-repeat":"no-repeat",
			"background-size":"cover"})
	}
}
//默认值得选择   根据传入的当前div (这里一定是传入的div保证程序的通用性)
function changeDefaultContent(){
	var tipText = $(defaultContent).val();
	//console.log($(defaultContent).val());
	switch ($(defaultContent).val()){
		case "currentTime":
			tipText = "当前时间";
			break;
		case "currentDateTime":
			tipText = "当前日期";
			break;
		case "currentUser":
			tipText = "当前用户名";
			break;
		case "currentFullUser":
			tipText = "当前用户全名";
			break;
		case "currentFileSer":
			tipText = "档案号";
			break;
		case "currentTagRefer":
			tipText = "主题词标引";
			break;
		case "currentFormSql":
			tipText = "来自SQL语句";
			break;
		case "currentReferExist":
			tipText = "已经有的录入项";
			displayAllUsedCurrentList($(currentDragDiv).attr("id"));
			break;
		default:
			break;
	}
	if(currentDragDiv!=null)
		$(displayCurrentDivDefault).html("提示：当前控件的默认值为<b>"+tipText+"</b>")
	$(currentDragDiv).children(".selectTag").attr("defaultProerty",$(defaultContent).val());
	
}
//显示出所有的用到的div以便在默认已存在的输入项选择
function displayAllUsedCurrentList(currentId){
	$("#UsedDiv").show();
	//显示所有的用到的div并在其中注入默认的div
	var historyArray = new Array();
	var tagStr = "";
	if(!currentDragDivMap.isEmpty()){
		historyArray = currentDragDivMap.values();
		for(var i = 0;i<historyArray.length;i++){
			if(currentId != $(historyArray[i]).attr("id")){
				//console.log($(historyArray[i]).children(".selectTag").attr("name"));
				tagStr = realName($(historyArray[i]).children(".selectTag").attr("name"));
				//console.log($(historyArray[i]).attr("id"));
				//将这个添加到下拉选择框
				$('<option>').text(tagStr+"ID:"+$(historyArray[i]).attr("id"))
				.val($(historyArray[i]).attr("id")).appendTo($("#UsedSelect"));
			}
			
		}
	}
}
//选择哪个默认已存在的输入项
function changeUsedDiv(){
	//console.log($("#UsedSelect").val());
	var historyArray = new Array();
	if(!currentDragDivMap.isEmpty()){
		historyArray = currentDragDivMap.values();
		for(var i = 0;i<historyArray.length;i++){
			if($("#UsedSelect").val() == $(historyArray[i]).attr("id")){
				//加一个后缀防止和前面的id冲突
				console.log($("#UsedSelect").val());
				$(historyArray[i]).children(".selectTag").attr("linkDivId",$(currentDragDiv).attr("id")+"linkDiv");
				//为当前控件添加一个id属性，以便在显示的时候默认已选项
				$(currentDragDiv).children(".selectTag").attr("id",$(currentDragDiv).attr("id")+"linkDiv");
				//console.log("ok");
			}
		}
	}
}

