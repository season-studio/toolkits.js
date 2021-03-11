let wordSet = {};
let locale = undefined;
let isRec = false;
let recordI18n = {};
let loader = undefined;

function toString() {
    return this.message || "";
}

/**
 * get a string in current locale
 * @param {*} _t the origin string, it may be in English generally.
 * @returns {*} the locale string. If the result is an object, it contains the toString method to convert the "message" member as the string value of the object.
 */
export function $T(_t) {
    const found = ((locale && locale[_t]) || _t);
    if (found && (typeof found === "object")) {
        found.toString = toString;
    }
    isRec && (recordI18n[_t] = found);
    return found;
}

/**
 * config this module
 * @param {Object} _options the options
 * @param {Object} [_options.data={}] the locale dictionaries, for example: { "zh-cn": {"hello": "你好", "bye": "再见"}, "en-us": {...}}
 * @param {Function} [_options.loader=undefined] a base url string or a function used to load a locale dictionary if it can't be found in the _options.data
 */
$T.config = function (_options) {
    _options || (_options = {});
    wordSet = _options.data || {};
    loader = _options.loader;
}

/**
 * install as a compement of VUE
 * @param {*} Vue the Vue class
 * @param {*} options the options to config the module, @see config
 */
$T.install = function (Vue, options) {
    if (!Vue) return;

    $T.config(options);

    Vue.prototype.$T = $T;
}

Object.defineProperties($T, {
    /**
     * the flag if the module will record each request of the locale string
     * @access public
     */
    enableRecord: {
        get: () => isRec,
        set: (_val) => isRec = _val
    },
    /**
     * the record of each request of the locale string
     * @access public
     */
    record: {
        get: () => JSON.stringify(recordI18n)
    }
});

/**
 * set the current locale
 * @param {*} _locale the locale name
 */
$T.setLocale = async function (_locale) {
    locale = (wordSet && wordSet[_locale]);
    if (!locale && loader) {
        try {
            if (typeof loader === "function") {
                const ret = loader(_locale);
                if (ret instanceof Promise) {
                    locale = await ret;
                } else {
                    locale = ret;
                }
            } else {
                locale = await fetch(`${loader}${_locale}.json`).then(resp => resp.json());
            }
        } catch {
            locale = {};
        }
    }
    return locale;
}
