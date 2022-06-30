const PRIVATE_SYMBOL = Symbol("season.$private");

export function privateMember(_obj, _prop, _value) {
    if (_obj && _prop) {
        if (typeof _prop === "object") {
            Object.assign((_obj[PRIVATE_SYMBOL] || (_obj[PRIVATE_SYMBOL] = {})), _prop);
        } else {
            (_obj[PRIVATE_SYMBOL] || (_obj[PRIVATE_SYMBOL] = {}))[_prop] = _value;
        }
    }
    return _obj;
}

export function getPrivate(_obj) {
    return (_obj[PRIVATE_SYMBOL] || (_obj[PRIVATE_SYMBOL] = {}));
}