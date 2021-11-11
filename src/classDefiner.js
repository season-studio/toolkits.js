const $instance = Symbol("class.definder.instance");

export function singletonClass(_name, _definder) {
    if (_definder) {
        (arguments.length < 2) && (_definder = _name, _name = undefined);
        const _ = {
            constructor: _definder.$constructor,
            [_name]: function () {
                if (this instanceof _[_name]) {
                    if (_[$instance]) {
                        throw new Error(`${_name || "This"} is a singleton class`);
                    }
                    (typeof _.constructor === "function") && _.constructor.apply(this, [...arguments]);
                    _[$instance] = this;
                } else {
                    return _[$instance] || new _[_name](...arguments);
                }    
            }
        };

        const prototype = _[_name].prototype;
        for (let key in _definder) {
            let item = _definder[key];
            item && (
                (typeof item === "function") 
                    ? (prototype[key] = item)
                    : (((undefined === item.enumerable) && (item.enumerable = true)), Object.defineProperty(prototype, key, item))
            );
        };

        return _[_name];
    }
}

export function normalClass(_name, _definder) {
    if (_definder) {
        (arguments.length < 2) && (_definder = _name, _name = undefined);
        const _ = {
            constructor: _definder.$constructor,
            normalFunc: _definder.$function,
            [_name]: function () {
                if (this instanceof _[_name]) {
                    (typeof _.constructor === "function") && _.constructor.apply(this, [...arguments]);
                } else {
                    return (typeof _.normalFunc === "function") ? _.normalFunc.apply(this, [...arguments]) : undefined;
                }    
            }
        };

        const prototype = _[_name].prototype;
        for (let key in _definder) {
            let item = _definder[key];
            item && (
                (typeof item === "function") 
                    ? (prototype[key] = item)
                    : (((undefined === item.enumerable) && (item.enumerable = true)), Object.defineProperty(prototype, key, item))
            );
        };

        return _[_name];
    }
}

export default {
    normalClass,
    singletonClass
};
