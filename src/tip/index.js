
import { default as $tip } from "./tip";
import { default as $confirm } from "./confirm";
import { default as $input } from "./input";
import { default as $popup } from "./popup";
import { default as $dialog } from "./dialog";

export const tip = $tip;
export const confirm = $confirm;
export const input = $input;
export const popup = $popup;
export const dialog = $dialog;

export default {
    install(Vue, options) {
        if (!Vue) return;

        Vue.prototype.$tip = $tip;
        Vue.prototype.$confirm = $confirm;
        Vue.prototype.$input = $input;
        Vue.prototype.$popup = $popup;
    },
    tip,
    confirm,
    input,
    popup,
    dialog
}
