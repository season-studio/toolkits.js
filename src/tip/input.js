import { $private, $resolve, $options, $timerId, $result, FlexAlignMap, setTopZIndex, close } from "./public";

export default function input(_title, _tip, _opt) {
    let opt = {};
    if (typeof _title === "string") {
        opt.title = _title;
    } else if (arguments.length === 1) {
        Object.assign(opt, _title);
    } 
    if (typeof _tip === "string") {
        opt.tip = _tip;
    } else if (arguments.length === 2) {
        Object.assign(opt, _tip);
    }
    if (_opt) {
        Object.assign(opt, _opt);
    }

    if (this instanceof input) {
        // construct the instance
        Object.defineProperty(this, "result", {
            get: () => this[$result]
        });
        const div = document.createElement("div");
        if (div) {
            this[$private] = div;
            this[$options] = opt;
            div.setAttribute("class", `-season-tip-mask-container`);
            opt.customTag && div.setAttribute(opt.customTag, opt.customTag);
            isNaN(opt.fadeOutTime) && (opt.fadeOutTime = 0.3);
            div.insertAdjacentHTML("beforeend", 
                `<div class="-season-tip-dialog">
                    ${opt.title ? `<h4 style="margin-top:0">${opt.title}</h4>` : ""}
                    <input class="-season-tip-input" type="${opt.inputType || "text"}" placeholder="${opt.tip||""}" />
                    <div class="-season-tip-button-bar" ${opt.buttonAlign ? `style="justify-content:${FlexAlignMap[opt.buttonAlign]||opt.buttonAlign};"` : ""}>
                        <div class="-season-tip-button -season-tip-button-default" d-button-submit="1">${opt.submitText || "Submit"}</div>
                        ${(opt.hideCancel || opt.forbitCancel) ? "" : `<div class="-season-tip-button" d-button-cancel="1">${opt.cancelText || "Cancel"}</div>`}
                    </div>
                </div>`);
        }
    } else {
        const dlg = new input(opt);
        return dlg.show(opt.position);
    }
}

input.prototype = {
    close,
    show(_position) {
        return new Promise((resolve, reject) => {
            const div = this[$private];
            if ((this instanceof input) && div && (!div.isConnected)) {
                const opt = this[$options];
                this[$resolve] = resolve;
                this[$result] = undefined;

                opt.hideMask && div.setAttribute("style", "background: none !important;");
                _position || (_position = opt.position);
                if (_position) {
                    let dlg = div.querySelector(".-season-tip-dialog");
                    dlg && dlg.setAttribute("style", `
                        position: absolute;
                        left: ${isNaN(_position.x) ? "auto" : (_position.x + "px")};
                        top: ${isNaN(_position.y) ? "auto" : (_position.y + "px")};
                        right: ${isNaN(_position.rx) ? "auto" : (_position.rx + "px")};
                        bottom: ${isNaN(_position.ry) ? "auto" : (_position.ry + "px")};
                    `);
                }

                setTopZIndex(div);
                document.body.insertAdjacentElement("beforeend", div);
                setTimeout(() => div.className = "-season-tip-mask-container -season-tip-fadein", 0);

                let btn = div.querySelector("[d-button-submit]");
                const fnSubmit = () => {
                    let input = div.querySelector("input");
                    this.close(input ? String(input.value) : undefined);
                };
                btn && btn.addEventListener("click", fnSubmit, { once: true });
                btn = div.querySelector("[d-button-cancel]");
                btn && (!opt.forbitCancel) && btn.addEventListener("click", e => {
                    this.close(undefined);
                }, { once: true });
                opt.forbitCancel || div.addEventListener("click", e => {
                    (e.target === div) && this.close(undefined);
                }, { once: true });

                let input = div.querySelector("input");
                if (input) {
                    const fnKeydown = e => {
                        if (13 === e.keyCode) {
                            fnSubmit();
                            e.target.removeEventListener("keydown", fnKeydown);
                        }
                    }
                    input.addEventListener("keydown", fnKeydown);
                    input.value = (opt.default || "");
                    input.select();
                    input.focus();
                }
            } else {
                reject(new Error("Reactive"));
            }
        });
    }
}
