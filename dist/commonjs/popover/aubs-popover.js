"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AubsPopoverCustomAttribute = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

var _aureliaFramework = require("aurelia-framework");

var _tooltipService = require("../utils/tooltip-service");

var _bootstrapOptions = require("../utils/bootstrap-options");

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var AubsPopoverCustomAttribute = exports.AubsPopoverCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element, _tooltipService.TooltipService), _dec2 = (0, _aureliaFramework.customAttribute)('aubs-popover'), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function () {
    function AubsPopoverCustomAttribute(element, tooltipService) {
        var _this = this;

        _classCallCheck(this, AubsPopoverCustomAttribute);

        _initDefineProp(this, "title", _descriptor, this);

        _initDefineProp(this, "body", _descriptor2, this);

        _initDefineProp(this, "position", _descriptor3, this);

        _initDefineProp(this, "disabled", _descriptor4, this);

        _initDefineProp(this, "isOpen", _descriptor5, this);

        _initDefineProp(this, "trigger", _descriptor6, this);

        _initDefineProp(this, "customPopover", _descriptor7, this);

        _initDefineProp(this, "onToggle", _descriptor8, this);

        this.triggers = [];
        this.validPositions = ['top', 'bottom', 'left', 'right'];
        this.valuesChanged = false;
        this.visible = false;

        this.element = element;
        this.tooltipService = tooltipService;

        this.listeners = {
            in: function _in() {
                return _this.handleShow();
            },
            out: function out() {
                return _this.handleHide();
            },
            click: function click() {
                _this.visible ? _this.handleHide() : _this.handleShow();
            },
            outside: function outside(event) {
                return _this.handleOutside(event);
            }
        };
    }

    AubsPopoverCustomAttribute.prototype.bind = function bind() {
        if (!this.validPositions.includes(this.position)) {
            this.position = 'top';
        }

        this.triggers = this.trigger.split(' ');

        this.showClass = _bootstrapOptions.bootstrapOptions.version === 4 ? 'show' : 'in';
    };

    AubsPopoverCustomAttribute.prototype.attached = function attached() {
        this.tooltipService.setTriggers(this.element, this.triggers, this.listeners);

        if (this.customPopover) {
            this.customPopover.style.display = 'none';
        }

        this.isAttached = true;
        if (this.isOpen) {
            this.handleShow();
        }
    };

    AubsPopoverCustomAttribute.prototype.detached = function detached() {
        this.tooltipService.removeTriggers(this.element, this.triggers, this.listeners);

        if (this.popover && document.body.contains(this.popover)) {
            if (!this.customPopover) {
                document.body.removeChild(this.popover);
            } else {
                this.popover.style.display = 'none';
            }
        }

        if (this.popper) {
            this.popper.destroy();
        }
    };

    AubsPopoverCustomAttribute.prototype.isOpenChanged = function isOpenChanged() {
        if (!this.isAttached) {
            return;
        }

        if (this.isOpen) {
            this.handleShow();
        } else {
            this.handleHide();
        }
    };

    AubsPopoverCustomAttribute.prototype.titleChanged = function titleChanged() {
        this.valuesChanged = true;

        if (this.titleElement) {
            this.titleElement.innerHTML = this.title;
        }
    };

    AubsPopoverCustomAttribute.prototype.bodyChanged = function bodyChanged() {
        this.valuesChanged = true;

        if (this.bodyElement) {
            this.bodyElement.innerHTML = this.body;
        }
    };

    AubsPopoverCustomAttribute.prototype.positionChanged = function positionChanged(newValue, oldValue) {
        if (!this.validPositions.includes(newValue)) {
            this.position = oldValue;
            return;
        }
        this.oldPosition = oldValue;

        this.valuesChanged = true;
    };

    AubsPopoverCustomAttribute.prototype.triggerChanged = function triggerChanged(newValue, oldValue) {
        this.tooltipService.removeTriggers(this.element, this.triggers, this.listeners);

        this.triggers = this.trigger.split(' ');
        this.tooltipService.setTriggers(this.element, this.triggers, this.listeners);
    };

    AubsPopoverCustomAttribute.prototype.handleShow = function handleShow() {
        var _this2 = this;

        if (this.visible || this.disabled) {
            return;
        }

        if (!this.popover || this.valuesChanged) {
            this.createPopover();
            this.valuesChanged = false;
        }

        if (this.customPopover) {
            if (this.popper) {
                this.popper.destroy();
            }

            this.popper = this.tooltipService.createAttachment(this.element, this.popover, this.position, '.arrow');
        }

        this.popover.style.display = 'block';
        this.popper.update();

        this.tooltipService.onTransitionEnd(this.popover, function () {
            if (typeof _this2.onToggle === 'function') {
                _this2.onToggle({ open: true });
            }
        });
        this.popover.classList.add(this.showClass);

        this.visible = true;
        this.isOpen = true;
    };

    AubsPopoverCustomAttribute.prototype.handleHide = function handleHide() {
        var _this3 = this;

        if (!this.visible) {
            return;
        }

        this.tooltipService.onTransitionEnd(this.popover, function () {
            _this3.popover.style.display = 'none';
            if (typeof _this3.onToggle === 'function') {
                _this3.onToggle({ open: false });
            }
        });
        this.popover.classList.remove(this.showClass);

        this.visible = false;
        this.isOpen = false;
    };

    AubsPopoverCustomAttribute.prototype.handleOutside = function handleOutside(event) {
        if (!this.visible) {
            return;
        }

        if (this.element !== event.target && !this.popover.contains(event.target)) {
            this.handleHide();
        }
    };

    AubsPopoverCustomAttribute.prototype.getPositionClass = function getPositionClass(position) {
        return (_bootstrapOptions.bootstrapOptions.version === 4 ? 'bs-popover-' : '') + position;
    };

    AubsPopoverCustomAttribute.prototype.createPopover = function createPopover() {
        var arrow = document.createElement('div');
        arrow.classList.add('arrow');

        if (this.customPopover) {
            this.popover = this.customPopover;

            this.popover.classList.remove(this.getPositionClass(this.oldPosition));

            this.popover.classList.add('popover');
            this.popover.classList.add('fade');
            this.popover.classList.add(this.getPositionClass(this.position));

            if (!this.popover.querySelector('.arrow')) {
                this.popover.appendChild(arrow);
            }
        } else {
            if (this.popover) {
                document.body.removeChild(this.popover);
            }

            this.popover = document.createElement('div');
            this.popover.classList.add('popover');
            this.popover.classList.add('fade');
            this.popover.classList.add(this.getPositionClass(this.position));

            this.popover.appendChild(arrow);

            if (this.title) {
                this.titleElement = document.createElement('h3');
                this.titleElement.classList.add('popover-' + (_bootstrapOptions.bootstrapOptions.version === 4 ? 'header' : 'title'));
                this.titleElement.innerHTML = this.title;
                this.popover.appendChild(this.titleElement);
            }

            this.bodyElement = document.createElement('div');
            this.bodyElement.classList.add('popover-' + (_bootstrapOptions.bootstrapOptions.version === 4 ? 'body' : 'content'));
            this.bodyElement.innerHTML = this.body;
            this.popover.appendChild(this.bodyElement);

            document.body.appendChild(this.popover);

            if (this.popper) {
                this.popper.destroy();
            }

            this.popper = this.tooltipService.createAttachment(this.element, this.popover, this.position, '.arrow');
        }
    };

    return AubsPopoverCustomAttribute;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "body", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "position", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
        return _bootstrapOptions.bootstrapOptions.popoverPosition;
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
        return false;
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isOpen", [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return false;
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "trigger", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
        return _bootstrapOptions.bootstrapOptions.popoverTrigger;
    }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "customPopover", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "onToggle", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
})), _class2)) || _class) || _class);