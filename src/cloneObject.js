export function cloneObject(_target, _source) {
    if (_target && _source) {
        Object.assign(_target, _source);
        for (let key in _target) {
            let item = _target[key];
            if (item && (typeof item === "object")) {
                _target[key] = cloneObject((item instanceof Array) ? [] : {}, _source[key]);
            }
        }
    }
    return _target;
}