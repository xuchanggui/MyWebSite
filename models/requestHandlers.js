      
  var url=require("url");
      fs=require("fs");
      formidable=require("formidable");
function start(response){
	console.log("this start funtion is called");
	var body='<html>'+'<head>'+'<meta http-equiv="Content-Type"  content="text/html;charset=UTF-8"/>'+'</head>'+'<body>'+'<form action="/upload" enctype="multipart/form-data" method="post">'+'<input type="file" name="upload" multiple="multiple">'+'<input type="submit" value="上传文件"/>'+'</form>'+'</body>'+'</html>';
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}
var temp="G:/NodeJs_Runtime/nodejsApp/temp/";
function upload(response,request){	
	console.log("this  upload function is called");
	var form=new formidable.IncomingForm();
	var time=new Date().getTime();
	form.uploadDir="G:/NodeJs_Runtime/nodejsApp/temp"
	console.log("begain to parse");
	form.parse(request,function(error,fields,files){
		console.log("parsing done");
		console.log("files.upload.path======"+files.upload.path);
		console.log("time===="+time);
		fs.renameSync(files.upload.path,temp+time+".jpg");
		response.writeHead(200,{"Content-Type":"text/html"});
	    response.write("received image:<br/>");
	    response.write("<img  src='/show?time="+time+"' width='393' height='436'/>");
	    response.end();
	});
}
function loadPic(response){
	console.log("this  loadPic function is called");
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write("hello loadPic");
	//return "hello loadPic";
	response.end();
}

function show(response,request){
	console.log("request handler 'show' was called.");
	 var arg = url.parse(request.url,true).query;
	 console.log("time==="+arg.time);
	fs.readFile(temp+arg.time+".jpg","binary",function(error,file){
		if(error){
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(error+"\n");
			response.end();

		}else{
			response.writeHead(200,{"Content-Type":"image/jpg"});
			response.write(file,"binary");
			response.end();
		}
	});
}
exports.start=start;
exports.upload=upload;
exports.loadPic=loadPic;
exports.show=show;