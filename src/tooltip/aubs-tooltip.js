import {bindable, inject, bindingMode} from 'aurelia-framework';
import {TooltipService} from '../utils/tooltip-service';
import {bootstrapOptions} from '../utils/bootstrap-options';

@inject(Element, TooltipService)
export class AubsTooltipCustomAttribute {
    @bindable text;
    @bindable position = bootstrapOptions.tooltipPosition;
    @bindable disabled = false;
    @bindable({defaultBindingMode: bindingMode.twoWay}) open = false;
    @bindable trigger = bootstrapOptions.tooltipTrigger;
    @bindable class = bootstrapOptions.tooltipClass;

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

        this.isAttached = true;
        if (this.open) {
            this.handleShow();
        }
    }

    detached() {
        this.tooltipService.removeTriggers(this.element, this.triggers, this.listeners);

        if (this.tooltip) {
            document.body.removeChild(this.tooltip);
        }

        if (this.popper) {
            this.popper.destroy();
        }
    }

    openChanged() {
        if (!this.isAttached) {
            return;
        }

        if (this.open) {
            this.handleShow();
        } else {
            this.handleHide();
        }
    }

    triggerChanged() {
        this.tooltipService.removeTriggers(this.element, this.triggers, this.listeners);

        this.triggers = this.trigger.split(' ');
        this.tooltipService.setTriggers(this.element, this.triggers, this.listeners);
    }

    textChanged() {
        this.valuesChanged = true;

        if (this.body) {
            this.body.innerHTML = this.text;
        }
    }

    positionChanged(newValue, oldValue) {
        if (!this.validPositions.includes(newValue)) {
            this.position = oldValue;
            return;
        }

        this.valuesChanged = true;
    }

    handleShow() {
        if (this.visible || this.disabled) {
            return;
        }

        if (!this.tooltip || this.valuesChanged) {
            this.createTooltip();
            this.valuesChanged = false;
        }

        this.tooltip.style.display = 'block';
        this.popper.update();

        this.tooltip.classList.add(this.showClass);

        this.visible = true;
        this.open = true;
    }

    handleHide() {
        if (!this.visible) {
            return;
        }

        this.tooltip.classList.remove(this.showClass);

        this.visible = false;
        this.open = false;
    }

    handleOutside(event) {
        if (this.element !== event.target) {
            this.handleHide();
        }
    }

    createTooltip() {
        if (this.tooltip) {
            document.body.removeChild(this.tooltip);
        }

        this.tooltip = document.createElement('div');
        this.parseClassList().forEach(next => this.tooltip.classList.add(next.trim()));

        this.tooltip.classList.add((bootstrapOptions.version === 4 ? 'bs-tooltip-' : '') + this.position);
        this.tooltip.setAttribute('role', 'tooltip');

        let arrow = document.createElement('div');
        arrow.classList.add((bootstrapOptions.version === 4 ? '' : 'tooltip-') + 'arrow');
        this.tooltip.appendChild(arrow);

        this.body = document.createElement('div');
        this.body.classList.add('tooltip-inner');
        this.body.innerHTML = this.text;
        this.tooltip.appendChild(this.body);

        document.body.appendChild(this.tooltip);

        if (this.popper) {
            this.popper.destroy();
        }

        this.popper = this.tooltipService.createAttachment(this.element, this.tooltip, this.position, '.' + (bootstrapOptions.version === 4 ? '' : 'tooltip-') + 'arrow');
    }

    parseClassList() {
        if (!this.class || this.class.length === 0) {
            return ['tooltip'];
        }

        return this.class.split(',');
    }

}