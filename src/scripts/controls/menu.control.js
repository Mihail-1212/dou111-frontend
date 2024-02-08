import {BaseControl} from "./base.control";


export class MenuControl extends BaseControl {
    // region const's

    ANIMATION_SHOW_DURATION_MS = 200;

    // endregion

    // region enum

    ACTION_OPEN_MENU = "open-menu";
    ACTION_CLOSE_MENU = "close-menu";

    // endregion

    /**
     * @overriden
     * @returns {[{handler, bindSelf: boolean, event: string, object: Document}]}
     * @private
     */
    _getDelegateEventHandlerList() {
        return [
            {
                event: "click",
                object: document,
                selector: this.getMenuActionHandlerSelector(),
                handler: this.onDocumentClickEventHandler,
            },
        ];
    }


    /**
     * @overriden
     * @private
     */
    _beforeInit() {
        super._beforeInit();
        this._mainMenu = document.getElementById("main-menu");
    }


    // region getters

    getMenuActionHandlerSelector() {
        return "[data-menu-action]";
    }

    // endregion


    // region event handlers

    onDocumentClickEventHandler({target}) {
        const actionButton = target.closest(this.getMenuActionHandlerSelector()),
            menuAction = actionButton.dataset.menuAction;
        this.executeMenuAction(menuAction);
    }

    // endregion


    // menu action methods

    executeMenuAction(menuAction) {
        switch (menuAction) {
            case this.ACTION_OPEN_MENU:
                this.openMenuAction();
                break;
            case this.ACTION_CLOSE_MENU:
                this.closeMenuAction();
                break;
            default:
                throw new Error("Unexpected menu action");
        }
    }

    openMenuAction() {
        this._mainMenu.animate([
            {opacity: 0,},
            {opacity: 1,}
        ], {
            duration: this.ANIMATION_SHOW_DURATION_MS,
        }).ready.then(() => {
            this._mainMenu.classList.add("show");
        });


    }

    closeMenuAction() {
        this._mainMenu.animate([
            {opacity: 1,},
            {opacity: 0,}
        ], {
            duration: this.ANIMATION_SHOW_DURATION_MS,
        }).finished.then((ev) => {
            this._mainMenu.classList.remove("show")
        })
    }

    // endregion
}
