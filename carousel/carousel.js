/**
 * Carousel 
 * @author yueyiC
 * @version 1.0.0
 * @Date 2016/6/20
 */
function Carousel($node) {
	this.$carousel= $node.find('.img-ct');
	this.$panel = this.$carousel.find('li');
	this.$pre = $node.find('.pre');
	this.$next =$node.find('.next');
	this.$bullet = $node.find('.bullet li');
	this.$panelCount = this.$panel.length;
	this.$panelWidth = this.$panel.outerWidth(true);
	this.$isAnimate = false;
	this.$curIdx = 0;
	this.init();
}
Carousel.prototype = {
	/**
 	* 初始化carousel
 	*/
	init:function(){
		this.$panel.last().clone().prependTo(this.$carousel);
		this.$panel.first().clone().appendTo(this.$carousel);
		var $panelCurCount = this.$carousel.children().length;
		this.$carousel.css({left:0-this.$panelWidth,width:this.$panelWidth*$panelCurCount});
		this.bind();
		this.autoPlay();
	},
	/**
 	* 绑定切换事件
 	*/
	bind:function(){
		var cur = this;
		cur.$pre.on('click',function(){
			cur.playPre();
		});
		cur.$next.on('click',function(){
			cur.playNext();
		});
		cur.$bullet.on('click',function(){
			var idx = $(this).index();
			idx = idx-cur.$curIdx;
			if(idx>0){
				cur.playNext(idx);
			}else{
				cur.playPre(-idx);
			}
		});
	},
	/**
 	* 向前滑动
 	* @param {int} index
 	*/
	playPre:function(index){
		var cur = this;
		if(cur.$isAnimate) return;
		cur.$isAnimate = true;
		var idx = index || 1;
		cur.$carousel.animate({left:'+='+cur.$panelWidth*idx},function(){
			cur.$curIdx = (cur.$panelCount+cur.$curIdx-idx) % cur.$panelCount;
			if(cur.$curIdx === (cur.$panelCount-1)){
				cur.$carousel.css({left:0-cur.$panelWidth*cur.$panelCount});
			}
			cur.setBullet(cur.$curIdx);
			cur.$isAnimate = false;
		});
	},
	/**
 	* 向后滑动
 	* @param {int} index
 	*/
	playNext:function(index){
		var cur = this;
		if(cur.$isAnimate) return;
		cur.$isAnimate = true;
		var idx = index || 1;
		cur.$carousel.animate({left:'-='+cur.$panelWidth*idx},function(){
			cur.$curIdx = (cur.$curIdx+idx) % cur.$panelCount;
			if(cur.$curIdx === 0){
				cur.$carousel.css({left:0-cur.$panelWidth});
			}
			cur.setBullet(cur.$curIdx);
			cur.$isAnimate = false;
		});
	},
	/**
 	* 设置对应bullet
 	* @param {int} idx
 	*/
	setBullet:function(idx){
		this.$bullet.eq(idx).addClass('active').siblings().removeClass('active');
	},
	/**
 	* 自动播放
 	*/
	autoPlay:function(){
		var cur = this;
		setInterval(function(){
			cur.playNext();
		},2000);
	}
}