/* mcarousel 
 * http://codendev.com/
 *
 * Copyright 2012 CodenDev 
 * Released under the GPL3 license
 *
 */
(function($) {

	var methods = {

		init : function(obj, settings) {

			this.mc = obj;

			this.settings = settings;

			this.currentPage = 0;

			this.listContainer = obj.find('ul');

			this.items = this.listContainer.children('li');

			this.itemCount = this.items.length;

			this.initList();

			this.doMath();

			this.addControls();
			
			if(this.settings.pager){
				
				this.addPager();
				
			}
			if(this.settings.type=='fixed'){
				
				this.mc.css({ width:this.settings.show*this.settings.image_width});
				
			}
			

		},
		doMath : function() {

			this.pages = Math.ceil(this.itemCount / this.settings.show);

			this.ulWidth = this.pages * this.settings.show
					* this.settings.image_width;

			// alert(this.settings.image_width);

			this.listContainer.css({
				width : this.ulWidth
			});

		},
		addPager : function() {

			ins = this;
			
			this.pager = $("<ul class='pager'></ul>");
			
			for(var i=0;i<this.pages;i++){
				
				item=$("<li index="+i+">.</li>");
				
				this.pager.append(item);
				
			}
			this.pager.children('li').bind('click.mcarousel', function() {
				
				value=$(this).attr('index');
				
				ins.goPage(value);
			});
			
			this.mc.append(this.pager);
		},
		
		initList : function() {

			ins = this;
			this.items.each(function(obj) {
				$(this).css({
					width : ins.settings.image_width,
					marginRight : ins.settings.image_space
				});
			});
		},

		addControls : function() {

			ins = this;
			this.navLeft = $("<span class='left'></span>");
			this.navRight = $("<span class='right'></span>");
			this.mc.append(this.navLeft);
			this.mc.append(this.navRight);

			this.navLeft.hide();

			this.navLeft.bind('click.mcarousel', function() {
				ins.slideLeft();
			});
			this.navRight.bind('click.mcarousel', function() {
				ins.slideRight();
			});

		},
		goPage : function(page) {
			
			this.listContainer
			.animate(
					{
						marginLeft : -(page
								* this.settings.show
								* this.settings.image_width + this.settings.image_space
								* page
								* this.settings.show)
					}, "slow");
			
			//alert(this.currentPage);
			
			this.currentPage=page;
			
			//alert(this.currentPage);
			this.navLeft.show();
			this.navRight.show();
			if (this.currentPage == 0) {

				this.navLeft.hide();
			}
			if (this.currentPage == this.pages - 1) {

				this.navRight.hide();
			}
			
			
		},
		
		slideLeft : function() {

			if (this.currentPage == 0) {

				this.navLeft.hide();
			} else {
				this.navRight.show();
				this.currentPage--;
				this.listContainer
						.animate(
								{
									marginLeft : -(this.currentPage
											* this.settings.show
											* this.settings.image_width + this.settings.image_space
											* this.currentPage
											* this.settings.show)
								}, "slow");
				if (this.currentPage == 0) {

					this.navLeft.hide();
				}
			}
		},
		slideRight : function() {

			if (this.currentPage == this.pages - 1) {

				this.navRight.hide();
			} else {
				this.navLeft.show();
				this.currentPage++;
				
				this.listContainer
						.animate(
								{
									marginLeft : -(this.currentPage
											* this.settings.show
											* this.settings.image_width + this.settings.image_space
											* this.currentPage
											* this.settings.show)
								}, "slow");

				if (this.currentPage == this.pages - 1) {
					this.navRight.hide();
				}

			}

		}
	};

	$.fn.mcarousel = function(options) {

		var settings = $.extend({
			'image_width' : 135,
			'show' : 3,
			'image_space' : 3,
			'pager':true,
			'type':'fixed'
		}, options);

		methods.init(this, settings);

	};
})(jQuery);
