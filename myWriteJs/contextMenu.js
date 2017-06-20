var copyCurrentDivTempName= null;
function openContextMeun() {
    $(currentDragDiv).contextPopup({
      items: [
        {label:'属性',     icon:'img/contextMeunSetting.png',  
        	action:function() { aboutProperty(); } },
        {label:'删除', icon:'img/contextMeunDelete.png',  
        	action:function() { deleteDivAction(); } },
        {label:'复制',         icon:'img/contextMeunCopy.png',  
        	action:function() { copyCurrentDiv(); } },
        {label:'置于顶层',         icon:'img/toTop.png', 
        	action:function() { moveToTop(); } },
      	{label:'上移一层',       icon:'img/toUp.png',   
      	action:function() { moveToUp(); } },
        {label:'置于底层',      icon:'img/toBottom.png',     
        	action:function() { moveToBottom(); } },
		{label:'下移一层',      icon:'img/toDown.png',     
		action:function() { moveToDowm(); } }
      ]
    });
  };
//相关属性窗口
function aboutProperty(){
  	$("#historyAndProperty").slideDown("slow");
}
//删除当前div
function deleteDivAction(){
	//删除提示对话框
	$('#dialog_deleteCurrentDiv').dialog({
      resizable: false,
      height:140,
      modal: true,
      buttons: {
        "确定": function() {
          $( this ).dialog( "close" );
          $(currentDragDiv).remove();
          //将集合中的currentDragDiv删除
		  currentDragDivMap.remove($(currentDragDiv).attr("id"));
		  //console.log(currentDragDivMap.values().length);
        },
        "取消": function() {
          $( this ).dialog( "close" );
        }
      }
    });
 }
//复制当前div
function copyCurrentDiv(){
	if(currentDragDiv!=null){
		copyCurrentDivTempName = $(currentDragDiv).children("span").attr("name");
		//console.log("当前div的name值为："+copyCurrentDivTempName);
	}
}
////克隆一个对象
//function clone(myObj){  
//if(typeof(myObj) != 'object') return myObj;  
//if(myObj == null) return myObj;  
//  
//var myNewObj = new Object();  
//  
//for(var i in myObj)  
//   myNewObj[i] = clone(myObj[i]);  
//  
//return myNewObj;  
//}  
//粘贴当前div
function pasteCurrentDiv(comeForm){
	if(copyCurrentDivTempName!=null){
		//console.log("粘贴");
		isCanCreateChirdren = true;
		switch (copyCurrentDivTempName){
		   	case "Radio":
		   		ww = 180;
		   		hh = 80;
		   		createTag(createRadio());
		   		break;
		   	case "xialaSelect":
		   		ww = 291;
		   		hh = 36;
		   		createTag(createSelect());
		   		break;
			case "InputOne":
					ww = 230;
		   		hh = 30;
					createTag(createInputOne());
		   		break;
			case "Submit":
					ww = 55;
		   		hh = 30;
					createTag(createSubmit());
		   		break;
			case "TextArea":
					ww = 270;
		   		hh = 120;
		   		createTag(createTextArea());
		   		break;
			case "CheckBox":
					ww = 210;
		   		hh = 80;
		   		createTag(createCheckBox());
		   		break;
		   case "P":
		   		ww = 155;
		   		hh = 26;
		   		createTag(createP());
		   		break;
		   	case "Rec":
		   		ww = 120;
		   		hh = 120;
		   		createTag(createRec());
		   		break;
		   	case "Line":
		   		ww =100;
		   		hh = 45;
		   		createTag(createLine());
		   		break;
		   	case "ErWeiMa":
		   		ww=100;
		   		hh=100;
		   		createTag(createErWeiMa());
		   		break;
		   	case "DateBox":
		   		ww = 230;
		   		hh = 30;
		   		createTag(createDateBox());
		   		break;
		   	case "ListBoxOne":
		   		ww = 377;
		   		hh = 90;
		   		createTag(createListBoxOne());
		   		break;
		   	case "ListBoxTwo":
		   		ww = 380;
		   		hh = 40;
		   		createTag(createListBoxTwo());
		   		break;
		   	case "fileSelect":
		   		ww = 294;
		   		hh = 39;
		   		createTag(createfileBox());
		   		break;
		   	default:
		   		break;
		}
	}
	$('#workSpace').trigger(CreateChirdren(event,comeForm));//模拟鼠标点击事件  触发创建新对象函数
}
//移动至最上层
function moveToTop(){
	$(currentDragDiv).css({"z-index":5});
}
//上移一层
function moveToUp(){
	var zIndex =parseInt($(currentDragDiv).css("z-index"));
	$(currentDragDiv).css({"z-index":zIndex+1});
	//console.log($(currentDragDiv).css("z-index"));
}
//移动到最下层
function moveToBottom(){
	$(currentDragDiv).css({"z-index":0});
}
//下移一层
function moveToDowm(){
	var zIndex =parseInt($(currentDragDiv).css("z-index"));
	$(currentDragDiv).css({"z-index":zIndex-1});
	//console.log($(currentDragDiv).css("z-index"));
}
var workspaceItems = [
		{label:'页面属性',     icon:'img/contextMeunProperties.png',
        	action:function() { pageAboutProperty(); } },
        {label:'粘贴', icon:'img/contextMeunPaste.png',  
        	action:function() { pasteCurrentDiv("mouse"); } },
     	 ]
$(function(){
	$("#workSpace").contextPopup({
		items:workspaceItems
	});
});








