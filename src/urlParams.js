const $private = Symbol("season.urlparams.private");

class URLGetParams {
    constructor (_searchStr) {
        const params = (this[$private] = {});
        String(_searchStr).split("&").forEach(item => {
            let { 0:name, 1:value } = item.split("=");
            params[name] = ((undefined === value) ? true : decodeURIComponent(value));
        });
    }

    get(_name) {
        return this[$private][_name];
    }

    getAll(_name) {
        return this[$private][_name];
    }

    has(_name) {
        return Object.hasOwnProperty.call(this[$private], _name);
    }

    keys() {
        return Object.keys(this[$private]);
    }

    * entries() {
        const params = this[$private];
        for (let key in params) {
            yield [key, params[key]];
        }
    }

    forEach(_cb, _thisArg) {
        if (typeof _cb === "function") {
            const params = this[$private];
            for (let key in params) {
                _cb.call(_thisArg, params[key], key, this);
            }
        }
    }
}

export const URLParams = (('URLSearchParams' in window) ? window.URLSearchParams : URLGetParams);
