import {inject, customAttribute} from "aurelia-framework";
import {AubsDropdownCustomAttribute} from "./aubs-dropdown";

@inject(AubsDropdownCustomAttribute, Element)
@customAttribute('aubs-dropdown-toggle')
export class AubsDropdownToggleCustomAttribute {

    constructor(dropdown, element){
        this.dropdown = dropdown;
        this.element = element;
        
        this.clickedListener = () => this.dropdown.toggle();
    }

    attached() {
        this.element.addEventListener('click', this.clickedListener);
    }

    detached(){
        this.element.removeEventListener('click', this.clickedListener);
    }
}