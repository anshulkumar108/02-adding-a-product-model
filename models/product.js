
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),
'data',
'products.json',
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(data));//parse will convert to parse a JSON string and convert it into a JavaScript object
        }
    })

}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile((products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        }));
        fs.readFile(p, (err, data) => { })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}