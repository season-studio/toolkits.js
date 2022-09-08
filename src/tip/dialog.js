import { $private, $resolve, $options, $timerId, FlexAlignMap, setTopZIndex, close } from "./public";

export default function dialog(_ElementOrHTML, _opt) {
    // check the parameters
    _opt = _opt || { };
    
    if (this instanceof dialog) {
        // construct the instance
        const div = document.createElement("div");
        Object.defineProperties(this, {
            result: {
                get: () => this[$result],
                set: (val) => (this[$result] = val)
            },
            options: {
                get() { return _opt; }
            },
            root: {
                get() { return div; }
            }
        });
        if (div) {
            this[$private] = div;
            this[$options] = _opt;
            div.setAttribute("class", `-season-tip-mask-container`);
            if (_opt.maskAttrs) {
                for (let key in _opt.maskAttrs) {
                    div.setAttribute(key, _opt.maskAttrs[key]);
                }
            }
            (_ElementOrHTML instanceof HTMLElement)
                ? div.insertAdjacentElement("afterbegin", _ElementOrHTML)
                : div.insertAdjacentHTML("afterbegin", String(_ElementOrHTML));
            const dlgNode = div.lastElementChild;
            dlgNode && dlgNode.classList.add("-season-tip-dialog");
            div.addEventListener("click", (e) => {
                if (e.target === div) {
                    (_opt.hasOwnProperty("blurToClose")) && this.close(_opt.blurToClose);
                } else {
                    for (let node of e.composedPath()) {
                        if (node.hasAttribute("d-click")) {
                            let fn = _opt[node.getAttribute("d-click")];
                            if (typeof fn === "function") {
                                let args = JSON.parse(`[${node.getAttribute("d-click-args")}]`);
                                args.unshift(this, node);
                                fn.apply(this, args);
                            }
                            break;
                        } else if (node === div) {
                            break;
                        }
                    }
                }
            });
            (typeof _opt.onInitialize === "function") && _opt.onInitialize(this);
        }
    } else {
        // create an instance and show
        const obj = new dialog(_ElementOrHTML, _opt);
        return obj.show();
    }
}

dialog.prototype = {
    close,
    show(_parent) {
        return new Promise((resolve, reject) => {
            const div = this[$private];
            if ((this instanceof dialog) && div && (!div.isConnected)) {
                this[$resolve] = resolve;
                (_parent instanceof HTMLElement) || (_parent = document.body);
                setTopZIndex(div);
                _parent.insertAdjacentElement("beforeend", div);
                Promise.resolve().then(() => div.className = "-season-tip-mask-container -season-tip-fadein");
            } else {
                reject(new Error("Reactive"));
            }
        });
    }
}
