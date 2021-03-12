const SYM_TYPE_ATTR = "season-tip-type";
const TIP_SELECTOR = `${SYM_TYPE_ATTR}="tip"`;
const HTML_TIP_CONTAINER = `<div class="-season-tip-container" ${TIP_SELECTOR} />`;

const $private = Symbol("season-tip-private");

/**
 * get the top zindex in the current view
 */
function getTopZIndex() {
    return [...document.body.querySelectorAll("*")].reduce((r, e) => 
                Math.max(r, Number(window.getComputedStyle(e).zIndex) || 0), 
            0) + 1;
}

/**
 * close the tip
 * must be call as the method of an instance
 */
function close() {
    const obj = this[$private];
    if (obj) {
        (typeof obj.remove === "function") && obj.remove();
        obj.$timerId && (clearTimeout(obj.$timerId), obj.$timerId = undefined);
        const onclose = (obj.$options && obj.$options.onclose);
        typeof onclose === "function" && onclose(this);
    }
}

/**
 * show tip
 * @param {*} _tip the text of the tip
 * @param {String|Object} _opt the type or the option object, this parameter can be ignore for normal tip
 * @param {String} [_opt.type=undefined] the type of the tip, can be set as "info", "warn", "error", "normal"
 * @param {Boolean} [_opt.closable=false] if the tip can be close manually
 * @param {Number} [_opt.timeout] timeout for close the tip automatically, the default value is 0ms if the closable is set to true, else is 3000ms
 * @return {tip} the instance of the tip
 */
export function tip(_tip, _opt) {
    // check the parameters
    _opt = _opt || { type: "normal" };
    (typeof _opt !== "object") && (_opt = { type: String(_opt) });

    if (this instanceof tip) {
        // construct the instance
        const div = document.createElement("div");
        if (div) {
            this[$private] = div;
            div.$options = _opt;
            div.setAttribute("class", `-season-tip-box -season-tip-type-${_opt.type||"normal"}`);
            div.insertAdjacentHTML("beforeend", `<div class="-season-tip-icon"></div><div class="-season-tip-text">${_tip}</div>`);
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
        if ((this instanceof tip) && div) {
            // prepare the container
            (_parent instanceof HTMLElement) || (_parent = document.body);
            let container = _parent.querySelector(`[${TIP_SELECTOR}]`);
            if (!container) {
                _parent.insertAdjacentHTML("afterbegin", HTML_TIP_CONTAINER);
                container = _parent.querySelector(`[${TIP_SELECTOR}]`);
            }
            // show
            if (container) {
                container.style.zIndex = getTopZIndex();
                container.insertAdjacentElement("afterbegin", div);
                const timeout = (Number(div.$options.timeout) || (div.$options.closable ? 0 : 3000));
                timeout && (div.$timerId = setTimeout(close.bind(this), timeout));
            }
        }
    }
}

export default {
    install(Vue, options) {
        if (!Vue) return;

        Vue.prototype.$tip = tip;
    },
    tip,
}