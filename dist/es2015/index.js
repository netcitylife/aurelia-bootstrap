import { PLATFORM } from 'aurelia-pal';
import { AubsAccordionCustomElement } from "./accordion/aubs-accordion";
import { AubsAccordionGroupCustomElement } from "./accordion/aubs-accordion-group";
import { AubsBtnCheckboxCustomAttribute } from "./buttons/aubs-btn-checkbox";
import { AubsBtnLoadingCustomAttribute } from "./buttons/aubs-btn-loading";
import { AubsBtnRadioCustomAttribute } from "./buttons/aubs-btn-radio";
import { AubsCollapseCustomAttribute } from "./collapse/aubs-collapse";
import { AubsDropdownCustomAttribute } from "./dropdown/aubs-dropdown";
import { AubsDropdownToggleCustomAttribute } from "./dropdown/aubs-dropdown-toggle";
import { AubsPaginationCustomElement } from "./pagination/aubs-pagination";
import { AubsPopoverCustomAttribute } from "./popover/aubs-popover";
import { AubsTabCustomElement } from "./tabs/aubs-tab";
import { AubsTabsetCustomElement } from "./tabs/aubs-tabset";
import { AubsTooltipCustomAttribute } from "./tooltip/aubs-tooltip";
import { AubsTypeaheadCustomElement } from "./typeahead/aubs-typeahead";
import { TypeaheadHighlightValueConverter } from "./typeahead/typeahead-highlight";
import { BootstrapConfig } from "./utils/bootstrap-config";

export function configure(aurelia, callback) {

    let config = new BootstrapConfig();

    if (typeof callback === 'function') {
        callback(config);
    }
}

export { AubsAccordionCustomElement, AubsAccordionGroupCustomElement, AubsBtnCheckboxCustomAttribute, AubsBtnLoadingCustomAttribute, AubsBtnRadioCustomAttribute, AubsCollapseCustomAttribute, AubsDropdownCustomAttribute, AubsDropdownToggleCustomAttribute, AubsPaginationCustomElement, AubsPopoverCustomAttribute, AubsTabCustomElement, AubsTabsetCustomElement, AubsTooltipCustomAttribute, AubsTypeaheadCustomElement, TypeaheadHighlightValueConverter, BootstrapConfig };