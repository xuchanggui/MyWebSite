//检查手机号码长度的方法
function checkMobile(){
	var number=document.getElementById("mobile").value;
	//alert("Trims_number======="+Trims(number));
	var len=number.length;
	//alert("len===="+len);
	if(len==0){
		alert("请输入手机号码!");
		 document.getElementById("mobile").value="";
		//document.getElementById("mobile").focus();
		return false;
	}else if(len!=11){
		alert("您输入的手机号码长度有误，请输入正确的号码！");
		 document.getElementById("mobile").value="";
		//document.getElementById("mobile").focus();
		return false;
	}else if(isNaN(number)){
        alert("您的输入的号码有其他字符，请输入正确的手机号码!");
        document.getElementById("mobile").value="";
        //document.getElementById("mobile").focus();
        return false;
	}
}

//验证输入的昵称是否包含空格
 function checkTextSpace(){
 	var username=document.getElementById("username").value;
 	if(username==""){
      //alert("昵称不能为空!");
      //document.getElementById("username").focus();
	  document.getElementById("show_username").style.display="block";
	  document.getElementById("show_username").firstChild.firstChild.innerHTML="昵称不能为空!!";
      return false;
 	}else{
  document.getElementById("show_username").style.display="none";
	}
 	if(username.length>15){
     // alert("昵称长度不能大于15个字符!");
       document.getElementById("username").value="";
      // document.getElementById("username").focus();
	    document.getElementById("show_username").style.display="block";
	   document.getElementById("show_username").firstChild.firstChild.innerHTML="昵称长度不能大于15个字符!!!";
      return false;
 	}else{
		document.getElementById("show_username").style.display="none";
	}
    var reg=/\s/g;
    var alertValue="输入内容包含空格，请出新输入!";
     //temp用来标识内容是否允许存在空格1为可存在0为不存在
/*     if(temp==1){
         reg=/(^\s{5,})|(\s{5,}$)|(\s{5,})/g;
         alertValue="内容中连续输入空格数超过5个,请重新输入！";
     }*/
    if(reg.test(username)){
       // alert(alertValue);
        document.getElementById("username").value="";
        //document.getElementById("username").focus();
			document.getElementById("show_username").style.display="block";
	   document.getElementById("show_username").firstChild.firstChild.innerHTML=alertValue;
        return false;
    }else{
	document.getElementById("show_username").style.display="none";
	}
 }

//检查所在地的代码
 function check_user_location(){
	var user_location=document.getElementById("user_location").value;
	if(user_location==""){
	document.getElementById("show_user_location").style.display="block";
	document.getElementById("show_user_location").firstChild.firstChild.innerHTML="请选择省份!";
	return false;
	}else{
	document.getElementById("show_user_location").style.display="none";
	}
}

//下拉列表框事件
function checkItem(value){
    if(value==""){
    return;
    }
	var city=["成都","郫县","温江","新都"];
	if(value=="四川"){
	    for(var i=0;i<city.length;i++){
			if(i==1){
				document.getElementById("city").add(new Option(city[i],city[i]));
				document.getElementById("city").options[i].selected=true;
			}else{
				document.getElementById("city").add(new Option(city[i],city[i]));
				//alert("默认值=="+document.getElementById("city").options[i].value);
			}
			
		}
		
	}

}

function check_person_description(){
var intro=document.getElementById("intro").value;
	if(intro==""){
	document.getElementById("show_intro").style.display="block";
	document.getElementById("show_intro").firstChild.firstChild.innerHTML="请输入项目简介!";
	return false;
	}else{
document.getElementById("show_intro").style.display="none";
	}
	if(intro.length>75){
	document.getElementById("show_intro").style.display="block";
	document.getElementById("show_intro").firstChild.firstChild.innerHTML="项目简介不能超过75个字!";
	return false;
	}{
	document.getElementById("show_intro").style.display="none";
	}
}

function select_man(){
	document.getElementById("genders").value="1";
}
function select_woman(){
	document.getElementById("genders").value="0";
}
function select_secret(){
	document.getElementById("genders").value="-1";
}