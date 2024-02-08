import {EventManager} from "../engine/eventmanager";


export class BaseControl {
    /**
     * Инициализация элемента управления
     */
    static initControl() {
        let control = new this();
    }

    _bodyDom = null;

    // region init methods

    constructor() {
        if (this.constructor === BaseControl) throw new Error("Abstract classes can't be instantiated.");
        this._beforeInit();
        this._init();
        this._afterInit();
    }

    _beforeInit() {
        this._bodyDom = document.querySelector("body");
        this.eventManager = new EventManager();
    }

    _init() {
        this._registerEventHandlers();
        this._registerDelegateEventHandlers();
    }

    _afterInit() {
        // put code here
    }

    _registerEventHandlers() {
        this._getEventHandlerList().forEach(registerEventObj => {
            const object = registerEventObj.object ?? this,
                bindSelf = registerEventObj.bindSelf ?? true,
                {event, handler} = registerEventObj;

            object.addEventListener(event, bindSelf ? handler.bind(this) : handler);
        });
    }

    _registerDelegateEventHandlers() {
        this._getDelegateEventHandlerList().forEach((registerEventObj) => {
            const object = registerEventObj.object ?? this,
                bindSelf = registerEventObj.bindSelf ?? true,
                {event, handler, selector} = registerEventObj;

            this.eventManager.delegate(
                object,
                event,
                selector,
                bindSelf ? handler.bind(this) : handler
            );
        });
    }

    // endregion


    // region event handlers register methods


    _getEventHandlerList() {
        return [];
        // example
        return [
            {
                event: "scroll",
                object: document,
                handler: this.handler,
                bindSelf: false,
            },
        ];
    }

    _getDelegateEventHandlerList() {
        return [];
        // example
        return [
            {
                event: "scroll",
                object: document,
                selector: ".some-element",
                handler: this.handler,
                bindSelf: false,
            },
        ];
    }

    // endregion
}
