/**
 * assert
 * @param {*} _cond the condition the be asserted
 * @param {*|Function} _error the error will be throw if fail, if take a function as this parameter, the function's result will be throw as an error 
 * @returns {*} the same as the "_cond" parameter
 */
export function assert(_cond, _error) {
    if (_cond) {
        return _cond;
    } else {
        throw typeof _error === "function" ? _error.apply(undefined, [...arguments].slice(2)): _error;
    }
}
