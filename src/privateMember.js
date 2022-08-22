const PrivateMap = new WeakMap();

export function getPrivate(_obj) {
    let ret = PrivateMap.get(_obj);
    ret || PrivateMap.set(_obj, ret = {});
    return ret;
}

export function privateMember(_obj, _prop, _value) {
    if (_obj && _prop) {
        if (typeof _prop === "object") {
            Object.assign(getPrivate(_obj), _prop);
        } else if (arguments.length > 2) {
            return getPrivate(_obj)[_prop] = _value;
        } else {
            return getPrivate(_obj)[_prop];
        }
    }
    return _obj;
}