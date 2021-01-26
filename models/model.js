/**
 * File: models/model.js
 * @description Abstract model supporting CRUD operations following NoSQL pattern and using in-memory storage
 * @author Sandeep Singh <contact@ersandeepsingh.com>
 * @license MIT
 */


const memoryStore = {};
const autoincrement = {};

class Model {

    constructor(name = "model", key = "id") {
        this.name = name;
        this.key = key;
    }

    id() {
        autoincrement[this.name] = autoincrement[this.name] || 0;
        return ++autoincrement[this.name];
    }

    getAll() {
        return Object.keys(memoryStore[this.name] || {}).map(key => memoryStore[this.name][key]);
    }

    get(key) {
        return (memoryStore[this.name] || {})[key];
    }

    create(item) {
        memoryStore[this.name] = memoryStore[this.name] || {};
        item[this.key] = this.id();
        return (memoryStore[this.name][item[this.key]] = item);
    }

    update(key, item) {
        memoryStore[this.name] = memoryStore[this.name] || {};
        return (memoryStore[this.name][key] = {
            ... (memoryStore[this.name][key] || {}),
            ... item,
            [this.key]: key
        });
    }

    delete(key) {
        let item = this.get(key);
        if(memoryStore[this.name] !== undefined) {
            delete memoryStore[this.name][key];
        }
        return item;
    }


}

module.exports = Model;