import {BaseControl} from "./base.control";
import {EventManager} from "../engine/eventmanager";

export class SearchControl extends BaseControl {

    /**
     * @overriden
     * @private
     */
    _beforeInit() {
        super._beforeInit();
        this.menuSearchInput = document.getElementById("menu-search-input");
    }

    /**
     * @overriden
     * @private
     */
    _afterInit() {
        super._afterInit();

        // Установка autocomplete
        this.searchInstanes = M.Autocomplete.init(this.menuSearchInput, {
            data: {
                "Test": null,
                "test 2": null,
                "google": null,
            },
        });
    }

    /**
     * @overriden
     * @returns {[{handler, bindSelf: boolean, event: string, object: Document}]|*[]}
     * @private
     */
    _getEventHandlerList() {
        return [];
        return [
            {
                event: "scroll",
                object: document,
                handler: this.handler,
                bindSelf: false,
            },
        ];
    }
}
