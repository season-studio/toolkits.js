/**
 * define readonly member is an object
 * @param {*} _obj the target object instance the member will be defined
 * @param {String|Object} _prop the member's key, or an object the member's of which will be copy into the target object
 * @param {*} _value if the _prop is String, this parameter means the value of the member
 * @param {Boolean} _enumerable if the member is enumerable
 * @returns {*} the same of "_obj"
 */
export function readonlyMember(_obj, _prop, _value, _enumerable) {
    if (_obj && _prop) {
        if (typeof _prop === "object") {
            const enumerable = ((arguments.length > 2) ? _value : true);
            for (let item in _prop) {
                Object.defineProperty(_obj, item, {
                    value: _prop[item], 
                    writable: false,
                    enumerable
                });
            }
        } else {
            Object.defineProperty(_obj, _prop, {
                value: _value, 
                writable: false,
                enumerable: ((arguments.length > 3) ? _enumerable : true)
            });
        }
    }
    return _obj;
}