import { $private, $resolve, $options, $timerId, FlexAlignMap, setTopZIndex, close } from "./public";

const IconCollection = {
    info: '<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="#40a9ff" stroke-width="4"><g><path d="M47.979 10C27.0038 10 10 27.0038 10 47.979 10 68.9542 27.0038 85.958 47.979 85.958 68.9542 85.958 85.958 68.9542 85.958 47.979 85.9674 27.0132 68.9788 10.0094 48.013 10 48.0017 10 47.9903 10 47.979 10ZM47.979 83.958C28.1083 83.958 12 67.8497 12 47.979 12 28.1083 28.1083 12 47.979 12 67.8497 12 83.958 28.1083 83.958 47.979 83.9354 67.8403 67.8403 83.9354 47.979 83.958Z"/><path d="M49 35 41 35 41 37 47 37 47 67 40 67 40 69 56 69 56 67 49 67 49 35Z"/><circle cx="46.814" cy="26.5" r="2.25"/></g></svg>',
    ok: '<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="#0b0" stroke-width="4"><g><path d="M48 10C27.0071 9.99393 9.98408 27.0071 9.978 48 9.97193 68.9929 26.9851 86.0159 47.978 86.022 68.9709 86.0281 85.9939 69.0149 86 48.022 86 48.018 86 48.014 86 48.01 86.011 27.0287 69.0113 10.011 48.03 10 48.02 10 48.01 10 48 10ZM48 84.021C28.1117 84.0271 11.9841 67.9093 11.978 48.021 11.9719 28.1327 28.0897 12.0051 47.978 11.999 67.8663 11.9929 83.9939 28.1107 84 47.999 84 48.0037 84 48.0083 84 48.013 83.9802 67.8888 67.8758 83.9981 48 84.024Z"/><path d="M41.5 60.086 29 47.586 27.586 49 41.5 62.914 70.914 33.5 69.5 32.086 41.5 60.086Z"/></g></svg>',
    error: '<svg width="26" height="26" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" stroke="red" stroke-width="4"><g><path d="M48 10C27.0071 9.99393 9.98408 27.0071 9.978 48 9.97193 68.9929 26.9851 86.0159 47.978 86.022 68.9709 86.0281 85.9939 69.0149 86 48.022 86 48.018 86 48.014 86 48.01 86.011 27.0287 69.0113 10.011 48.03 10 48.02 10 48.01 10 48 10ZM48 84.021C28.1117 84.0271 11.9841 67.9093 11.978 48.021 11.9719 28.1327 28.0897 12.0051 47.978 11.999 67.8663 11.9929 83.9939 28.1107 84 47.999 84 48.0037 84 48.0083 84 48.013 83.9802 67.8888 67.8758 83.9981 48 84.024Z"/><path d="M62.041 32.557 47.998 46.6 33.955 32.557 32.541 33.971 46.584 48.014 32.541 62.057 33.955 63.471 47.998 49.428 62.041 63.471 63.455 62.057 49.412 48.014 63.455 33.971 62.041 32.557Z"/></g></svg>',
    question: '<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="green" stroke-width="4"><g><path d="M47.979 10C27.0038 10 10 27.0038 10 47.979 10 68.9542 27.0038 85.958 47.979 85.958 68.9542 85.958 85.958 68.9542 85.958 47.979 85.9674 27.0132 68.9788 10.0094 48.013 10 48.0017 10 47.9903 10 47.979 10ZM47.979 83.958C28.1083 83.958 12 67.8497 12 47.979 12 28.1083 28.1083 12 47.979 12 67.8497 12 83.958 28.1083 83.958 47.979 83.9354 67.8403 67.8403 83.9354 47.979 83.958Z"/><path d="M49.345 27.079C42.7414 26.3273 36.7789 31.0712 36.0272 37.6748 35.9759 38.1257 35.9501 38.5792 35.95 39.033L37.95 39.033C37.9522 33.4936 42.4446 29.0048 47.984 29.007 53.5235 29.0093 58.0122 33.5017 58.01 39.0411 58.0086 42.4915 56.2337 45.6991 53.311 47.533 49.4115 49.9087 47.0166 54.131 46.979 58.697L48.979 58.697C49.0205 54.819 51.0627 51.2376 54.379 49.227 60.0072 45.6952 61.7066 38.2696 58.1748 32.6414 56.2307 29.5434 52.9829 27.4979 49.349 27.083Z"/><circle cx="48" cy="67" r="2"/></g></svg>',
    warn: '<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="#faad14" stroke-width="4"><g><path d="M90.6 80 51.5 12C50.4365 10.0946 48.0298 9.41212 46.1244 10.4756 45.4848 10.8326 44.957 11.3604 44.6 12L5.4 80C4.30371 81.9275 4.9775 84.3787 6.90497 85.475 7.5129 85.8208 8.20061 86.0017 8.9 86L87.1 86C89.3174 86.0055 91.1195 84.2124 91.125 81.995 91.1268 81.2956 90.9458 80.6079 90.6 80ZM88.839 83.019C88.4799 83.637 87.8146 84.0123 87.1 84L8.9 84C8.18507 84.0125 7.5195 83.6367 7.161 83.018 6.78807 82.3997 6.77737 81.6284 7.133 81L46.348 12.971C46.8768 12.0316 48.0671 11.6987 49.0065 12.2276 49.3275 12.4082 49.5908 12.676 49.766 13L88.852 80.971C89.2186 81.6057 89.2137 82.389 88.839 83.019Z"/><path d="M48 73.98C47.3953 73.9976 46.8116 73.7577 46.394 73.32 45.9625 72.8895 45.7274 72.3003 45.744 71.691 45.7194 71.0835 45.953 70.4939 46.387 70.068 46.8156 69.6456 47.3985 69.4172 48 69.436 48.6136 69.4208 49.208 69.6503 49.652 70.074 50.1 70.4898 50.3446 71.0802 50.322 71.691 50.3367 72.3033 50.0911 72.8932 49.646 73.314 49.212 73.7526 48.6168 73.9934 48 73.98Z"/><path d="M46.901 62.6 46.578 30.787 49.289 30.787 48.966 62.6 46.901 62.6Z"/></g></svg>'
};

