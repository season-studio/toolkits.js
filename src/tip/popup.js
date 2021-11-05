import { $private, $resolve, $options, $timerId, $result, FlexAlignMap, setTopZIndex, close } from "./public";

export default function popup(_list, _refElement, _opt) {
    (_list instanceof Array) || (_list = [String(_list)]);
    let opt = {};
    if (_refElement instanceof Element) {
        opt.refElement = _refElement;
    } else if (arguments.length === 2) {
        Object.assign(opt, _refElement);
    }
    _opt && Object.assign(opt, _opt);
    
    if (this instanceof popup) {
        // construct the instance
        Object.defineProperties(this, {
            result: {
                get: () => this[$result]
            },
            count: {
                value: _list.length,
                writable: false
            }
        });
        const div = document.createElement("div");
        if (div) {
            this[$private] = div;
            this[$options] = opt;
            div.setAttribute("class", `-season-tip-dialog -season-tip-popup-box`);
            div.setAttribute("tabIndex", "0");
            opt.customTag && div.setAttribute(opt.customTag, opt.customTag);
            isNaN(opt.fadeOutTime) && (opt.fadeOutTime = 0.1);
            opt.style && div.setAttribute("style", opt.style);
            div.insertAdjacentHTML("beforeend", _list.map((item, index) => {
                return ((null !== item) && (undefined !== item)) 
                            ? `<a d-select-index="${index}">${item.image ? `<img src="${item.image}" ${item.imageInvert ? 'd-image-invert="1"' : ""} ${(item.imageSize instanceof Array) ? `width="${item.imageSize[0]}" height="${item.imageSize[1]}"` : ""} />${item.text}` : item}</a>`
                            : '<div d-separate-horizontal="1"></div>';
            }).join(""));
        }
    } else {
        const dlg = new popup(_list, opt);
        return dlg.show(opt.refElement);
    }
}

popup.prototype = {
    close,
    show(_refElement) {
        return new Promise((resolve, reject) => {
            const div = this[$private];
            if ((this instanceof popup) && div && (!div.isConnected)) {
                const opt = this[$options];
                this[$resolve] = resolve;
                this[$result] = undefined;

                setTopZIndex(div);
                document.body.insertAdjacentElement("beforeend", div);
                setTimeout(() => div.className = "-season-tip-dialog -season-tip-popup-box -season-tip-fadein", 0);
                div.addEventListener("blur", (e) => {
                    this.close(undefined);
                }, { once: true });
                [...div.querySelectorAll("[d-select-index]")].forEach(item => {
                    item.addEventListener("click", (e) => {
                        this.close(Number(e.target.getAttribute("d-select-index")));
                    });
                });

                _refElement || (_refElement = opt.refElement);
                if (_refElement instanceof Element) {
                    const { width, height } = div.getBoundingClientRect();
                    const { left:refLeft, right:refRight, top:refTop, bottom:refBottom } = _refElement.getBoundingClientRect();
                    const { innerWidth:winWidth, innerHeight:winHeight } = window;
                    const positionStyle = String(opt.position).toLowerCase().split("&");
                    
                    let left = "auto", right = "auto", top = "auto", bottom = "auto";
                    if (positionStyle.includes("top")) {
                        bottom = refTop;
                    } else if (positionStyle.includes("top-align")) {
                        top = refTop;
                    } else if (positionStyle.includes("bottom-align")) {
                        bottom = refBottom;
                    } else {
                        top = refBottom;
                    }
                    if (Number(bottom)) {
                        if ((bottom - height) < 0) {
                            bottom = "auto";
                            top = 0;
                        } else {
                            bottom = `${winHeight - bottom}px`;
                        }
                    }
                    if (Number(top)) {
                        if ((top + height) > winHeight) {
                            top = Math.max(0, winHeight - height);
                        }
                        top = `${top}px`;
                    }
                    if (positionStyle.includes("left")) {
                        right = refLeft;
                    } else if (positionStyle.includes("right")) {
                        left = refRight;
                    } else if (positionStyle.includes("right-align")) {
                        right = refRight;
                    } else {
                        left = refLeft;
                    }
                    if (Number(right)) {
                        if ((right - width) < 0) {
                            right = "auto";
                            left = 0;
                        } else {
                            right = `${winWidth - right}px`;
                        }
                    }
                    if (Number(left)) {
                        if ((left + width) > winWidth) {
                            left = Math.max(0, winWidth - width);
                        }
                        left = `${left}px`;
                    }
                    div.setAttribute("style", `left:${left};right:${right};top:${top};bottom:${bottom};${opt.style||""}`);
                }

                div.focus();
            } else {
                reject(new Error("Reactive"));
            }
        });
    }
}

popup.bindElement = function (_refElement, _event, _cb, _list, _opt) {
    if (_refElement instanceof Element) {
        _refElement.addEventListener(_event || "click", () => {
            popup(_list, _refElement, _opt).then((typeof _cb === "function") ? _cb: console.log);
        });
    }
}
