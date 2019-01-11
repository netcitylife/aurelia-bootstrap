var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

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

import { bindable, bindingMode, inject } from "aurelia-framework";
import { TooltipService } from "../utils/tooltip-service";
import { bootstrapOptions } from "../utils/bootstrap-options";

export let AubsPopoverCustomAttribute = (_dec = inject(Element, TooltipService), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = class AubsPopoverCustomAttribute {

    constructor(element, tooltipService) {
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
            in: () => this.handleShow(),
            out: () => this.handleHide(),
            click: () => {
                this.visible ? this.handleHide() : this.handleShow();
            },
            outside: event => this.handleOutside(event)
        };
    }

    bind() {
        if (!this.validPositions.includes(this.position)) {
            this.position = 'top';
        }

        this.triggers = this.trigger.split(' ');

        this.showClass = bootstrapOptions.version === 4 ? 'show' : 'in';
    }

    attached() {
        this.tooltipService.setTriggers(this.element, this.triggers, this.listeners);

        if (this.customPopover) {
            this.customPopover.style.display = 'none';
        }

        this.isAttached = true;
        if (this.isOpen) {
            this.handleShow();
        }
    }

    detached() {
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
    }

    isOpenChanged() {
        if (!this.isAttached) {
            return;
        }

        if (this.isOpen) {
            this.handleShow();
        } else {
            this.handleHide();
        }
    }

    titleChanged() {
        this.valuesChanged = true;

        if (this.titleElement) {
            this.titleElement.innerHTML = this.title;
        }
    }

    bodyChanged() {
        this.valuesChanged = true;

        if (this.bodyElement) {
            this.bodyElement.innerHTML = this.body;
        }
    }

    positionChanged(newValue, oldValue) {
        if (!this.validPositions.includes(newValue)) {
            this.position = oldValue;
            return;
        }
        this.oldPosition = oldValue;

        this.valuesChanged = true;
    }

    triggerChanged(newValue, oldValue) {
        this.tooltipService.removeTriggers(this.element, this.triggers, this.listeners);

        this.triggers = this.trigger.split(' ');
        this.tooltipService.setTriggers(this.element, this.triggers, this.listeners);
    }

    handleShow() {
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

        this.tooltipService.onTransitionEnd(this.popover, () => {
            if (typeof this.onToggle === 'function') {
                this.onToggle({ open: true });
            }
        });
        this.popover.classList.add(this.showClass);

        this.visible = true;
        this.isOpen = true;
    }

    handleHide() {
        if (!this.visible) {
            return;
        }

        this.tooltipService.onTransitionEnd(this.popover, () => {
            this.popover.style.display = 'none';
            if (typeof this.onToggle === 'function') {
                this.onToggle({ open: false });
            }
        });
        this.popover.classList.remove(this.showClass);

        this.visible = false;
        this.isOpen = false;
    }

    handleOutside(event) {
        if (!this.visible) {
            return;
        }

        if (this.element !== event.target && !this.popover.contains(event.target)) {
            this.handleHide();
        }
    }

    getPositionClass(position) {
        return (bootstrapOptions.version === 4 ? 'bs-popover-' : '') + position;
    }

    createPopover() {
        let arrow = document.createElement('div');
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
                this.titleElement.classList.add('popover-' + (bootstrapOptions.version === 4 ? 'header' : 'title'));
                this.titleElement.innerHTML = this.title;
                this.popover.appendChild(this.titleElement);
            }

            this.bodyElement = document.createElement('div');
            this.bodyElement.classList.add('popover-' + (bootstrapOptions.version === 4 ? 'body' : 'content'));
            this.bodyElement.innerHTML = this.body;
            this.popover.appendChild(this.bodyElement);

            document.body.appendChild(this.popover);

            if (this.popper) {
                this.popper.destroy();
            }

            this.popper = this.tooltipService.createAttachment(this.element, this.popover, this.position, '.arrow');
        }
    }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "body", [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "position", [bindable], {
    enumerable: true,
    initializer: function () {
        return bootstrapOptions.popoverPosition;
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [bindable], {
    enumerable: true,
    initializer: function () {
        return false;
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isOpen", [_dec2], {
    enumerable: true,
    initializer: function () {
        return false;
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "trigger", [bindable], {
    enumerable: true,
    initializer: function () {
        return bootstrapOptions.popoverTrigger;
    }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "customPopover", [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "onToggle", [bindable], {
    enumerable: true,
    initializer: null
})), _class2)) || _class);