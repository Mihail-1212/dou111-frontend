import "./template/header";



import {ScrollTopControl} from "./controls/scrolltop.control";
import {MenuControl} from "./controls/menu.control";
import {SearchControl} from "./controls/search.control";

document.addEventListener('DOMContentLoaded', function () {
    ScrollTopControl.initControl();
    MenuControl.initControl();
    SearchControl.initControl();
});

