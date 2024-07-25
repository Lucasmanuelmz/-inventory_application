
//const {body, validationResult} = require('express-validator');
const db = require('../db/queries');

function dateDoing(date) {
 date < 10? '0'+date: ''+date;
}

exports.displayProducts = async(req, res) => {
    const products = await db.getAllProducts();
    console.log('products', products);
    console.log('name: ', products.map(prod => prod.name).join(', '))
    res.render('index', {
        title: 'Lista de produtos',
        products
    })
}

exports.productCreateGet = async(req, res) => {
    res.render('product');
}

exports.productCreatePost = async(req, res) => {
    let date = new Date();
    let day = dateDoing(date.getDate());
    let month = dateDoing(date.getMonth() + 1);
    let year = getFullYear()
    const created_at = `${day}/${month}/${year}`
    const {name, description, price, category_id} = req.body;
   await db.insertProducts({name, description, price, category_id, created_at})
   res.redirect('/')
}
