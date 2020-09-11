import {bindable, bindingMode, inject, customAttribute} from "aurelia-framework";
import {TooltipService} from "../utils/tooltip-service";
import {bootstrapOptions} from "../utils/bootstrap-options";

@inject(Element, TooltipService)
@customAttribute('aubs-popover')
export class AubsPopoverCustomAttribute {

    @bindable title;
    @bindable body;
    @bindable position = bootstrapOptions.popoverPosition;
    @bindable disabled = false;
    @bindable({defaultBindingMode: bindingMode.twoWay}) isOpen = false;
    @bindable trigger = bootstrapOptions.popoverTrigger;
    @bindable customPopover;
    @bindable onToggle;

    triggers = [];

    validPositions = ['top', 'bottom', 'left', 'right'];
    valuesChanged = false;
    visible = false;

    showClass;

    constructor(element, tooltipService) {
        this.element = element;
        this.tooltipService = tooltipService;

        this.listeners = {
            in: () => this.handleShow(),
            out: () => this.handleHide(),
            click: () => {
                this.visible ? this.handleHide() : this.handleShow()
            },
            outside: event => this.handleOutside(event)
        }
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
                this.onToggle({open: true});
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
                this.onToggle({open: false});
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
}