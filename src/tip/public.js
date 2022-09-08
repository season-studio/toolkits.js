export const $private = Symbol("season-tip-private");
export const $resolve = Symbol("season-tip-resolve");
export const $options = Symbol("season-tip-options");
export const $timerId = Symbol("season-tip-timerid");
export const $result = Symbol("season-tip-result");

export const FlexAlignMap = {
    "center": "center",
    "left": "flex-start",
    "right": "flex-end",
    "top": "flex-start",
    "bottom": "flex-end",
    "start": "flex-start",
    "end": "flex-end"
};

/**
 * get the top zindex in the current view
 */
export function getTopZIndex() {
    return [...document.body.querySelectorAll("*")].reduce((r, e) => 
                Math.max(r, Number(window.getComputedStyle(e).zIndex) || 0), 
            0) + 1;
}

/**
 * set an element to the top z-index
 * @param {*} _element 
 */
export function setTopZIndex(_element) {
    let topZ = getTopZIndex();
    if ((Number(_element.style.zIndex) !== (topZ - 1)) || (topZ === 1)) {
        _element.style.zIndex = topZ;
    }
}

const transitionMap = {
    transition: {
        Start: "transitionstart",
        Run: "transitionrun",
        Cancel: "transitioncancel",
        End: "transitionend"
    },
    OTransition: {
        Start: "oTransitionStart",
        Run: "oTransitionRun",
        Cancel: "oTransitionCancel",
        End: "oTransitionEnd"
    },
    MozTransition: {
        Start: "transitionstart",
        Run: "transitionrun",
        Cancel: "transitioncancel",
        End: "transitionend"
    },
    WebkitTransition: {
        Start: "webkitTransitionStart",
        Run: "webkitTransitionRun",
        Cancel: "webkitTransitionCancel",
        End: "webkitTransitionEnd"
    }
};
let transitionEvent = undefined;

document.addEventListener("readystatechange", function() {
    if (document.readyState === "complete") {
        for (let name in transitionMap) {
            if (document.body.style[name] !== undefined) {
                transitionEvent = transitionMap[name];
                break;
            }
        }
    }
});

/**
 * close the tip
 * must be call as the method of an instance
 * @param {*} _result the value as the result of the promise, only effected when the tip show as a promise
 */
export function close(_result) {
    this[$result] = _result;
    const obj = this[$private];
    const opt = this[$options];
    const fn = () => {
        (typeof obj.remove === "function") && Promise.resolve().then(() => {
            obj.remove();
            typeof this[$resolve] === "function" && (this[$resolve](_result), delete this[$resolve]);
        });
        this[$timerId] && (clearTimeout(this[$timerId]), this[$timerId] = undefined);
        const onclose = (opt && opt.onclose);
        typeof onclose === "function" && onclose(this, _result);
    };
    if ((obj instanceof Element) && obj.isConnected && (!obj.classList.contains("-season-tip-fadeout"))) {
        if (transitionEvent && (0 !== opt.fadeOutTime)) {
            if (!isNaN(opt.fadeOutTime)) {
                obj.setAttribute("style", `--fadeout-time:${opt.fadeOutTime}s;${obj.getAttribute("style")}`);
            }
            obj.className = `${obj.className} -season-tip-fadeout`;
            obj.addEventListener(transitionEvent.End, fn, { once: true });
            obj.addEventListener(transitionEvent.Cancel, fn, { once: true });
        } else {
            fn();
        }
    }
}
