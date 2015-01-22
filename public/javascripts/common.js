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


//检查修改用户资料的表单
function checkForm(){
	for(var i=0;i<document.getElementsByName("sex").length;i++){ 
	if(document.getElementsByName("sex")[i].checked==true){//得到选中的单选按钮如果要得到值 那么可以：

	//alert(document.getElementsByName("sex")[i].value);//弹出选中单选按钮的值

    document.getElementById("genders").value=document.getElementsByName("sex")[i].value;

	} 
	} 
}


//检查密码长度的方法
function checkPassWord(pwd){
	var password=document.getElementById(pwd).value;
	var msg;
	//alert("password======="+password);
	var len=password.length;
	if(len==0){
		msg="请输入密码!";
		document.getElementById(pwd).value="";
		document.getElementById("show_"+pwd).style.display="block";
		document.getElementById("show_"+pwd).firstChild.firstChild.innerHTML=msg;
		//document.getElementById("password").focus();
		return false;
	}else if(len<6||len>16){
		msg="您输入的密码长度有误，密码不能小于六位，同时也不能大于十六位";
		document.getElementById(pwd).value="";
		document.getElementById("show_"+pwd).style.display="block";
		document.getElementById("show_"+pwd).firstChild.firstChild.innerHTML=msg;
		//document.getElementById("password").focus();
		return false;
	}else{
		document.getElementById("show_"+pwd).style.display="none";
		//先检查原始密码是否存在
		if(pwd=="old_pwd"){
		checkPasswordIsExist();
		}	

		return true;
		}
}

//检查密码长度的方法
function check_pwd(pwd){
	//先检查原始密码是否存在
	var password=document.getElementById(pwd).value;
	var msg;
	//alert("password======="+password);
	var len=password.length;
	if(len==0){
		msg="请输入密码!";
		document.getElementById(pwd).value="";
		document.getElementById("show_"+pwd).style.display="block";
		document.getElementById("show_"+pwd).firstChild.firstChild.innerHTML=msg;
		//document.getElementById("password").focus();
		return false;
	}else if(len<6||len>16){
		msg="您输入的密码长度有误，密码不能小于六位，同时也不能大于十六位";
		document.getElementById(pwd).value="";
		document.getElementById("show_"+pwd).style.display="block";
		document.getElementById("show_"+pwd).firstChild.firstChild.innerHTML=msg;
		//document.getElementById("password").focus();
		return false;
	}else{
		document.getElementById("show_"+pwd).style.display="none";
		return true;
	}
}

//检查确认密码长度的方法
function check_confirm_password(){
	var confirm_password=document.getElementById("confirm_password").value;
	var msg;
    var password=document.getElementById("new_pwd").value;
	if(confirm_password!=password){
		msg="两次输入的密码不一致,请重新输入!";
		document.getElementById("confirm_password").value="";
		//document.getElementById("confirm_password").focus();
		document.getElementById("show_confirm_password").style.display="block";
		document.getElementById("show_confirm_password").firstChild.firstChild.innerHTML=msg;
		return false;
	}else{
		document.getElementById("show_confirm_password").style.display="none";
		return true;
	}
}


//异步验证原密码是否正确
function checkPasswordIsExist(){
// alert("mobile===="+$("#mobile").val());
 //alert("old===="+$("#old_pwd").val());
        var params ={
                mobile: $("#mobile").val(),
                password: $("#old_pwd").val()
            };
            $.ajax({
                data: params,
                url: '/checkPasswordIsExist',
                dataType: 'json',
                type:'post',
                async: false,
                cache: false,
                timeout: 5000,
                success: function(data){
                  if(data.error){
                    //alert("data.error"+data.error);
					document.getElementById("show_old_pwd").style.display="block";
					document.getElementById("show_old_pwd").firstChild.firstChild.innerHTML=data.error;
					/* document.getElementById("mobile").value="";*/
					document.getElementById("old_pwd").value="";
                      // document.getElementById("old_pwd").focus();
                       return false;
                  }else{
                  	document.getElementById("show_old_pwd").style.display="none";
                    return true;
                  }
                },
                error: function(jqXHR, textStatus, errorThrown){
					//alert('错误提示:==== ' + textStatus + " " + errorThrown); 
					document.getElementById("show_old_pwd").style.display="block";
					document.getElementById("show_old_pwd").firstChild.firstChild.innerHTML=data.error;
					document.getElementById("old_pwd").value="";
					//document.getElementById("old_pwd").focus();
                    return false;
                }
            });
 }

function check_update_password_form(){
   if(!check_pwd("old_pwd")){
   return false;
   }
      if(!check_pwd("new_pwd")){
   return false;
   }
   if(!check_confirm_password()){
   	return false;
   }
   return true;

}


//图片预览方法
function previewImage(file)
{
  var MAXWIDTH  = 150;
  var MAXHEIGHT = 150;
  var div = document.getElementById('preview');
  if (file.files && file.files[0])
  {
  	var img = document.getElementById('image');
  	var reader = new FileReader();
  	reader.onload = function(evt){
	img.src = evt.target.result;
	}	
  	reader.readAsDataURL(file.files[0]);
  }
  else
  {
    var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
    file.select();
    var src = document.selection.createRange().text;
    var img = document.getElementById('image');
    var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
    div.innerHTML = "<img id=image style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;margin-left:"+rect.left+"px;"+sFilter+src+"\"'>";
  }
  document.getElementById("upload_header").submit();
}

function clacImgZoomParam( maxWidth, maxHeight, width, height ){
	var param = {top:0, left:0, width:width, height:height};
	if( width>maxWidth || height>maxHeight )
	{
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;
		
		if( rateWidth > rateHeight )
		{
			param.width =  maxWidth;
			param.height = Math.round(height / rateWidth);
		}else
		{
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}
	
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}

//检查是否上传图片
function check_image_file(){
var image_file=document.getElementById("image_file").value; 
if(image_file==""){
	document.getElementById("show_image_file").style.display="block";
	document.getElementById("show_image_file").firstChild.firstChild.innerHTML="请先上传图片!";
	return false;
}else{
	document.getElementById("show_image_file").style.display="none";
	return true;
}
}
