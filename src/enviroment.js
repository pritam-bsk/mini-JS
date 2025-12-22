export class Environment {
    constructor() {
        this.values = new Map();
    }

    get(name) {
        if (this.values.has(name)) return this.values.get(name);
        throw new Error(`Undefined variable '${name}'`);
    }

    assign(name, value) {
        if (this.values.has(name)) {
            this.values.set(name, value);
            return;
        }
        
        throw new Error(`Undefined variable '${name}'`);
    }
}