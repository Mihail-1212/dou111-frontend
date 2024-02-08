
import {BaseControl} from "./base.control";

export class ButtonControl extends BaseControl{
    constructor() {
        super();
        if (this.constructor === ButtonControl) throw new Error("Abstract classes can't be instantiated.");
    }
}
