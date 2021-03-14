/**
 * define readonly member is an object
 * @param {*} _obj the target object instance the member will be defined
 * @param {String|Object} _prop the member's key, or an object the member's of which will be copy into the target object
 * @param {*} _value if the _prop is String, this parameter means the value of the member
 * @returns {*} the same of "_obj"
 */
export function readonlyMember(_obj, _prop, _value) {
    if (_obj && _prop) {
        if (typeof _prop === "object") {
            for (let item in _prop) {
                Object.defineProperty(_obj, item, {
                    value: _prop[item], 
                    writable: false,
                    enumerable: true
                });
            }
        } else {
            Object.defineProperty(_obj, _prop, {
                value: _value, 
                writable: false,
                enumerable: true
            });
        }
    }
    return _obj;
}