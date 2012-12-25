/* jUnislide 
 * http://codendev.com/
 *
 * Copyright 2012 CodenDev 
 * Released under the GPL3 license
 *
 */
(function($) {

	$.singleton = function(obj, settings) {

		this.$mc = $(obj);

		this.settings = settings;
		
		this.image_width = this.settings.image_width;
		
		this.show = this.settings.show;
		
		this.currentPage = 0;

		this._initialize();

	};

	$.singleton.prototype = {

		_initialize : function() {

			this.$listContainer = this.$mc.find('ul');

			this.$items = this.$listContainer.children('li');

			this.itemCount = this.$items.length;

			this._initListItem();

			if (this.settings.type == 'fixed') {

				this._fixedMath();

			} else {

				this._elasticMath();

				this._elasticBind();

			}

			this._doPageMath();

			this._addNav();

			if (this.settings.pager) {

				this._createPager();

			}
			var ins= this;
			this.$mc.touchwipe({
			     wipeLeft: function() { ins._slideLeft(); },
			     wipeRight: function() { ins._slideRight();; }
			   
			});

		},
		_elasticMath : function() {
			
			var ins= this;

			this.settings.image_width = this.image_width;

			if (ins.$mc.width() < this.settings.show * ins.settings.image_width
					+ this.settings.image_space * this.settings.show) {

				width = Math.round((ins.$mc.width() - this.settings.image_space
						* this.settings.show)
						/ this.settings.show);

				this.settings.image_width = width;

			} else {
				this.settings.image_width = this.image_width;
			}

			show = Math.round(ins.$mc.width() / this.settings.image_width);

			this._setShow(show);

			this.$items.width(this.settings.image_width);
		},

		_setShow : function(show) {

			if (show <= this.itemCount) {

				this.settings.show = this.show;
			} else {

				this.settings.show = this.itemCount;
			}

		},

		_elasticBind : function() {

			var ins = this;

			$(window).bind('resize.jUnislide', function(event) {

				ins._elasticMath();

				ins._doPageMath();
				
				if (ins.settings.pager) {
					
					ins.pager.remove();
					ins._createPager();
				}

				ins._toggleNav();
				
				ins._setPage(0); //Back to page 0

			});
		},
		_fixedMath : function() {
			this.$mc.css({
				width : this.settings.show * this.settings.image_width
			});

		},
		_doPageMath : function() {

			this.pages = Math.ceil(this.itemCount / this.settings.show);

			this.ulWidth = this.pages * this.itemCount
					* this.settings.image_width + this.settings.image_space
					* this.itemCount;

			this.$listContainer.css({
				width : this.ulWidth
			});

		},
		_createPager : function() {

			var ins = this;

			this.pager = $("<ul class='pager'></ul>");

			for ( var i = 0; i < this.pages; i++) {
				if (ins._getDirection() == 'ltr') {
					item = $("<li style='float: left;' index=" + i + ">.</li>");
				} else {
					item = $("<li style='float: right;' index=" + i + ">.</li>");

				}

				this.pager.append(item);

			}
			this.pager.children('li').bind('click.jUnislide', function() {

				value = $(this).attr('index');

				ins._setPage(value);
			});

			this.$mc.append(this.pager);
		},

		_initListItem : function() {

			ins = this;

			this.$items.each(function(obj) {

				if (ins._getDirection() == 'ltr') {
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

		_addNav : function() {

			var ins = this;

			this.$navLeft = $("<span class='left'></span>");
			this.$navRight = $("<span class='right'></span>");
			this.$mc.append(this.$navLeft);
			this.$mc.append(this.$navRight);

			this._toggleNav();

			this.$navLeft.bind('click.jUnislide', function() {
				ins._slideLeft();
			});
			this.$navRight.bind('click.jUnislide', function() {
				ins._slideRight();
			});

		},
		_setPage : function(page) {

			if (this._getDirection() == 'ltr') {
				this.$listContainer.animate({
					marginLeft : this._getMargin(page)
				}, "slow");
			} else {

				this.$listContainer.animate({
					marginRight : this._getMargin(page)
				}, "slow");

			}

			this.currentPage = page;

			this._toggleNav();

		},
		_toggleNav : function() {

			this.$navLeft.show();
			this.$navRight.show();

			if (this.currentPage < 0) {

				this.currentPage = 0;
			}

			if (this.currentPage > this.pages) {

				this.currentPage = this.pages - 1;
			}

			if (this._getDirection() == 'ltr') {
				if (this.currentPage <= 0) {

					this.$navLeft.hide();
				}

				if (this.currentPage >= this.pages - 1) {

					this.$navRight.hide();

				}
			} else {
				if (this.currentPage <= 0) {
					this.$navRight.hide();

				}
				if (this.currentPage >= this.pages - 1) {

					this.$navLeft.hide();
				}

			}

		},

		_getDirection : function() {
			return $(document).children('html').attr('dir') == undefined ? 'ltr'
					: $(document).children('html').attr('dir')

		},
		_getMargin : function(page) {

			if (page == undefined) {

				page = this.currentPage;
			}

			return -(page * this.settings.show * this.settings.image_width + this.settings.image_space
					* page * this.settings.show);

		},

		_slideLeft : function() {

			this.$navRight.show();

			if (this._getDirection() == 'ltr') {

				this.currentPage--;
				this.$listContainer.animate({
					marginLeft : this._getMargin()
				}, "slow");
				if (this.currentPage <= 0) {

					this.$navLeft.hide();
				}

			} else {

				this.currentPage++;
				this.$listContainer.animate({
					marginRight : this._getMargin()
				}, "slow");
				if (this.currentPage >= this.pages - 1) {
					this.$navLeft.hide();
				}

			}

		},

		_slideRight : function() {

			this.$navLeft.show();
			if (this._getDirection() == 'ltr') {

				this.currentPage++;
				this.$listContainer.animate({
					marginLeft : this._getMargin()
				}, "slow");

				if (this.currentPage >= this.pages - 1) {
					this.$navRight.hide();
				}

			} else {

				this.currentPage--;
				this.$listContainer.animate({
					marginRight : this._getMargin()
				}, "slow");
				if (this.currentPage <= 0) {

					this.$navRight.hide();
				}

			}

		}
	};

	$.fn.jUnislide = function(options) {

		{
			var settings = $.extend({
				'image_width' : 135, // Image size
				'show' : 3, // Show the number of images
				'image_space' : 3,
				'pager' : true, // Enable disable pager
				'type' : '_fixed' // Choose the type of carousel
									// _fixed/elastic

			}, options);

			this.each(function() {
				var instance = $.data(this, 'singleton');

				if (!instance) {
					$.data(this, 'singleton', new $.singleton(this, settings));
				}
			});
		}
		return this;

	};
})(jQuery);
