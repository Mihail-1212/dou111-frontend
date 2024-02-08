import {ButtonControl} from "./button.control";

export class ScrollTopControl extends ButtonControl {
    // region const's

    SCROLL_BTN_FROM_TOP_SHOW = 150;

    // endregion


    /**
     * @overriden
     */
    _beforeInit() {
        super._beforeInit();
        this._scrollButton = document.getElementById("scroll-button");
    }

    /**
     * @overriden
     * @returns {[{handler, bindSelf: boolean, event: string, object: Document}]}
     */
    _getEventHandlerList() {
        return [
            {
                event: "click",
                object: this._scrollButton,
                handler: this.onScrollButtonClickHandler,
            },
            {
                event: "scroll",
                object: document,
                handler: this.onDocumentScrollHandler,
            }
        ];
    }


    // region handlers

    onScrollButtonClickHandler() {
        console.log(this)
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    onDocumentScrollHandler() {
        //console.log(this)
        this._checkAndChangeScrollButtonVisible();
    }

    // endregion


    // region actions

    _checkAndChangeScrollButtonVisible() {
        let { top } = this._bodyDom.getBoundingClientRect();
        top = Math.abs(top);

        if (top < this.SCROLL_BTN_FROM_TOP_SHOW) {
            this._scrollButton.classList.add("animate-hide");
        }
        else {
            this._scrollButton.classList.remove("animate-hide");
        }
    }

    // endregion
}
