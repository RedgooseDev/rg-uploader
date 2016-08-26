function RG_ChangeQueueStyle(){this.name="Change Queue Style",this.buttonsParams=[{name:"list",title:"list style",iconName:"menu","default":!0},{name:"web",title:"web style",iconName:"view_list","default":!1},{name:"album",title:"album style",iconName:"view_module","default":!1}],this.$nav=null,this.$buttons=null;var e=this,t=null,i=function(){$.each(e.buttonsParams,function(t,i){var o=$('<button type="button" class="style-'+i.name+'" title="'+i.title+'" data-style="'+i.name+'"><i class="material-icons">'+i.iconName+"</i></button>");n(o),e.$nav.append(o)}),e.$buttons=e.$nav.children("button")},n=function(e){e.on("click",function(e){return!$(this).hasClass("on")&&void t.queue.changeStyle($(this).data("style"))})},o=function(t){e.$buttons.removeClass("on").filter(".style-"+t).addClass("on")};this.init=function(n){t=n,e.$nav=$('<nav data-element="selectQueueStyle"></nav>'),t.$container.children("header").append(e.$nav),i(),o(t.queue.style)},this.eventListener=function(e,t){switch(e){case"queue.changeStyle":o(t.style)}}}function RG_DragAndDrop(){this.name="Drag And Drop",this.areaElements=[];var e=this,t=null,i=$(".rg-external-dropzone"),n=function(e){if(!(window.File&&window.FileList&&window.FileReader&&window.Blob))return!1;if(!e.length)return!1;for(var t=$.Deferred(),i=!1,n=function(e){if(e.stopPropagation(),e.preventDefault(),"dragover"==e.type){if(i)return!1;i=!0,$(e.currentTarget).addClass("drop-mode"),e.dataTransfer.dropEffect="copy"}else i=!1,$(e.currentTarget).removeClass("drop-mode");return!1},o=function(e){e.stopPropagation(),e.preventDefault(),n(e);var i=e.dataTransfer?e.dataTransfer.files:null;return i&&i.length&&t.notify(i),!1},l=0;l<e.length;l++)e[l].addEventListener("dragover",n,!1),e[l].addEventListener("dragleave",n,!1),e[l].addEventListener("drop",o,!1);return t.promise()},o=function(e){return t.uploader.uploading?(alert(t.lang("error_add_upload")),!1):void t.uploader.play(t.uploader.$uploadElement,e||[])};this.init=function(l){if(t=l,this.areaElements.push(t.queue.$queue.parent().get(0)),i.each(function(){e.areaElements.push(this)}),this.areaElements.length){var s=n(this.areaElements);s&&s.progress&&s.progress(o)}}}function RG_Preview(){this.name="Preview",this.$preview=null;var e=this,t=null,i="not-image",n=150,o=function(){var i='<div class="col preview"><figure></figure></div>';e.$preview=$(i),e.$preview.width(n),t.$container.find("[data-comp=queue]").prepend(e.$preview),l()},l=function(t){var n=e.$preview.children("figure");t?n.css("backgroundImage","url('"+t+"')").removeClass(i):n.attr("style","").addClass(i)},s=function(t){t?e.$preview.removeClass("hide"):e.$preview.addClass("hide")};this.init=function(e){t=e,n=parseInt(t.options.queue.height),o()},this.eventListener=function(e,i){switch(e){case"queue.selectQueue":var n=i.$selectElement.data("id"),o=t.queue.findItem(n),a=t.queue.items.files[o],r=i.$selectElement.hasClass("selected")&&"image"==a.type.split("/")[0]?a.fullSrc:null;l(r);break;case"queue.changeStyle":s("list"==i.style)}}}function RG_Sizeinfo(){this.name="Size info",this.size={current:0,total:0};var e=this,t=null,i=null,n=".size-info",o=null,l=null,s=function(){var e='<p>Size : <em data-text="currentSize"></em>/<em data-text="totalSize"></em></p>';i.append(e),o=i.find("[data-text=currentSize]"),l=i.find("[data-text=totalSize]")};this.init=function(e){t=e,i=e.$container.find(n),i.length||t.plugin.error(name),s(),this.size.total=t.options.limitSizeTotal,this.update()},this.update=function(){o.text(t.util.bytesToSize(this.size.current)),l.text(t.util.bytesToSize(this.size.total))},this.eventListener=function(i,n){switch(console.log("sizeinfo eventrttt"),i){case"queue.uploadComplete":e.size.current+=n.file.size,e.update(t.queue.getSize());break;case"queue.removeQueue":e.size.current=t.queue.getSize(),e.update()}}}function RG_Thumbnail(e){function t(){if(window.loadedCroppie)return!1;var e=document.getElementsByTagName("head")[0],t=document.createElement("link"),i=document.createElement("script");t.rel="stylesheet",t.href=p.options.url_croppieCSS,i.src=p.options.url_croppieJS,e.appendChild(t),e.appendChild(i),window.loadedCroppie=!0}function i(){p.$el.con=$('<div class="rg-plugin-thumbnail"><span class="bg"></span><div class="wrap"><div class="img-wrap"><figure></figure></div><div class="body"><div class="meta"><p>message</p></div><nav><button type="button" class="btn-done"><i class="material-icons">done</i></button><button type="button" class="btn-close"><i class="material-icons">close</i></button></nav></div></div></div>'),p.$el.wrap=p.$el.con.children(".wrap"),p.$el.bg=p.$el.con.children(".bg"),p.$el.figure=p.$el.con.find(".img-wrap figure"),p.$el.meta=p.$el.con.find(".meta > p"),p.$el.btn_done=p.$el.con.find(".btn-done"),p.$el.btn_close=p.$el.con.find(".btn-close"),$("body").append(p.$el.con)}function n(){p.$el.bg.on("click",function(){p.close()}),p.$el.btn_close.on("click",function(){p.close()}),p.$el.btn_done.on("click",u),$(window).on(d,s)}function o(e){return!(!e&&h)&&(h=!0,p.$el.wrap.width("100%").height("100%").css({marginLeft:0,marginTop:0,left:0,top:0}),void(p.croppie&&a(!0)))}function l(e){return!(!e&&!h)&&(h=!1,p.$el.wrap.width(p.options.width).height(p.options.height).css({marginLeft:0-.5*p.options.width+"px",marginTop:0-.5*p.options.height+"px",left:"50%",top:"50%"}),void(p.croppie&&a(!0)))}function s(e){var t=$(window);return p.croppie?(f&&clearTimeout(f),void(f=setTimeout(function(){return h&&t.width()<640?(o(!0),!1):void(t.width()<640?o(!0):t.width()>640&&l(!0))},300))):(clearTimeout(f),!1)}function a(e){var t=e?p.croppie.get():{};r(),p.options.croppie.boundary={width:p.options.mobileSize>$(window).width()?$(window).width():p.options.width,height:(p.options.mobileSize>$(window).width()?$(window).height():p.options.height)-60},p.croppie=new Croppie(p.$el.figure.get(0),p.options.croppie),e&&(p.croppie.bind({url:p.file.fullSrc,points:t.points}),p.croppie.setZoom(t.zoom))}function r(){p.croppie&&(p.croppie.destroy(),p.croppie=null)}function u(e){p.croppie.result(p.options.output).then(function(e){p.options.uploadScript?$.post(p.options.uploadScript,{name:p.file.name,image:e,id:c.util.getUniqueNumber()},function(e){try{e=JSON.parse(e)}catch(t){return alert("parse error"),!1}return"error"==e.state?(alert(e.response.message),!1):void(p.options.doneCallback&&p.options.doneCallback(e.response,c,p.file))}):p.options.doneCallback&&p.options.doneCallback({id:c.util.getUniqueNumber(),name:"thumb-"+p.file.name,src:e,type:"image/"+p.options.output.format,size:0},c,p.file),p.close()})}this.name="Make thumbnail";var p=this,c=null,d="resize.rgUploader",h=!1,f=null;this.file=null,this.croppie=null,this.$el={con:null,wrap:null,bg:null,figure:null,meta:null,btn_close:null,btn_done:null},this.init=function(o){c=o,this.assignOption(e),t(),i(),n()},this.open=function(e,t,i){this.$el.con.addClass("show"),$("html").addClass("rg-popup"),this.file=e,$(window).width()<this.options.mobileSize?o(!0):l(!0),a(),this.croppie.bind({url:this.file.fullSrc,points:t?t:[],orientation:i?i:1}),this.$el.meta.text("output size: "+this.options.output.size.width+"*"+this.options.output.size.height),this.options.openCallback&&this.options.openCallback(c)},this.close=function(){r(),this.file=null,this.$el.con.removeClass("show"),$("html").removeClass("rg-popup"),this.options.closeCallback&&this.options.closeCallback(c)},this.assignOption=function(e){this.options=$.extend(!0,this.options,e)}}RG_Thumbnail.prototype.options={width:640,height:480,mobileSize:640,url_croppieCSS:"../vendor/croppie/croppie.css",url_croppieJS:"../vendor/croppie/croppie.min.js",uploadScript:"",output:{type:"canvas",quality:.3,format:"jpeg",size:{width:150,height:150}},croppie:{boundary:{width:640,height:420},viewport:{width:150,height:150,type:"square"}},doneCallback:null,openCallback:null,closeCallback:null};
//# sourceMappingURL=maps/plugin.pkgd.js.map
