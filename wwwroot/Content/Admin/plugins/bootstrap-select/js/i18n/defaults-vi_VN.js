/*!
 * Bootstrap-select v1.10.0 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2016 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(["jquery"], function (a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(this, function (jQuery) {

    (function ($) {
        $.fn.selectpicker.defaults = {
            noneSelectedText: 'Không có gì được chọn',
            noneResultsText: 'Không có kết quả nào phù hợp {0}',
            countSelectedText: function (numSelected, numTotal) {
                return (numSelected == 1) ? "{0} mục được chọn" : "{0} các mục được chọn";
            },
            maxOptionsText: function (numAll, numGroup) {
                return [
                    (numAll == 1) ? 'Đã đạt đến giới hạn ({n} mục tối đa) ' : ' Đã đạt đến giới hạn ({n} mục tối đa)',
                    (numGroup == 1) ? 'Đã đạt đến giới hạn nhóm ({n} mục tối đa) ' : ' Đã đạt đến giới hạn nhóm ({n} mục tối đa)'
                ];
            },
            selectAllText: 'Chọn tất cả',
            deselectAllText: 'Bỏ chọn tất cả',
            multipleSeparator: ', '
        };
    })(jQuery);
}));
