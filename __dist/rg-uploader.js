/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n// load modules\nvar Util = __webpack_require__(1);\nvar Queue = __webpack_require__(2);\nvar Uploader = __webpack_require__(6);\nvar Plugin = __webpack_require__(8);\nvar lang = __webpack_require__(4);\n\n/**\n * class RGUploader\n *\n * @param {Object} $con container element\n * @param {Object} options\n */\nwindow.RGUploader = function ($con, options) {\n\tvar _this = this;\n\n\t/**\n  * @var {Object} this.options\n  */\n\tthis.options = $.extend({}, this.defaultOptions, options);\n\tif (options && options.queue) {\n\t\tthis.options.queue = $.extend({}, this.defaultOptions.queue, options.queue);\n\t}\n\n\t/**\n  * event receiver\n  *\n  * @Param {String} type\n  * @Param {*} value\n  */\n\tthis.eventReceiver = function (type, value) {\n\t\tvar eventListener = _this.plugin.eventListener;\n\t\tif (!eventListener || !(typeof eventListener === 'function')) return false;\n\t\teventListener(type, value);\n\t};\n\n\t// check $container element\n\tif (!$con || !$con.length) return;\n\n\t// set container element\n\tthis.$container = $con.eq(0);\n\n\t// init sub modules\n\tthis.plugin = new Plugin(this);\n\tthis.queue = new Queue(this);\n\tthis.uploader = new Uploader(this);\n\n\t// init plugin\n\tthis.plugin.init();\n\n\t// init queue\n\tthis.queue.init();\n\n\t// play init(external)\n\tif (this.options.init) {\n\t\tthis.options.init(this);\n\t}\n};\n\n/**\n * @Var {Object} RGUploader.defaultOptions\n */\nRGUploader.prototype.defaultOptions = {\n\tautoUpload: false,\n\t$externalFileForm: null,\n\tallowFileTypes: ['jpeg', 'png', 'gif'],\n\tlimitSize: 1000000,\n\tlimitSizeTotal: 3000000,\n\tuploadScript: null,\n\tremoveScript: null,\n\teventPrefixName: 'RG-',\n\tsrcPrefixName: '',\n\tqueue: {\n\t\theight: 150,\n\t\tlimit: 10,\n\t\tstyle: 'list',\n\t\tbuttons: [{\n\t\t\tname: 'remove queue',\n\t\t\ticonName: 'close',\n\t\t\tclassName: 'btn-remove-queue',\n\t\t\taction: function action(app, file) {\n\t\t\t\tapp.queue.removeQueue(file.id, false, true);\n\t\t\t}\n\t\t}],\n\t\tdatas: null\n\t},\n\tplugin: [],\n\t// upload parameters filter\n\tuploadParamsFilter: function uploadParamsFilter(res) {},\n\t// upload data filtering\n\tuploadDataFilter: function uploadDataFilter(res) {},\n\t// remove parameters filter\n\tremoveParamsFilter: function removeParamsFilter(res) {},\n\t// remove data filtering\n\tremoveDataFilter: function removeDataFilter(res) {},\n\t// progress upload\n\tuploadProgress: function uploadProgress(response, file) {},\n\t// complete upload\n\tuploadComplete: function uploadComplete(file) {},\n\t// all complete upload\n\tuploadCompleteAll: function uploadCompleteAll(app) {},\n\t// fail upload\n\tuploadFail: function uploadFail(file) {},\n\t// init app\n\tinit: function init(app) {}\n};\n\n/**\n * @Var {Object} RGUploader.util\n */\nRGUploader.prototype.util = Util;\n\n/**\n * @Var {Function} RGUploader.lang\n */\nRGUploader.prototype.lang = lang;\n\n/**\n * @Var {Object} RGUploader.plugins\n */\nRGUploader.prototype.plugins = {};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/rg-Uploader.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/rg-Uploader.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	eval("'use strict';\n\n// Util module\n\nmodule.exports = {\n\n\tname: 'Util',\n\n\t/**\n  * byte to size convert\n  *\n  * @Param {Number} bytes\n  * @Return {String}\n  */\n\tbytesToSize: function bytesToSize(bytes) {\n\t\tvar sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];\n\t\tif (bytes === 0) return '0';\n\t\tvar i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));\n\t\treturn Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];\n\t},\n\n\n\t/**\n  * find DOM\n  *\n  * @Param {Object} $con\n  * @Param {String} key\n  * @Param {String} name\n  * @Return {Object}\n  */\n\tfindDOM: function findDOM($con, key, name) {\n\t\treturn $con.find('[data-' + key + '=' + name + ']');\n\t},\n\n\n\t/**\n  * get unique number\n  *\n  * @Param {int} length\n  * @Return {int}\n  */\n\tgetUniqueNumber: function getUniqueNumber(length) {\n\t\tlength = length || 10;\n\n\t\tvar timestamp = +new Date();\n\t\tvar _getRandomInt = function _getRandomInt(min, max) {\n\t\t\treturn Math.floor(Math.random() * (max - min + 1)) + min;\n\t\t};\n\n\t\tvar ts = timestamp.toString();\n\t\tvar parts = ts.split(\"\").reverse();\n\t\tvar id = \"\";\n\n\t\tfor (var i = 0; i < length; ++i) {\n\t\t\tvar index = _getRandomInt(0, parts.length - 1);\n\t\t\tid += parts[index];\n\t\t}\n\n\t\treturn parseInt(id);\n\t},\n\n\n\t/**\n  * detect touch event\n  *\n  * @Return {Boolean}\n  */\n\tdetectTouchEvent: function detectTouchEvent() {\n\t\treturn 'ontouchstart' in document.documentElement;\n\t},\n\n\n\t/**\n  * reset input[type=file]\n  *\n  * @Param {Object} input\n  */\n\tinputFileReset: function inputFileReset(input) {\n\t\tvar win10ie11 = !!navigator.userAgent.match(/Trident.*rv[ :]?[1-9]{2}\\./);\n\t\tvar ie = navigator.appVersion.indexOf(\"MSIE \") !== -1;\n\t\tvar ie10 = navigator.appVersion.indexOf(\"MSIE 10\") !== -1;\n\n\t\tif (ie10) {\n\t\t\t// is IE10\n\t\t\tinput.type = 'radio';\n\t\t\tinput.type = 'file';\n\t\t} else if (ie || win10ie11) {\n\t\t\t// is IE\n\t\t\tvar orgParent = input.parentNode;\n\t\t\tvar orgNext = input.nextSibling;\n\n\t\t\tvar tmp = document.createElement('form');\n\t\t\ttmp.appendChild(input);\n\t\t\ttmp.reset();\n\n\t\t\torgParent.insertBefore(input, orgNext);\n\t\t} else {\n\t\t\t// etc\n\t\t\tinput.value = '';\n\t\t}\n\t},\n\n\n\t/**\n  * get function return\n  *\n  * @Param {Function} func\n  * @Param {Object} src\n  * @Return {Object}\n  */\n\tgetFunctionReturn: function getFunctionReturn(func, src) {\n\t\tif (!func || !(typeof func === 'function')) return src;\n\t\treturn func(src) || src;\n\t}\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Util.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/Util.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n// load modules\nvar util = __webpack_require__(1);\nvar KeyboardEvent = __webpack_require__(3);\nvar lang = __webpack_require__(4);\nvar template = __webpack_require__(5);\n\nmodule.exports = function Queue(parent) {\n\tvar _this = this;\n\n\t/**\n  * @var {String} this.name\n  */\n\tthis.name = 'Queue';\n\n\t/**\n  * @var {Object} this.options\n  */\n\tthis.options = parent.options.queue;\n\n\t/**\n  * @var {Object} this.items\n  */\n\tthis.items = { ids: [], files: [] };\n\n\t/**\n  * @var {String} this.style\n  */\n\tthis.style = 'list';\n\n\t/**\n  * @var {Object} this.$queue\n  */\n\tthis.$queue = util.findDOM(parent.$container, 'element', 'queue').children('ul');\n\n\t/**\n  * @var {Object} keyboardEvent\n  */\n\tvar keyboardEvent = new KeyboardEvent(parent.options.eventPrefixName, [{ key: 'ctrl', code: 17 }, { key: 'cmd', code: 91 }]);\n\n\t/**\n  * init select queue event\n  *\n  * @Param {Object} $el\n  */\n\tvar initSelectQueueEvent = function initSelectQueueEvent($el) {\n\n\t\tvar handler = 'click';\n\n\t\t// select queue event\n\t\t$el.on(handler, function (e) {\n\t\t\treturn _this.selectQueue($(e.currentTarget).data('id'));\n\t\t});\n\t};\n\n\t/**\n  * create navigation buttons\n  *\n  * @Param {Object} options\n  * @Param {Object} file\n  */\n\tvar createNavigationButtons = function createNavigationButtons(options, file) {\n\t\tif (!options || !options.length) return false;\n\n\t\tvar $buttons = [];\n\t\toptions.forEach(function (item) {\n\n\t\t\tif (!item.name || !item.iconName || !item.action) return;\n\t\t\tif (item.show && item.show(file) === false) return;\n\n\t\t\tvar className = item.className ? ' class=\"' + item.className + '\"' : '';\n\t\t\tvar $item = $('<button type=\"button\" title=\"' + item.name + '\"' + className + '>' + '<i class=\"material-icons\">' + item.iconName + '</i>' + '</button>');\n\t\t\t$item.on('click', function (e) {\n\t\t\t\titem.action(parent, file);\n\t\t\t\te.stopPropagation();\n\t\t\t});\n\n\t\t\t$buttons.push($item);\n\t\t});\n\n\t\treturn $buttons;\n\t};\n\n\t/**\n  * init\n  */\n\tthis.init = function () {\n\t\t// set queue height\n\t\tif (_this.options.height) {\n\t\t\tutil.findDOM(parent.$container, 'comp', 'queue').height(_this.options.height);\n\t\t}\n\n\t\t// set style\n\t\t_this.changeStyle(_this.options.style);\n\n\t\t// import queue datas\n\t\tif (_this.options.datas) {\n\t\t\t_this.import(_this.options.datas);\n\t\t}\n\t};\n\n\t/**\n  * find item\n  *\n  * @Param {int} id\n  * @Return {int}\n  */\n\tthis.findItem = function (id) {\n\t\treturn _this.items.ids.indexOf(Number(id));\n\t};\n\n\t/**\n  * change style\n  *\n  * @Param {String} styleName\n  */\n\tthis.changeStyle = function (styleName) {\n\t\t_this.style = styleName;\n\t\t_this.$queue.removeClass().addClass('style-' + styleName);\n\n\t\t// send event to plugin\n\t\tparent.eventReceiver('queue.changeStyle', { style: styleName });\n\t};\n\n\t/**\n  * import\n  *\n  * @Param {Array|String} src\n  */\n\tthis.import = function (src) {\n\t\tif (!src) return false;\n\n\t\tif (typeof src === 'string') {\n\t\t\t$.get(src, function (res) {\n\t\t\t\tif (typeof res === 'string') {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tres = JSON.parse(res);\n\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\tres = [];\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tres.forEach(function (item) {\n\t\t\t\t\t_this.addComplete(item);\n\t\t\t\t});\n\t\t\t});\n\t\t} else if (src instanceof Array) {\n\t\t\tsrc.forEach(function (item) {\n\t\t\t\t_this.addComplete(item);\n\t\t\t});\n\t\t}\n\t};\n\n\t/**\n  * delete queue\n  *\n  * @Param {Array} ids\n  */\n\tthis.delete = function (ids) {\n\t\tif (!ids || !ids.length) return;\n\n\t\tids.forEach(function (id) {\n\t\t\t_this.removeQueue(id, false, true);\n\t\t});\n\t};\n\n\t/**\n  * select queue\n  *\n  * @Param {number} id\n  */\n\tthis.selectQueue = function (id) {\n\n\t\tvar selectedClassName = 'selected';\n\t\tvar $queues = _this.$queue.children();\n\n\t\tif (id) {\n\t\t\tvar $el = _this.selectQueueElement(id);\n\n\t\t\tif (keyboardEvent.isPressKeyCode) {\n\t\t\t\t$el.toggleClass(selectedClassName);\n\t\t\t} else {\n\t\t\t\tvar isSelected = $el.hasClass(selectedClassName);\n\t\t\t\tvar selectCount = $queues.filter('.' + selectedClassName).length;\n\n\t\t\t\t$queues.removeClass(selectedClassName);\n\n\t\t\t\tif (!isSelected || selectCount > 1) {\n\t\t\t\t\t$el.addClass(selectedClassName);\n\t\t\t\t}\n\t\t\t}\n\t\t} else {\n\t\t\tif ($queues.filter('.' + selectedClassName).length > 0) {\n\t\t\t\t$queues.removeClass(selectedClassName);\n\t\t\t} else {\n\t\t\t\t$queues.addClass(selectedClassName);\n\t\t\t}\n\t\t}\n\n\t\t// send event to plugin\n\t\tparent.eventReceiver('queue.selectQueue', {\n\t\t\t$selectElements: _this.$queue.children('.' + selectedClassName),\n\t\t\t$selectElement: id ? _this.selectQueueElement(id) : $queues.eq(0)\n\t\t});\n\t};\n\n\t/**\n  * select queue element\n  *\n  * @Param {String} id\n  * @Return {Object}\n  */\n\tthis.selectQueueElement = function (id) {\n\t\treturn _this.$queue.children('li[data-id=' + id + ']');\n\t};\n\n\t/**\n  * add queue\n  *\n  */\n\tthis.add = function (file) {\n\t\t// set file values\n\t\tfile.fullSrc = parent.options.srcPrefixName + file.src;\n\n\t\t_this.items.ids.push(Number(file.id));\n\t\t_this.items.files.push(file);\n\t};\n\n\t/**\n  * remove queue\n  *\n  */\n\tthis.remove = function (id) {\n\t\tvar n = _this.findItem(id);\n\t\t_this.items.ids.splice(n, 1);\n\t\t_this.items.files.splice(n, 1);\n\t};\n\n\t/**\n  * add progress queue\n  *\n  * @Param {Object} file\n  */\n\tthis.addProgress = function (file) {\n\t\tvar $item = $(template.loading);\n\t\tvar $removeButton = util.findDOM($item, 'element', 'removeQueue').children('button');\n\n\t\t// add item in queue index\n\t\t_this.add(file);\n\n\t\t// input meta\n\t\t$item.attr('data-id', file.id);\n\t\tutil.findDOM($item, 'text', 'filename').text(file.name);\n\n\t\t// reset percentage\n\t\tutil.findDOM($item, 'element', 'progress').width('0%').find('em').text('0');\n\n\t\t// init remove queue event\n\t\t$removeButton.on('click', function (e) {\n\t\t\tvar id = parseInt($(e.currentTarget).closest('li').data('id'));\n\t\t\t_this.removeQueue(id, true, false);\n\t\t\tparent.uploader.readyItems.forEach(function (item, n) {\n\t\t\t\tif (item.id === id) {\n\t\t\t\t\tparent.uploader.readyItems.splice(n, 1);\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\n\t\t// append element\n\t\t_this.$queue.append($item);\n\n\t\t// send event to plugin\n\t\tparent.eventReceiver('queue.addProgress', { $el: $item, file: file });\n\t};\n\n\t/**\n  * add complete queue\n  *\n  * @Param {Object} file\n  * @Param {Object} $beforeElement\n  */\n\tthis.addComplete = function (file, $beforeElement) {\n\t\tvar id = file.id;\n\t\tvar $el = $(template.complete);\n\n\t\t// set elements in queue\n\t\tvar $previewImages = util.findDOM($el, 'element', 'previewImage');\n\t\tvar $customButtons = util.findDOM($el, 'element', 'customButtons');\n\t\tvar $fileType = util.findDOM($el, 'text', 'filetype');\n\t\tvar $fileName = util.findDOM($el, 'text', 'filename');\n\t\tvar $state = util.findDOM($el, 'text', 'state');\n\t\tvar $fileSize = util.findDOM($el, 'text', 'filesize');\n\n\t\t// add queue index\n\t\t_this.add(file);\n\n\t\t// set queue id\n\t\t$el.attr('data-id', id);\n\n\t\t// insert queue data\n\t\t$fileType.text(file.type);\n\t\t$fileName.text(file.name);\n\t\t$state.text('uploaded');\n\t\t$fileSize.text(file.size ? util.bytesToSize(file.size) : 'none');\n\t\t$customButtons.html('');\n\n\t\t// check image and assign preview background\n\t\tif (file.type.split('/')[0] === 'image') {\n\t\t\t$previewImages.css('background-image', 'url(' + file.fullSrc + ')');\n\t\t}\n\n\t\t// set toggle select event\n\t\tinitSelectQueueEvent($el);\n\n\t\t// create queue navigation buttons\n\t\tvar $buttons = createNavigationButtons(_this.options.buttons, file);\n\t\tif ($buttons.length) {\n\t\t\t$customButtons.append($buttons);\n\t\t}\n\n\t\t// append queue\n\t\tif ($beforeElement && $beforeElement.length) {\n\t\t\t$beforeElement.after($el);\n\t\t} else {\n\t\t\t_this.$queue.append($el);\n\t\t}\n\n\t\t// send event to plugin\n\t\tparent.eventReceiver('queue.uploadComplete', {\n\t\t\t$selectElement: $el,\n\t\t\tid: id,\n\t\t\tfile: file\n\t\t});\n\t};\n\n\t/**\n  * add error queue\n  *\n  * @Param {Object} file\n  * @Param {Object} $beforeElement\n  */\n\tthis.addError = function (file, $beforeElement) {\n\t\tvar id = file.id;\n\t\tvar $el = $(template.error);\n\n\t\tvar $fileType = util.findDOM($el, 'text', 'filetype');\n\t\tvar $fileName = util.findDOM($el, 'text', 'filename');\n\t\tvar $state = util.findDOM($el, 'text', 'state');\n\n\t\t// add queue index\n\t\t_this.add(file);\n\n\t\t// set queue id\n\t\t$el.attr('data-id', id);\n\n\t\t$fileType.text(file.type);\n\t\t$fileName.text(file.name);\n\t\t$state.text(file.message);\n\n\t\t// append error queue\n\t\tif ($beforeElement && $beforeElement.length) {\n\t\t\t$beforeElement.after($el);\n\t\t} else {\n\t\t\t_this.$queue.append($el);\n\t\t}\n\n\t\tsetTimeout(function () {\n\t\t\t_this.removeQueue(id, false, false);\n\t\t}, 3000);\n\t};\n\n\t/**\n  * remove queue\n  *\n  * @Param {int} id\n  * @Param {Boolean} isLoadingQueue\n  * @Param {Boolean} useScript\n  */\n\tthis.removeQueue = function (id, isLoadingQueue, useScript) {\n\n\t\tvar self = _this;\n\t\tvar removeElement = function removeElement(id) {\n\t\t\t_this.selectQueueElement(id).fadeOut(400, function () {\n\t\t\t\t$(this).remove();\n\t\t\t\tself.remove(id);\n\t\t\t\tparent.eventReceiver('queue.removeQueue', {});\n\t\t\t});\n\t\t};\n\n\t\tif (isLoadingQueue) {\n\t\t\t_this.selectQueueElement(id).filter('.loading').remove();\n\n\t\t\t// send event to plugin\n\t\t\tparent.eventReceiver('queue.removeQueue', {});\n\t\t} else {\n\t\t\tvar file = _this.items.files[_this.findItem(id)];\n\n\t\t\tif (file < 0) {\n\t\t\t\tconsole.error('Not found queue id');\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tif (useScript && parent.options.removeScript && !file.isLocalFile) {\n\t\t\t\t// remove parameters filter\n\t\t\t\tfile = util.getFunctionReturn(parent.options.removeParamsFilter, file);\n\n\t\t\t\t// play remove file script\n\t\t\t\t$.post(parent.options.removeScript, file, function (res, state) {\n\t\t\t\t\tif (typeof res === 'string') {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tres = JSON.parse(res);\n\t\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\t\tres = { state: 'error', response: res };\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// filtering response\n\t\t\t\t\tres = util.getFunctionReturn(parent.options.removeDataFilter, res);\n\n\t\t\t\t\t// act\n\t\t\t\t\tif (res && res.state && res.state === 'success') {\n\t\t\t\t\t\tremoveElement(id);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tconsole.error(res.response);\n\t\t\t\t\t\talert(lang('error_remove_error'));\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\tremoveElement(id);\n\t\t\t}\n\t\t}\n\t};\n\n\t/**\n  * updare queue\n  *\n  * @Param {Object} res\n  */\n\tthis.updateProgress = function (res) {\n\t\tvar $el = _this.$queue.children('li[data-id=' + res.id + ']');\n\t\tvar $progress = util.findDOM($el, 'element', 'progress');\n\t\tvar percent = parseInt(res.data.loaded / res.data.total * 100);\n\t\t$progress.width(percent + '%').find('em').text(percent);\n\n\t\tparent.eventReceiver('queue.updateProgress', {\n\t\t\t$selectElement: $el,\n\t\t\tid: res.id,\n\t\t\tloaded: res.data.loaded,\n\t\t\ttotal: res.data.total\n\t\t});\n\t};\n\n\t/**\n  * upload result\n  *\n  * @Param {String} state (success|error)\n  * @Param {Object} file\n  */\n\tthis.uploadResult = function (state, file) {\n\t\tif (!state) return false;\n\t\tvar $loading = _this.selectQueueElement(file.id);\n\t\t_this.remove(file.id);\n\t\tswitch (state) {\n\t\t\tcase 'success':\n\t\t\t\t_this.addComplete(file, $loading);\n\t\t\t\tbreak;\n\t\t\tcase 'error':\n\t\t\t\t_this.addError(file, $loading);\n\t\t\t\tbreak;\n\t\t}\n\t\t_this.removeQueue(file.id, true);\n\t};\n\n\t/**\n  * get files size (total)\n  *\n  * @Return {int}\n  */\n\tthis.getSize = function () {\n\t\tvar size = 0;\n\t\t_this.items.files.forEach(function (item) {\n\t\t\tsize += item.size;\n\t\t});\n\t\treturn size;\n\t};\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Queue.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/Queue.js?");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	eval("'use strict';\n\n/**\n * create key code object\n * make keylist to keycode object\n *\n * @Param {Array} list\n * @Return {Object}\n */\nvar createKeyCodeObject = function createKeyCodeObject(list) {\n\tvar result = {};\n\tlist = list || [];\n\n\tlist.forEach(function (item) {\n\t\tif (!item.key || !item.code) return false;\n\t\tresult[item.key] = item.code;\n\t});\n\n\treturn result;\n};\n\n/**\n * Keyboard Event\n *\n * @Param {String} eventPrefix\n * @Param {Array} keyList\n */\nmodule.exports = function (eventPrefix, keyList) {\n\tvar _this = this;\n\n\t/**\n  * @Const {String} EVENT_PREFIX\n  */\n\tvar EVENT_PREFIX = eventPrefix;\n\n\t/**\n  * @Const {Object} KEY_CODE\n  */\n\tvar KEY_CODE = createKeyCodeObject(keyList);\n\n\t/**\n  * @Var {int} pressKeyCode\n  */\n\tthis.pressKeyCode = null;\n\n\t/**\n  * @Var {Boolean} isPressKeyCode\n  */\n\tthis.isPressKeyCode = false;\n\n\t/**\n  * key down event\n  *\n  * @Param {Object} e\n  */\n\tvar keyDown = function keyDown(e) {\n\t\t_this.pressKeyCode = e.keyCode;\n\t\t_this.isPressKeyCode = e.keyCode === KEY_CODE.ctrl || e.keyCode === KEY_CODE.cmd;\n\n\t\t// set event\n\t\t$(window).off('keydown.' + EVENT_PREFIX).on('keyup.' + EVENT_PREFIX, keyUp);\n\t};\n\n\t/**\n  * key up event\n  *\n  * @Param {Object} e\n  */\n\tvar keyUp = function keyUp(e) {\n\t\t_this.pressKeyCode = null;\n\t\t_this.isPressKeyCode = false;\n\n\t\t// set event\n\t\t$(window).off('keyup.' + EVENT_PREFIX).on('keydown.' + EVENT_PREFIX, keyDown);\n\t};\n\n\t// init event\n\t$(window).on('keydown.' + EVENT_PREFIX, keyDown);\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/KeyboardEvent.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/KeyboardEvent.js?");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	eval("'use strict';\n\nvar dic = {\n\tko: {\n\t\terror_add_upload: '업로드가 끝난후에 추가해주세요.',\n\t\terror_upload_limit: '파일은 총 {0}개까지 업로드할 수 있습니다.',\n\t\terror_limit_size: '업로드할 수 있는 용량이 초과되었습니다.',\n\t\terror_limit_size2: '파일용량을 초과한 파일은 제외됩니다.',\n\t\terror_file_type: '잘못된 형식의 파일입니다.',\n\t\terror_check_file: '허용되지 않는 파일은 제외됩니다.',\n\t\terror_not_upload_file: '업로드할 파일이 없습니다.',\n\t\terror_remove_error: '파일삭제 오류'\n\t},\n\ten: {\n\t\terror_add_upload: 'Please add after upload.',\n\t\terror_upload_limit: 'Files can be uploaded to a total of {0}.',\n\t\terror_limit_size: 'The capacity that can be uploaded has been exceeded.',\n\t\terror_limit_size2: 'Files exceeding the file capacity are excluded.',\n\t\terror_file_type: 'Invalid file.',\n\t\terror_check_file: 'Do not allow files are excluded.',\n\t\terror_not_upload_file: 'There are no files to upload.',\n\t\terror_remove_error: 'Deleting file error'\n\t}\n};\n\n/**\n * string format\n * http://stackoverflow.com/a/4673436\n *\n * @Param {String} str\n * @Param {Array} args\n * @Return {String}\n */\nfunction stringFormat(str, args) {\n\treturn str.replace(/{(\\d+)}/g, function (match, number) {\n\t\treturn typeof args[number] !== 'undefined' ? args[number] : match;\n\t});\n}\n\n// export\nmodule.exports = function (code, values) {\n\tvar lang = $('html').attr('lang') || 'ko';\n\tvar str = dic[lang][code] || '';\n\n\t// assign values\n\tstr = values && values.length ? stringFormat(str, values) : str;\n\n\treturn str;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Language.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/Language.js?");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	eval("'use strict';\n\nmodule.exports = {\n\tloading: '' + '<li class=\"loading ready\">' + '<div class=\"wrap\">' + '<figure class=\"col not-image\">' + '<p data-element=\"progress\" style=\"width: 40%;\">' + '<span><em>40</em>%</span>' + '</p>' + '</figure>' + '<div class=\"col bar\">' + '<p data-element=\"progress\" style=\"width: 30%;\">' + '<span><em>30</em>%</span>' + '</p>' + '</div>' + '<div class=\"col bd\">' + '<span class=\"name\" data-text=\"filename\">filename.jpg</span>' + '<hr>' + '<span class=\"state\" data-text=\"state\">ready</span>' + '</div>' + '<nav class=\"col\" data-element=\"removeQueue\">' + '<button type=\"button\" title=\"remove queue\"><i class=\"material-icons\">close</i></button>' + '</nav>' + '</div>' + '</li>',\n\terror: '' + '<li class=\"error\">' + '<div class=\"wrap\">' + '<figure class=\"col not-image\"></figure>' + '<div class=\"col bd\">' + '<span class=\"filetype bracket large\" data-text=\"filetype\">image/jpg</span>' + '<span class=\"name\" data-text=\"filename\">filename.jpg</span>' + '<hr>' + '<span class=\"state\" data-text=\"state\">upload fail</span>' + '</div>' + '</div>' + '</li>',\n\tcomplete: '' + '<li class=\"complete\">' + '<div class=\"wrap\">' + '<figure class=\"col\" data-element=\"previewImage\" data-text=\"filename\">filename.jpg</figure>' + '<div class=\"col bd\">' + '<span class=\"filetype bracket large\" data-text=\"filetype\">image/jpg</span>' + '<span class=\"name\" data-text=\"filename\">filename.jpg</span>' + '<hr>' + '<span class=\"state\" data-text=\"state\">uploaded</span>' + '<span class=\"size bracket\" data-text=\"filesize\">123.43kb</span>' + '</div>' + '<nav class=\"col\" data-element=\"customButtons\"></nav>' + '</div>' + '</li>'\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Template.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/Template.js?");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n/**\n * Uploader component\n */\n\nvar fileUpload = __webpack_require__(7);\nvar util = __webpack_require__(1);\nvar lang = __webpack_require__(4);\n\n// export\nmodule.exports = function Uploader(parent) {\n\tvar _this = this;\n\n\t/**\n  * @var {String} component name\n  */\n\tthis.name = 'Uploader';\n\n\t/**\n  * @var {Queue} queue\n  */\n\tthis.queue = parent.queue;\n\n\t/**\n  * @var {Object} upload elements\n  */\n\tthis.$uploadElement = null;\n\n\t/**\n  * @var {Array} this.readyItems\n  */\n\tthis.readyItems = [];\n\n\t/**\n  * @var {Boolean} uploading\n  */\n\tthis.uploading = false;\n\n\t/**\n  * get total ready items size\n  *\n  * @Param {Array} items\n  * @Return {int}\n  */\n\tvar getTotalReadySize = function getTotalReadySize(items) {\n\t\tvar size = 0;\n\t\tfor (var i = 0; i < items.length; i++) {\n\t\t\tsize += items[i].size;\n\t\t}\n\t\treturn size;\n\t};\n\n\t/**\n  * merge file list\n  *\n  * @Param {Object} $el\n  * @Return {Array}\n  */\n\tvar mergeFileList = function mergeFileList($el) {\n\t\tvar files = [];\n\t\t$el.each(function (k, o) {\n\t\t\tfor (var i = 0; i < o.files.length; i++) {\n\t\t\t\tfiles.push(o.files[i]);\n\t\t\t}\n\t\t});\n\t\treturn files;\n\t};\n\n\t/**\n  * init event\n  */\n\tvar initEvent = function initEvent() {\n\t\tvar $startUpload = util.findDOM(parent.$container, 'element', 'startUpload');\n\n\t\t_this.$uploadElement = util.findDOM(parent.$container, 'element', 'addfiles');\n\t\t_this.addUploadElements(parent.options.$externalFileForm);\n\n\t\tif (!_this.$uploadElement || !_this.$uploadElement.length) return false;\n\n\t\t// init change event\n\t\t_this.$uploadElement.each(function (k, o) {\n\t\t\t$(o).on('change', function () {\n\t\t\t\t// check auto upload\n\t\t\t\t_this.pushReady();\n\n\t\t\t\t// start upload\n\t\t\t\tif (parent.options.autoUpload) {\n\t\t\t\t\t_this.start();\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\n\t\t// init start upload button\n\t\tif ($startUpload.length) {\n\t\t\t$startUpload.on('click', function () {\n\t\t\t\t_this.start();\n\t\t\t\treturn false;\n\t\t\t});\n\t\t}\n\t};\n\n\t/**\n  * push ready upload files\n  *\n  * @Param {Object} el [type=file] element\n  */\n\tvar pushReadyUploadFiles = function pushReadyUploadFiles(files) {\n\t\tvar options = parent.options;\n\t\tvar limitCount = options.queue.limit;\n\t\tvar error = {\n\t\t\ttype: false,\n\t\t\textension: false,\n\t\t\tfilesize: false\n\t\t};\n\t\tvar newReadyItems = [];\n\n\t\tfunction actError(type, message) {\n\t\t\tif (error[type] === false) {\n\t\t\t\talert(message);\n\t\t\t\terror[type] = true;\n\t\t\t}\n\t\t}\n\n\t\t// check file count\n\t\tif (parent.queue.items.ids.length + files.length > limitCount) {\n\t\t\talert(lang('error_upload_limit', [options.queue.limit]));\n\t\t\treturn false;\n\t\t}\n\n\t\t// check total upload size\n\t\tvar size = parent.queue.getSize() + getTotalReadySize(_this.readyItems) + getTotalReadySize(files);\n\t\tif (options.limitSizeTotal < size) {\n\t\t\talert(lang('error_limit_size'));\n\t\t\treturn false;\n\t\t}\n\n\t\t// check items and add items ready for upload\n\t\tfor (var i = 0; i < files.length; i++) {\n\t\t\tif (!files[i].type) {\n\t\t\t\tactError('type', lang('error_file_type'));\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// check file extension\n\t\t\tif (options.allowFileTypes.indexOf(files[i].type.split('/')[1]) < 0) {\n\t\t\t\tactError('extension', lang('error_check_file'));\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// check file size\n\t\t\tif (files[i].size > options.limitSize) {\n\t\t\t\tactError('filesize', lang('error_limit_size2'));\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// set unique id\n\t\t\tfiles[i].id = util.getUniqueNumber();\n\n\t\t\t// push upload item\n\t\t\t_this.readyItems.push(files[i]);\n\n\t\t\t// push new ready items\n\t\t\tnewReadyItems.push(files[i]);\n\t\t}\n\n\t\tnewReadyItems.forEach(function (item) {\n\t\t\tparent.queue.addProgress(item);\n\t\t});\n\t};\n\n\t/**\n  * push ready queue\n  */\n\tthis.pushReady = function () {\n\t\tvar items = mergeFileList(_this.$uploadElement);\n\n\t\tif (!items.length) {\n\t\t\talert(lang('error_not_upload_file'));\n\t\t\treturn false;\n\t\t}\n\n\t\t// push upload items\n\t\tpushReadyUploadFiles(items);\n\n\t\t// reset form\n\t\t_this.resetEvent(_this.$uploadElement);\n\t};\n\n\t/**\n  * start upload\n  *\n  * @Param {Array} files\n  */\n\tthis.start = function (files) {\n\n\t\t// push parameter files\n\t\tif (files && files.length) {\n\t\t\tpushReadyUploadFiles(files);\n\t\t}\n\n\t\tif (!_this.uploading) {\n\t\t\t_this.play();\n\t\t}\n\t};\n\n\t/**\n  * play upload\n  */\n\tthis.play = function () {\n\t\tif (!_this.readyItems.length) return false;\n\n\t\t_this.uploading = true;\n\n\t\t// change ready to loading\n\t\tvar $el = parent.queue.selectQueueElement(_this.readyItems[0].id);\n\t\t$el.removeClass('ready');\n\t\tutil.findDOM($el, 'text', 'state').text('loading..');\n\t\tutil.findDOM($el, 'element', 'removeQueue').remove();\n\n\t\t// act upload\n\t\tvar script = parent.options.uploadScript || null;\n\t\tvar userParams = parent.options.uploadParamsFilter && typeof parent.options.uploadParamsFilter === 'function' && parent.options.uploadParamsFilter(_this.readyItems[0]);\n\t\tvar upload = fileUpload(script, _this.readyItems[0], userParams, parent.options.uploadDataFilter);\n\n\t\t// callback upload event\n\t\tupload.done(function (res, file) {\n\t\t\t_this.uploadComplete('success', res, file);\n\t\t}).progress(function (res, file) {\n\t\t\t_this.uploadProgress(res, file);\n\t\t}).fail(function (message, file) {\n\t\t\t_this.uploadComplete('error', message, file);\n\t\t});\n\t};\n\n\t/**\n  * upload progress event\n  *\n  * @Param {Object} res\n  * @Param {File} file\n  */\n\tthis.uploadProgress = function (res, file) {\n\t\tparent.queue.updateProgress({\n\t\t\tid: file.id,\n\t\t\tdata: res\n\t\t});\n\t\tif (parent.options.uploadProgress) {\n\t\t\tparent.options.uploadProgress(res, file);\n\t\t}\n\t};\n\n\t/**\n  * upload complete event\n  *\n  * @Param {String} state (success|error)\n  * @Param {Object} res\n  * @Param {File} file\n  */\n\tthis.uploadComplete = function (state, res, file) {\n\t\tswitch (state) {\n\t\t\tcase 'success':\n\t\t\t\tfile = $.extend({}, file, res);\n\t\t\t\tdelete file.slice;\n\t\t\t\tparent.queue.uploadResult('success', file);\n\n\t\t\t\t// callback\n\t\t\t\tif (parent.options.uploadComplete) {\n\t\t\t\t\tparent.options.uploadComplete(file);\n\t\t\t\t}\n\t\t\t\tbreak;\n\t\t\tcase 'error':\n\t\t\t\tfile.message = res;\n\t\t\t\tparent.queue.uploadResult('error', file);\n\t\t\t\tconsole.error(file.message);\n\n\t\t\t\t// callback\n\t\t\t\tif (parent.options.uploadFail) {\n\t\t\t\t\tparent.options.uploadFail(file);\n\t\t\t\t}\n\t\t\t\tbreak;\n\t\t}\n\n\t\t_this.readyItems.splice(0, 1);\n\n\t\t// next upload\n\t\tif (_this.readyItems.length) {\n\t\t\t_this.play();\n\t\t} else {\n\t\t\t_this.uploading = false;\n\n\t\t\tif (parent.options.uploadCompleteAll && typeof parent.options.uploadCompleteAll === 'function') {\n\t\t\t\tparent.options.uploadCompleteAll(parent);\n\t\t\t}\n\n\t\t\t// send event to plugin\n\t\t\tparent.eventReceiver('queue.uploadCompleteAll');\n\t\t}\n\t};\n\n\t/**\n  * add upload elements\n  *\n  * @Param {Object} $el\n  */\n\tthis.addUploadElements = function ($el) {\n\t\tif (_this.$uploadElement && _this.$uploadElement.length) {\n\t\t\t_this.$uploadElement = _this.$uploadElement.add($el);\n\t\t} else {\n\t\t\t_this.$uploadElement = $el;\n\t\t}\n\t};\n\n\t/**\n  * reset event\n  *\n  * @Param {Object} $el\n  */\n\tthis.resetEvent = function ($el) {\n\t\tvar $inputs = $el || _this.$uploadElement;\n\t\t$inputs.each(function (k, o) {\n\t\t\tutil.inputFileReset(o);\n\t\t});\n\t};\n\n\t// ACTION\n\tinitEvent();\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Uploader.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/Uploader.js?");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar util = __webpack_require__(1);\n\n/**\n * file upload class\n *\n * @author : redgoose\n * @param {String} action 파일처리 백엔드 url\n * @param {File} file\n * @param {Object} params\n * @param {Function} filter\n * @return {Object}\n */\nvar fileUpload = function fileUpload(action, file, params, filter) {\n\tvar defer = $.Deferred();\n\n\tif (action) {\n\t\t// server upload\n\t\tvar xhr = new XMLHttpRequest();\n\n\t\tif (typeof FormData === 'function' || (typeof FormData === 'undefined' ? 'undefined' : _typeof(FormData)) === 'object') {\n\t\t\tvar formData = new FormData();\n\t\t\t// append params\n\t\t\tformData.append('file', file);\n\t\t\tif (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {\n\t\t\t\tfor (var o in params) {\n\t\t\t\t\tformData.append(o, params[o]);\n\t\t\t\t}\n\t\t\t}\n\t\t\t// open xhr\n\t\t\txhr.open('post', action, true);\n\t\t\t// progress event\n\t\t\txhr.upload.addEventListener('progress', function (e) {\n\t\t\t\tdefer.notify(uploadProgress(e), file);\n\t\t\t}, false);\n\t\t\t// loaded event\n\t\t\txhr.addEventListener('load', function (e) {\n\t\t\t\tvar src = uploadSuccess(e.target);\n\n\t\t\t\t// filtering response\n\t\t\t\tsrc = util.getFunctionReturn(filter, src);\n\n\t\t\t\tswitch (src.state) {\n\t\t\t\t\tcase 'success':\n\t\t\t\t\t\tdefer.resolve(src.response, file);\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tcase 'error':\n\t\t\t\t\t\tdefer.reject(src.response.message, file);\n\t\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t});\n\t\t\txhr.send(formData);\n\t\t} else {\n\t\t\tdefer.reject('not support browser', file);\n\t\t}\n\t} else {\n\t\t// local upload\n\t\tif (FileReader) {\n\t\t\tvar reader = new FileReader();\n\t\t\treader.onload = function (e) {\n\t\t\t\tdefer.resolve({\n\t\t\t\t\tsrc: e.target.result,\n\t\t\t\t\tisLocalFile: true\n\t\t\t\t}, file);\n\t\t\t};\n\t\t\treader.readAsDataURL(file);\n\t\t} else {\n\t\t\tdefer.reject('not support browser', file);\n\t\t}\n\t}\n\n\treturn defer.promise();\n};\n\n/**\n * upload progress\n *\n * @Param {XMLHttpRequestProgressEvent} e\n * @Return {object}\n */\nvar uploadProgress = function uploadProgress(e) {\n\tif (e.lengthComputable) {\n\t\treturn { loaded: e.loaded, total: e.total };\n\t}\n};\n\n/**\n * upload success\n *\n * @Param {XMLHttpRequestProgressEvent} e\n * @Param {File} file\n * @Return {Object}\n */\nvar uploadSuccess = function uploadSuccess(e, file) {\n\tif (e.readyState === 4) {\n\t\tswitch (e.status) {\n\t\t\tcase 200:\n\t\t\t\tvar response = e.responseText;\n\t\t\t\ttry {\n\t\t\t\t\treturn JSON.parse(response) || response;\n\t\t\t\t} catch (e) {\n\t\t\t\t\treturn {\n\t\t\t\t\t\tstate: 'error',\n\t\t\t\t\t\tresponse: {\n\t\t\t\t\t\t\tmessage: response\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t}\n\t\t\t\tbreak;\n\t\t\tcase 404:\n\t\t\t\treturn {\n\t\t\t\t\tstate: 'error',\n\t\t\t\t\tresponse: {\n\t\t\t\t\t\tmessage: '404 - File not found'\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t\tbreak;\n\t\t\tcase 403:\n\t\t\t\treturn {\n\t\t\t\t\tstate: 'error',\n\t\t\t\t\tresponse: {\n\t\t\t\t\t\tmessage: '403 - Forbidden file type'\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\treturn {\n\t\t\t\t\tstate: 'error',\n\t\t\t\t\tresponse: {\n\t\t\t\t\t\tmessage: 'Unknown Error'\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t\tbreak;\n\t\t}\n\t}\n\n\treturn {\n\t\tstate: 'error',\n\t\tresponse: {\n\t\t\tmessage: 'Unknown Error'\n\t\t}\n\t};\n};\n\n// export\nmodule.exports = fileUpload;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/FileUpload.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/FileUpload.js?");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/**\n * check method\n *\n * @Param {Function} obj\n * @Param {Boolean}\n */\nfunction checkMethod(obj) {\n\treturn obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';\n}\n\n/*\n * receive event list\n *\n * queue.changeStyle\n * queue.selectQueue\n * queue.addProgress\n * queue.updateProgress\n * queue.uploadComplete\n * queue.removeQueue\n */\n\nfunction Plugin(parent) {\n\tvar _this = this;\n\n\t/**\n  * @var {Array} this.items\n  */\n\tthis.names = [];\n\n\t/**\n  * @var {Object} this.obj\n  */\n\tthis.child = {};\n\n\t/**\n  * event listener\n  *\n  * @Param {String} type\n  * @Param {*} value\n  */\n\tthis.eventListener = function (type, value) {\n\t\t_this.names.forEach(function (name) {\n\t\t\tvar evt = _this.child[name].eventListener;\n\t\t\tif (!evt || !(typeof evt === 'function')) return;\n\t\t\tevt(type, value);\n\t\t});\n\t};\n\n\t/**\n  * error plugin\n  * 플러그인 작동에 문제가 생겨 호출되어 객체를 삭제한다.\n  *\n  * @Param {String} childName error plugin name\n  */\n\tthis.error = function (childName) {\n\t\t_this.names.splice(_this.names.indexOf(childName), 1);\n\t\tdelete _this.child[childName];\n\t};\n\n\t/**\n  * init\n  *\n  */\n\tthis.init = function () {\n\t\t// init plugins\n\t\tvar items = parent.options.plugin;\n\t\tif (items && items.length) {\n\t\t\titems.forEach(function (item) {\n\t\t\t\tif (!item.name) return;\n\t\t\t\tif (!item.obj || !(_typeof(item.obj) === 'object')) return;\n\t\t\t\tif (!item.obj.init || !(typeof item.obj.init === 'function')) return;\n\n\t\t\t\t_this.names.push(item.name);\n\t\t\t\t_this.child[item.name] = item.obj;\n\n\t\t\t\t// play init()\n\t\t\t\t_this.child[item.name].init(parent);\n\t\t\t});\n\t\t}\n\t};\n}\n\n// export module\nmodule.exports = Plugin;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Plugin.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/Plugin.js?");

/***/ })
/******/ ]);