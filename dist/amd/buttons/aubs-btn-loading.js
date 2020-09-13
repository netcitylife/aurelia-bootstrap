define(['exports', 'aurelia-framework', '../utils/bootstrap-options'], function (exports, _aureliaFramework, _bootstrapOptions) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AubsBtnLoadingCustomAttribute = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

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

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var AubsBtnLoadingCustomAttribute = exports.AubsBtnLoadingCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.customAttribute)('aubs-btn-loading'), _dec(_class = _dec2(_class = (_class2 = function () {
        function AubsBtnLoadingCustomAttribute(element) {
            _classCallCheck(this, AubsBtnLoadingCustomAttribute);

            _initDefineProp(this, 'loading', _descriptor, this);

            _initDefineProp(this, 'text', _descriptor2, this);

            _initDefineProp(this, 'disabled', _descriptor3, this);

            this.element = element;

            if (this.element.tagName !== 'BUTTON' && this.element.tagName !== 'A') {
                throw new Error("The aubs-btn-loading attribute can only be used in button and anchor elements");
            }
        }

        AubsBtnLoadingCustomAttribute.prototype.attached = function attached() {
            this.isAttached = true;
            this.innerHTML = this.element.innerHTML;
            this.setClass();
            this.disabledChanged();
        };

        AubsBtnLoadingCustomAttribute.prototype.loadingChanged = function loadingChanged() {
            if (this.isAttached) {
                this.setClass();
            }
        };

        AubsBtnLoadingCustomAttribute.prototype.disabledChanged = function disabledChanged() {
            if (!this.isAttached) {
                return;
            }

            if (this.disabled) {
                if (!this.loading) {
                    this.element.classList.add("disabled");
                    this.element.disabled = true;
                }
            } else {
                if (!this.loading) {
                    this.element.classList.remove("disabled");
                    this.element.disabled = false;
                }
            }
        };

        AubsBtnLoadingCustomAttribute.prototype.setClass = function setClass() {
            if (this.loading) {
                this.innerHTML = this.element.innerHTML;
                this.element.innerHTML = this.text;
                this.element.classList.add("disabled");
                this.element.disabled = true;
            } else {
                this.element.innerHTML = this.innerHTML;

                if (!this.disabled) {
                    this.element.classList.remove("disabled");
                    this.element.disabled = false;
                }
            }
        };

        return AubsBtnLoadingCustomAttribute;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'loading', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'text', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return _bootstrapOptions.bootstrapOptions.btnLoadingText;
        }
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'disabled', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return false;
        }
    })), _class2)) || _class) || _class);
});