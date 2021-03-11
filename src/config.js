const cache = {

};

const defaultValues = {

}

export const config = {
    register(_name, _defVal) {
        console.log("config register");
        if (typeof _name === "string") {
            defaultValues[_name] = _defVal;
            (cache[_name] === undefined) && (cache[_name] = _defVal);
        } else if (_name) {
            for (let key in _name) {
                let val = _name[key]
                defaultValues[key] = val;
                (cache[key] === undefined) && (cache[key] = val);
            }
        }
    },
    async load() {
        console.log("config load");
        const json = localStorage.getItem("config");
        if (json) {
            const values = JSON.parse(json);
            for (let key in values) {
                cache[key] = values[key];
            }
        }
    },
    save() {
        localStorage.setItem("config", JSON.stringify(cache));
    },
    get(_name) {
        if (_name !== undefined) {
            const val = cache[_name];
            return (val === undefined) ? defaultValues[_name] : val;
        } else {
            return cache;
        }
    },
    set(_name, _val) {
        if (typeof _name === "string") {
            cache[_name] = _val;
            this.save();
        } else if (_name) {
            for (let key in _name) {
                cache[key] = _name[key];
            }
            this.save();
        }
    },
    reset(_name) {
        if (_name) {
            cache[_name] = defaultValues[_name];
        } else {
            for (let key in defaultValues) {
                cache[key] = defaultValues[key];
            }
        }
        this.save();
    }
}
