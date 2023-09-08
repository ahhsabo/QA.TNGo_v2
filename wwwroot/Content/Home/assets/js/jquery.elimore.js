/*!
 * jQuery.Elimore
 * http://github.com/luftinur/jquery.elimore
 * --------------------------------------------------------------------------
 * Copyright (c) 2018 Lufti Nurfahmi (@luftinur)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Create Ellipsis Of Text
 * Change Log add options data url
 */
if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function _O() { };
        _O.prototype = obj;
        return new _O();

    }

}
; (function ($, window, document, undefined) {
    'use strict';

    var _Elimore = {
        init: function (options, el) {
            var self = this;
            self.el = el;
            self.$el = $(el);
            // Store the length text of each element;
            self.$lengthtext = self.$el.text().length;
            self.options = $.extend({}, $.fn.elimore.options, options);


            // Check The Length Text
            if (self.$lengthtext >= self.options.maxLength) {
                self.ellipsis();
            } else {
                return self;
            }


        },
        ellipsis: function () {

            var self = this;

            //self.$elimore_toggle = $("._elimore_toggle");

            if (self.options.dataUrl) {

                var fullTxt = self.$el.text(),
                    text_one = fullTxt.substr(0, self.options.maxLength),
                    dataUrl = self.$el.data("url");

                console.log(dataUrl);
                var more_btn = '<a href="' + dataUrl + '">' + self.options.moreText + '</a>';

                self.$el.html("");

                self.$el.append(text_one + more_btn);

            } else {

                var fullTxt = self.$el.text(),
                    text_one = fullTxt.substr(0, self.options.maxLength),
                    text_two = fullTxt.substr(self.options.maxLength, self.$lengthtext);

                var more_btn = '<a href="javascript:;" class="elimore_show">' + self.options.moreText + '</a>',
                    less_btn = '<a href="javascript:;" class="elimore_hide" style="display:none;">' + self.options.lessText + '</a>';

                if (self.options.showOnly) {
                    less_btn = '';
                }

                self.$el.html("");
				if(self.options.trimOnly){
					 self.$el.append(text_one);
				}else{
                    self.$el.append(text_one + '<div class="elimore_trim" style="display:none">' + text_two + '</div>' + more_btn + less_btn);
				}
               

                self._toggle_ellipsis();

            }




        },
        _toggle_ellipsis: function () {
            var self = this;

            self.$show_btn = self.$el.children().find("a.elimore_show");

            // Toggle Show Hide For Ellipsis Text
            self.$el.on("click", ".elimore_show", function () {
                self.$el.children().toggle();
            });
            self.$el.on("click", ".elimore_hide", function () {
                self.$el.children().toggle();
            });
        }

    }

    $.fn.elimore = function (options) {
        return this.each(function () {
            var em = Object.create(_Elimore);
            em.init(options, this);
        });
    };

    $.fn.elimore.options = {
        maxLength: 130,
        moreText: "More View",
        lessText: "Less View",
        showOnly: false,
        dataUrl: false,
		trimOnly : false
    };


})(jQuery, window, document);

