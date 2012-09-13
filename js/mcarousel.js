/* mCarousel 
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

			if (this.settings.pager) {

				this.addPager();

			}
			if (this.settings.type == 'fixed') {

				this.mc.css({
					width : this.settings.show * this.settings.image_width
				});

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

			for ( var i = 0; i < this.pages; i++) {
				if (ins.direction() == 'ltr') {
					item = $("<li style='float: left;' index=" + i + ">.</li>");
				} else {
					item = $("<li style='float: right;' index=" + i + ">.</li>");

				}

				this.pager.append(item);

			}
			this.pager.children('li').bind('click.mcarousel', function() {

				value = $(this).attr('index');

				ins.goPage(value);
			});

			this.mc.append(this.pager);
		},

		initList : function() {

			ins = this;

			this.items.each(function(obj) {

				if (ins.direction() == 'ltr') {
					$(this).css({
						width : ins.settings.image_width,
						marginRight : ins.settings.image_space,
						float : 'left'
					});
				} else {
					$(this).css({
						width : ins.settings.image_width,
						marginLeft : ins.settings.image_space,
						float : 'right'
					});

				}

			});
		},

		addControls : function() {

			ins = this;
			this.navLeft = $("<span class='left'></span>");
			this.navRight = $("<span class='right'></span>");
			this.mc.append(this.navLeft);
			this.mc.append(this.navRight);
			if (this.direction() == 'ltr')
				this.navLeft.hide();
			else
				this.navRight.hide();

			this.navLeft.bind('click.mCarousel', function() {
				ins.slideLeft();
			});
			this.navRight.bind('click.mCarousel', function() {
				ins.slideRight();
			});

		},
		goPage : function(page) {

			if (this.direction() == 'ltr') {
				this.listContainer.animate({
					marginLeft : this.getMargin(page)
				}, "slow");
			} else {

				this.listContainer.animate({
					marginRight : this.getMargin(page)
				}, "slow");

			}

			this.currentPage = page;

			this.navLeft.show();
			this.navRight.show();

			if (this.direction() == 'ltr') {
				if (this.currentPage == 0) {

					this.navLeft.hide();
				}
				if (this.currentPage == this.pages - 1) {

					this.navRight.hide();
				}
			}else{
				if (this.currentPage == 0) {
					this.navRight.hide();
					
				}
				if (this.currentPage == this.pages - 1) {

					this.navLeft.hide();
				}
				
			}
				

		},

		direction : function() {
			return $(document).children('html').attr('dir') == undefined ? 'ltr'
					: $(document).children('html').attr('dir')

		},
		getMargin : function(page) {

			if (page == undefined) {

				page = this.currentPage;
			}

			return -(page * this.settings.show * this.settings.image_width + this.settings.image_space
					* page * this.settings.show);

		},

		slideLeft : function() {
			{
				this.navRight.show();
				
				if (this.direction() == 'ltr') {
					
					this.currentPage--;
					this.listContainer.animate({
						marginLeft : this.getMargin()
					}, "slow");
					if (this.currentPage == 0) {

						this.navLeft.hide();
					}

				} else {
					
					
					this.currentPage++;
					this.listContainer.animate({
						marginRight : this.getMargin()
					}, "slow");
					if (this.currentPage == this.pages - 1) {
						this.navLeft.hide();
					}

				}

			}
		},

		slideRight : function() {

			{
				this.navLeft.show();	
				if (this.direction() == 'ltr') {

					
					this.currentPage++;
					this.listContainer.animate({
						marginLeft : this.getMargin()
					}, "slow");

					if (this.currentPage == this.pages - 1) {
						this.navRight.hide();
					}

				} else {
					
					this.currentPage--;
					this.listContainer.animate({
						marginRight : this.getMargin()
					}, "slow");
					if (this.currentPage == 0) {

						this.navRight.hide();
					}

				}

			}

		}
	};

	$.fn.mCarousel = function(options) {

		var settings = $.extend({
			'image_width' : 135, // Image size
			'show' : 3, // Show the number of images
			'image_space' : 3,
			'pager' : true, // Enable disable pager
			'type' : 'fixed', // Choose the type of carousel fixed/elastic

		}, options);

		methods.init(this, settings);

	};
})(jQuery);
