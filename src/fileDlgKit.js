/**
 * 动态触发链接
 * @param {String} _url 链接地址
 * @param {Object} _opt 选项，可以忽略
 */
 export function dynInvokeLink(_url, _opt) {
    if (_url) {
        const aElement = document.createElement("a");
        if (aElement) {
            aElement.href = _url;
            aElement.rel = "noopener";
            if (_opt) {
                for (const name in _opt) {
                    aElement[name] = _opt[name];
                }
            }
            aElement.click();
        }
    }
}

/**
 * 拾取文件
 */
export function pickFile(_fileType) {
    return new Promise((resoleve, reject) => {
        try {
            const inputElement = document.createElement("input");
            inputElement.type = "file";
            _fileType && (inputElement.accept = _fileType);
            inputElement.addEventListener("change", () => { 
                const files = inputElement.files;
                if (files.length > 0) {
                    resoleve(files[0]);
                } else {
                    reject(0);
                }
            });
            inputElement.click();
        } catch (error) {
            reject(error);
        }
    });
}
