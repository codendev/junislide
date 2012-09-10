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

		},
		doMath : function() {

			this.pages = Math.ceil(this.itemCount / this.settings.show);

			this.ulWidth = this.pages * this.settings.show
					* this.settings.image_size;

			// alert(this.settings.image_size);

			this.listContainer.css({
				width : this.ulWidth
			});

		},
		initList : function() {

			ins = this;
			this.items.each(function(obj) {
				$(this).css({
					width : ins.settings.image_size,
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
											* this.settings.image_size + this.settings.image_space
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
											* this.settings.image_size + this.settings.image_space
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
			'image_size' : 135,
			'show' : 3,
			'image_space' : 3
		}, options);

		methods.init(this, settings);

	};
})(jQuery);
