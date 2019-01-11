'use strict';

System.register(['popper.js'], function (_export, _context) {
    "use strict";

    var Popper, TooltipService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_popperJs) {
            Popper = _popperJs.default;
        }],
        execute: function () {
            _export('TooltipService', TooltipService = function () {
                function TooltipService() {
                    _classCallCheck(this, TooltipService);
                }

                TooltipService.prototype.createAttachment = function createAttachment(target, element, position, arrow) {

                    return new Popper(target, element, {
                        placement: position,
                        modifiers: {
                            arrow: {
                                element: arrow
                            }
                        }
                    });
                };

                TooltipService.prototype.setTriggers = function setTriggers(element, triggers, listeners) {
                    if (!triggers.includes('none')) {
                        if (triggers.includes('mouseover')) {
                            element.addEventListener('mouseover', listeners.in);
                            element.addEventListener('mouseleave', listeners.out);
                        }

                        if (triggers.includes('focus')) {
                            element.addEventListener('focus', listeners.in);
                            element.addEventListener('blur', listeners.out);
                        }

                        if (triggers.includes('click')) {
                            element.addEventListener('click', listeners.click);
                        } else if (triggers.includes('outsideClick')) {
                            element.addEventListener('click', listeners.in);
                            document.addEventListener('click', listeners.outside);
                        }
                    }
                };

                TooltipService.prototype.removeTriggers = function removeTriggers(element, triggers, listeners) {
                    if (!triggers.includes('none')) {
                        if (triggers.includes('mouseover')) {
                            element.removeEventListener('mouseover', listeners.in);
                            element.removeEventListener('mouseleave', listeners.out);
                        }

                        if (triggers.includes('focus')) {
                            element.removeEventListener('focus', listeners.in);
                            element.removeEventListener('blur', listeners.out);
                        }

                        if (triggers.includes('click')) {
                            element.removeEventListener('click', listeners.click);
                        } else if (triggers.includes('outsideClick')) {
                            element.removeEventListener('click', listeners.in);
                            document.removeEventListener('click', listeners.outside);
                        }
                    }
                };

                TooltipService.prototype.onTransitionEnd = function onTransitionEnd(element, callback) {
                    var cb = function cb() {
                        callback();
                        element.removeEventListener('transitionend', cb);
                    };
                    element.addEventListener('transitionend', cb);
                };

                return TooltipService;
            }());

            _export('TooltipService', TooltipService);
        }
    };
});