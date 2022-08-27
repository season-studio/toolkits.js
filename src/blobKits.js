/**
 * Convert a base64 string into Blob
 * @param {String} _str The base64 string
 * @returns {Blob} The blob result
 */
export function blobFromBase64(_str) {
    if (_str) {
        let arr = String(_str).split(',');
        let opt;
        let bstr;
        if (arr.length > 1) {
            opt = {
                type: arr[0].match(/:(.*?);/)[1]
            };
            bstr = atob(arr[1]);
        } else {
            opt = {};
            bstr = arr[0] ? atob(arr[0]) : "";
        }
        let len = bstr.length;
        let u8arr = new Uint8Array(len);
        while (len--) {
            u8arr[len] = bstr.charCodeAt(len);
        }
        return new Blob([u8arr], opt);
    }
}

/**
 * Convert a Blob to base64 string
 * @param {Blob} _blob The source to be converted
 * @param {Boolean} _plainContent Optional. Set true to remove the type-prefix in the result
 * @returns {String} The base64 string of the result
 */
export function blobToBase64(_blob, _plainContent) {
    return Promise.resolve(_blob instanceof Blob ? new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            reader.onload = function (e) { 
                try {
                    let result = String(e.target.result || "");
                    if (_plainContent) {
                        result = result.split(",");
                        result = (result.length > 1) ? result[1] : result[0];
                    }
                    resolve(result);
                } catch(err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject();
            reader.readAsDataURL(_blob);
        } catch (err) {
            reject(err);
        }
    }) : undefined);
}

/**
 * Convert a Blob into a buffer
 * @param {Blob} _blob The source to be converted
 * @param {Function} _fn Optional. The callback function to convert the ArrayBuffer customlize
 * @returns {ArrayBuffer|Any} The result
 */
export function blobToBuffer(_blob, _fn) {
    return Promise.resolve(_blob instanceof Blob ? new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            reader.onload = function (e) { 
                try {
                    let result = e.target.result;
                    (typeof _fn === "function") && (result = _fn(result));
                    resolve(result);
                } catch(err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject();
            reader.readAsArrayBuffer(_blob);
        } catch (err) {
            reject(err);
        }
    }) : undefined);
}