export class EventManager {
    /**
     * $.on equivalent
     * @param el
     * @param evt
     * @param sel
     * @param handler
     */
    delegate(el, evt, sel, handler) {
        el.addEventListener(evt, function (event) {
            var t = event.target;
            while (t && t !== this) {
                if (t.matches(sel)) {
                    handler.call(t, event);
                }
                t = t.parentNode;
            }
        });
    }
}
