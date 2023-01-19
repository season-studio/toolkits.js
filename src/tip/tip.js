import { $private, $resolve, $options, $timerId, setTopZIndex, close } from "./public";

const SYM_TYPE_ATTR = "season-tip-type";
const TIP_SELECTOR = `${SYM_TYPE_ATTR}="tip"`;
const HTML_TIP_CONTAINER = `<div class="-season-tip-container" ${TIP_SELECTOR} />`;

/**
 * show tip
 * @param {*} _tip the text of the tip
 * @param {String|Object} _opt the type or the option object, this parameter can be ignore for normal tip
 * @param {String} [_opt.type=undefined] the type of the tip, can be set as "info", "warn", "error", "normal"
 * @param {Boolean} [_opt.closable=false] if the tip can be close manually
 * @param {Number} [_opt.timeout] timeout for close the tip automatically, the default value is 0ms if the closable is set to true, else is 3000ms
 * @return {tip} the instance of the tip
 */
export default function tip(_tip, _opt) {
    // check the parameters
    _opt = _opt || { type: "normal" };
    (typeof _opt !== "object") && (_opt = { type: String(_opt) });

    if (this instanceof tip) {
        // construct the instance
        const div = document.createElement("div");
        if (div) {
            this[$private] = div;
            this[$options] = _opt;
            div.setAttribute("class", "-season-tip-box");
            div.setAttribute("d-season-tip-type", _opt.type||"normal");
            _opt.customTag && div.setAttribute(_opt.customTag, _opt.customTag);
            div.insertAdjacentHTML("beforeend", `<div class="-season-tip-icon"></div><div class="-season-tip-text">${String(_tip || "").replaceAll("\n", "<br />")}</div>`);
            if (_opt.closable) {
                div.insertAdjacentHTML("beforeend", '<div class="-season-tip-close-button" />');
                const closeBtn = div.querySelector(".-season-tip-close-button");
                closeBtn && closeBtn.addEventListener("click", close.bind(this));
            }
        }
    } else {
        // create an instance and show
        const obj = new tip(_tip, _opt);
        obj && obj.show();
        return obj;
    }
}

/**
 * declare the prototype of the tip class
 */
tip.prototype = {
    close,
    show(_parent) {
        const div = this[$private];
        if ((this instanceof tip) && div && (!div.isConnected)) {
            // prepare the container
            (_parent instanceof HTMLElement) || (_parent = document.body);
            let container = _parent.querySelector(`[${TIP_SELECTOR}]`);
            if (!container) {
                _parent.insertAdjacentHTML("afterbegin", HTML_TIP_CONTAINER);
                container = _parent.querySelector(`[${TIP_SELECTOR}]`);
            }
            // show
            if (container) {
                setTopZIndex(container);
                container.insertAdjacentElement("afterbegin", div);
                Promise.resolve().then(() => div.className = "-season-tip-box -season-tip-fadein");
                const timeout = (Number(this[$options].timeout) || (this[$options].closable ? 0 : 3000));
                timeout && (this[$timerId] = setTimeout(close.bind(this), timeout));
            }
        }
    }
}
