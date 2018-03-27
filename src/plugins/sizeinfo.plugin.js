(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		root.RG_SizeInfo = factory(jQuery);
	}
}(this, function($) {

	return function RG_SizeInfo(selector) {
		this.name = 'Size info';
		this.size = { current: 0, total: 0 };

		var self = this;
		var app = null;
		var $body = null;
		var $current = null;
		var $total = null;


		/**
		 * create element
		 */
		function create()
		{
			var str = '<p>Size : <em data-text="currentSize"></em>/<em data-text="totalSize"></em></p>';
			$body.append(str);
			$current = $body.find('[data-text=currentSize]');
			$total = $body.find('[data-text=totalSize]');
		}

		/**
		 * byte to size convert
		 *
		 * @param {Number} bytes
		 * @return {String}
		 */
		function bytesToSize(bytes)
		{
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes === 0) return '0';
			const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];
		}


		/**
		 * init
		 *
		 * @Param {Object} parent
		 */
		this.init = function(parent)
		{
			app = parent;

			if (selector)
			{
				$body = $(selector);
			}
			else
			{
				$body = app.$container.find('.size-info');
			}

			// not found $body element
			if (!$body.length)
			{
				app.plugin.error(name);
			}

			// create elements
			create();

			// set size
			this.size.total = app.options.limitSizeTotal;

			// update size
			this.update();
		};

		/**
		 * update
		 */
		this.update = function()
		{
			$current.text(bytesToSize(this.size.current));
			$total.text(bytesToSize(this.size.total));
		};

		/**
		 * event listener
		 *
		 * @Param {String} type
		 * @Param {*} value
		 */
		this.eventListener = function(type, value)
		{
			switch(type) {
				case 'queue.uploadComplete':
					self.size.current += value.file.size;
					self.update(app.queue.getSize());
					break;

				case 'queue.removeQueue':
					self.size.current = app.queue.getSize();
					self.update();
					break;
			}
		}
	}

}));