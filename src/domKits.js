/**
 * get the top z-index in the given element
 * @param {HTMLElement} _element the container element, document.body will be taken as default if this parameter is ignored
 * @returns {Number} the top z-index
 */
 export function getTopZIndex(_element) {
    return [...(_element || document.body).querySelectorAll("*")].reduce((r, e) => 
                Math.max(r, Number(window.getComputedStyle(e).zIndex) || 0), 
            0) + 1;
}

/**
 * get the number value from a style value
 * @param {*} _style the style value
 * @param {*} _default the default value using when the style value doesn't contain number value, 0 will be taken if this parameter is ignored.
 * @returns {Number} the number value in the style
 */
export function NumberFromStyle(_style, _default = 0) {
    _style = String(_style).replace(/\D+$/, "");
    return (_style && Number(_style)) || _default;
}

/**
 * get the coordinate of an event in the asix of the given element
 * @param {Event} _e the event
 * @param {HTMLElement} _element the element
 * @returns {Object} {x, y}
 */
export function eventCoordinateFromElement(_e, _element) {
    let x = 0;
    let y = 0;
    while (_element) {
        x += _element.offsetLeft - _element.scrollLeft + _element.clientLeft;
        y += _element.offsetTop - _element.scrollTop + _element.clientTop;
        _element = _element.offsetParent;
    }

    x = _e.pageX - x;
    y = _e.pageY - y;
    return { x, y };
}

/**
 * add a listener for the resize event
 * @param {HTMLElement} _target the target
 * @param {Function|ResizeObserver} _handler the handler
 * @returns {ResizeObserver} the listener server
 */
export function listenResize(_target, _handler) {
    const resizeObserver = _handler instanceof ResizeObserver ? _handler : new ResizeObserver(_handler);
    resizeObserver.observe(_target);
    return resizeObserver;
}

/**
 * invoke a link without displaying
 * @param {String} _url the URL of the link
 * @param {Object} _opt optional parameter, the members in which will be set into the <a> element
 */
 export function dynInvokeLink(_url, _opt) {
    if (_url) {
        const aElement = document.createElement("a");
        if (aElement) {
            aElement.href = _url;
            aElement.rel = "noopener";
            if (_opt) {
                for (const name in _opt) {
                    aElement[name] = _opt[name];
                }
            }
            aElement.click();
        }
    }
}

/**
 * pickup a file
 * @param {String} _fileType the external name of the target files, this parameter is optional
 * @returns {Promise<File|undefined>} the File object of the file picked
 */
export function pickFile(_fileType) {
    return new Promise((resoleve, reject) => {
        try {
            const inputElement = document.createElement("input");
            inputElement.type = "file";
            _fileType && (inputElement.accept = _fileType);
            inputElement.addEventListener("change", () => { 
                const files = inputElement.files;
                if (files.length > 0) {
                    resoleve(files[0]);
                } else {
                    resoleve(undefined);
                }
            });
            inputElement.click();
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * polyfill the button key of the MouseEvent
 * @returns {Number} (1)Left Button; (2)Middle Button; (3)Right Buttton
 */
export function mouseButton(_event) {
    return (_event.which === undefined) ? (_event.button + 1) : _event.which;
}