export default function confirm(_tip, _opt) {
    // check the parameters
    _opt = _opt || { };
    (typeof _opt !== "object") && (_opt = ((_opt instanceof Array) ? { buttons: _opt } : { icon: String(_opt) }));
    (arguments[2] !== undefined) && (_opt.buttons = arguments[2]);
    _opt.buttons ? (_opt.buttons instanceof Array || (_opt.buttons = [String(_opt.buttons)])) : (_opt.buttons = ['Close']);
    Number(_opt.default) || (_opt.default = 0);

    if (this instanceof confirm) {
        // construct the instance
        Object.defineProperty(this, "result", {
            get: () => this[$result]
        });
        const div = document.createElement("div");
        if (div) {
            this[$private] = div;
            this[$options] = _opt;
            div.setAttribute("class", `-season-tip-mask-container`);
            _opt.customTag && div.setAttribute(_opt.customTag, _opt.customTag);
            div.insertAdjacentHTML("beforeend", 
                `<div class="-season-tip-dialog -season-confirm-box">
                    <div class="-season-confirm-info-line">
                        ${IconCollection[_opt.icon] || ""}<div class="-season-confirm-info">${String(_tip).replace("\n", "<br />")}</div>
                    </div>
                    <div class="-season-tip-button-bar" ${_opt.buttonAlign ? `style="justify-content:${FlexAlignMap[_opt.buttonAlign]||_opt.buttonAlign};"` : ""}>
                        ${_opt.buttons ? _opt.buttons.map((t, i) => `<div class="-season-tip-button ${i === _opt.default ? "-season-tip-button-default" : ""}" d-index="${i}">${t}</div>`).join("") : ""}
                    </div>
                </div>`);
        }
    } else {
        // create an instance and show
        const obj = new confirm(_tip, _opt);
        return obj.show();
    }
}

function onConfirmTimer(_this, _button, _caption, _timeout) {
    _button.textContent = `${_caption} (${_timeout})`;
    if (_timeout) {
        this[$timerId] = setTimeout(onConfirmTimer, 1000, _this, _button, _caption, _timeout - 1);
    } else {
        this[$timerId] = undefined;
        _this.close(Number(_button.getAttribute("d-index")));
    }
}

confirm.prototype = {
    close,
    show(_parent) {
        return new Promise((resolve, reject) => {
            const div = this[$private];
            if ((this instanceof confirm) && div && (!div.isConnected)) {
                this[$resolve] = resolve;
                (_parent instanceof HTMLElement) || (_parent = document.body);
                setTopZIndex(div);
                _parent.insertAdjacentElement("afterbegin", div);
                Promise.resolve().then(() => div.className = "-season-tip-mask-container -season-tip-fadein");
                [...div.querySelectorAll(".-season-tip-button")].forEach(button => {
                    button.addEventListener("click", e => {
                        this.close(Number(e.target.getAttribute("d-index")));
                    }, { once: true });
                });
                const timeout = Number(this[$options].timeout);
                const defaultButton = div.querySelector(".-season-tip-button-default");
                if (timeout && defaultButton) {
                    const buttonText = defaultButton.textContent;
                    defaultButton.textContent = `${buttonText} (${timeout})`;
                    this[$timerId] = setTimeout(onConfirmTimer, 1000, this, defaultButton, buttonText, timeout - 1);
                }
            } else {
                reject(new Error("Reactive"));
            }
        });
    }
}
