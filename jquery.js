
function jQuery(args){
	this.elements = [];
	switch(typeof args){
		case 'function':
			this.bindEvent(window,'load',args);
		break;
		case 'string':
			switch(args.charAt(0)){
				case '#'://id
					this.getId(args.substring(1));
				break;
				case '.'://class
					this.getClass(document,args.substring(1));
				break;
				default://tag
					this.getTag(document,args);
				break;
			}
		break;
		case 'object':
			this.elements.push(args);
		break;
	}
}
jQuery.prototype.bindEvent=function(obj,events,fn){
	if(obj.addEventListener){
		obj.addEventListener(events,fn,false);
	}else{
		obj.addachEvent('on'+events,fn);
	}
}
/************************************************/
/****************selector start******************/
jQuery.prototype.getId=function(id){
	this.elements.push(document.getElementById(id));
	return this;
}
jQuery.prototype.getClass=function(oParent,className){
	var all=oParent.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		if(all[i].className.match(className)){
			this.elements.push(all[i]);
		}
	}
	return this;
}
jQuery.prototype.getTag=function(oParent,tag){
	var tags=oParent.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
}
jQuery.prototype.css=function(attr,value){
	console.log(this.elements.length)
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
jQuery.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML=str;
	}
	return this;
}
/*****************selector end******************/
/***********************************************/
/***********************************************/
/*****************events start******************/
jQuery.prototype.on=function(events,fn){
	for(var i=0;i<this.elements.length;i++){
		this.bindEvent(this.elements[i],events,fn);
	}
	return this;
}
jQuery.prototype.click=function(fn){
	this.on('click',fn);

	return this;
}
jQuery.prototype.mouseover=function(fn){
	this.on('mouseover',fn);

	return this;
}
jQuery.prototype.mouseout=function(fn){
	this.on('mouseout',fn);

	return this;
}
jQuery.prototype.resize=function(fn){
	this.bindEvent(window,'resize',fn);

	return this;
}
jQuery.prototype.hover=function(over,out){
	this.on('mouseover',over);
	this.on('mouseout',out);

	return this;
}
/******************events end*******************/
/***********************************************/
/***********************************************/
/*****************function start****************/
jQuery.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block'
	}
	return this;
}
jQuery.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none'
	}
	return this;
}
jQuery.prototype.eq=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
jQuery.prototype.first=function(){
	var element=this.elements[0];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
jQuery.prototype.last=function(){
	var element=this.elements[this.elements.length-1];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
jQuery.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className += ' ' + className;
	}
	return this;
}
jQuery.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s+|^)'+className+'(\\s+|$)')))
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s+|^)'+className+'(\\s+|$)'),'');
	}
	return this;
}
jQuery.prototype.center=function(){
	var dom=this.elements[0];
	var width=dom.clientWidth;
	var height=dom.clientHeight;
	var top=(document.body.clientHeight-height)/2;
	var left=(document.body.clientWidth-width)/2;
	dom.style.top=top+'px';
	dom.style.left=left+'px';

	return this;
}
jQuery.prototype.remove=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].remove();
	}

	return this;
}
/****************function end*******************/
/***********************************************/
/***********************************************/
/****************extend start*******************/
$.trim=function(str){
	return str.replace(/^\s+|\s+$/g,'');
}
/****************extend end*********************/
/***********************************************/
function $(args){
	return new jQuery(args);
}
