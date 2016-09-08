var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
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

import { bindable, bindingMode, inject, containerless } from "aurelia-framework";
import { AubsAccordionCustomElement } from './aubs-accordion';

export let AubsAccordionGroupCustomElement = (_dec = inject(AubsAccordionCustomElement), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = containerless(_class = (_class2 = class AubsAccordionGroupCustomElement {

    constructor(accordion) {
        _initDefineProp(this, 'title', _descriptor, this);

        _initDefineProp(this, 'panelClass', _descriptor2, this);

        _initDefineProp(this, 'isOpen', _descriptor3, this);

        if (!accordion) {
            throw new Error('The aubs-accordion-group must be a child of aubs-accordion.');
        }

        this.accordion = accordion;
        this.accordion.registerGroup(this);

        if (typeof this.isOpen !== 'boolean') {
            this.isOpen = false;
        }
    }

    isOpenChanged() {
        this.notifyToggle();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.notifyToggle();
    }

    notifyToggle() {
        if (this.isOpen) {
            this.accordion.groupToggled(this);
        }
    }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'title', [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'panelClass', [bindable], {
    enumerable: true,
    initializer: function () {
        return 'panel-default';
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'isOpen', [_dec2], {
    enumerable: true,
    initializer: function () {
        return false;
    }
})), _class2)) || _class) || _class);