function Dialog(){
			this.createDialog();
			this.bind();
		}
Dialog.prototype = {
	defaultOpts: {
		title:'',
		message: '',
		showCancelBtn: true,
		showConfirmBtn: false,
		onCancel: function(){},
		onConfirm:function(){},
		onClose: function(){},
	},
	open: function(opts){
		this.setOpts(opts);
		this.setDialog();
	},
	//传入参数覆盖默认参数
	setOpts:function(opts) {
		if (typeof opts === 'string') {
            this.opts = $.extend({}, this.defaultOpts, {
                message: opts
            });
        } else if (typeof opts === 'object') {
            this.opts = $.extend({}, this.defaultOpts, opts);
        }
	},
	bind:function(){
		var cur= this;
		cur.dialog.find('.close').on('click',function(e){
			e.preventDefault();
			cur.opts.onClose();
			cur.dialog.remove();
		});
		cur.dialog.find('.cancel').on('click',function(e){
			e.preventDefault();
			cur.opts.onCancel();
			cur.dialog.hide();
		});
		cur.dialog.find('.confirm').on('click',function(e){
			e.preventDefault();
			cur.opts.onConfirm();
			cur.dialog.hide();
		});
		this.drag();
	},
	//弹窗拖动
	drag:function(){
		var cur = this.dialog,
		 	clicked = "Nope.",
	        mausx = "0",
	        mausy = "0",
	        winx = "0",
	        winy = "0",
	        difx = mausx - winx,
	        dify = mausy - winy;
        $("html").mousemove(function (event) {
            mausx = event.pageX;
            mausy = event.pageY;
            winx =cur.offset().left;
            winy = cur.offset().top;
            if (clicked == "Nope.") {
                difx = mausx - winx;
                dify = mausy - winy;
            }
            var newx = event.pageX - difx - cur.css("marginLeft").replace('px', '');
            var newy = event.pageY - dify - cur.css("marginTop").replace('px', '');
            cur.css({ top: newy, left: newx });
        });

        cur.mousedown(function (event) {
            clicked = "Yeah.";
        });

        $("html").mouseup(function (event) {

            clicked = "Nope.";
        });
	},
	//创建弹窗
	createDialog: function(){
		var html = '<div class="dialog">' + '<div class="header">'+'<h3></h3>'+'<a class="close" href="#">x</a>'+'</div>'+'<div class="content">'+'<span></span>'+'</div>'+'<div class="footer">'+'<a class="d-btn cancel" href="#">取消</a>'+'<a class="d-btn confirm" href="#">确认</a>'+'</div>'+'</div>';
		this.dialog = $(html);
		$('body').append(this.dialog);
	},
	//设置弹窗样式
	setDialog: function(){
		var $dialog = this.dialog;
		if(!this.opts.title){
			$dialog.find('.header').hide();
		}else{
			$dialog.find('.header').show();
		}
		if(!this.opts.showCancelBtn){
			$dialog.find('.cancel').hide();
		}else {
			$dialog.find('.cancel').show();
		}
		if(!this.opts.showConfirmBtn){
			$dialog.find('.confirm').hide();
		}else{
			$dialog.find('.confirm').show();
		}
		$dialog.find('.header h3').text(this.opts.title);
		$dialog.find('.content').html(this.opts.message);
	}
}