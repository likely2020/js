//前台调用
var $=function(_this){
	return new Base(_this);
}
//基础库
function Base(_this){
	//创建一个数组，来保存获取的节点和节点数组
	this.elements=[];
	if(_this){
		this.elements[0]=_this;
	}
}
//获取Id节点
Base.prototype.getId=function(id){
	this.elements.push(document.getElementById(id));
	return this;
};
//获取class节点数组
Base.prototype.getClass=function(className){
	var all=document.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		if(all[i].className==className){
			this.elements.push(all[i]);
		}
	}
	return this;
}
//获取元素节点
Base.prototype.getTagName=function(tag){
	var tags=document.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
};
//设置css or 获取css的value
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			if(typeof window.getComputedStyle!='undefined'){//W3C
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else if(typeof this.elements[i].currentStyle!='undefined'){//IE
				return this.elements[i].currentStyle[attr];
			}
		}
		this.elements[i].style[attr]=value;
	}
	return this;
}
//设置html or 获取html
Base.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML=str;
	}
	return this;
}
//触发点击事件
Base.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	}
	return this;
}
//触发鼠标移入事件
Base.prototype.mouseover=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseover=fn;
	}
	return this;
}
//触发鼠标移出事件
Base.prototype.mouseout=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseout=fn;
	}
	return this;
}
//鼠标移入移出
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseover=over;
		this.elements[i].onmouseout=out;
	}
	return this;
}
//设置显示
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block'
	}
	return this;
}
//设置隐藏
Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none'
	}
	return this;
}
//获取某一个节点
Base.prototype.eq=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
//获取第一个节点
Base.prototype.first=function(){
	var element=this.elements[0];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
//获取最后一个节点
Base.prototype.last=function(){
	var element=this.elements[this.elements.length-1];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
//添加class
Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className += ' ' + className;
	}
	return this;
}
//移除class
Base.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s+|^)'+className+'(\\s+|$)'),'');
	}
	return this;
}
//设置居中
Base.prototype.center=function(){
	var dom=this.elements[0];
	var width=dom.clientWidth;
	var height=dom.clientHeight;
	var top=(document.body.clientHeight-height)/2;
	var left=(document.body.clientWidth-width)/2;
	dom.style.top=top+'px';
	dom.style.left=left+'px';

	return this;
}
//触发浏览器窗口resize
Base.prototype.resize=function(fn){
	window.onresize=fn;

	return this;
}
//移除
Base.prototype.remove=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].remove();
	}

	return this;
}