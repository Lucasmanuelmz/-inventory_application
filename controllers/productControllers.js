
//const {body, validationResult} = require('express-validator');
const db = require('../db/queries');

exports.displayAllProducts = async(req, res) => {
    const products = await db.getAllProducts();
    res.render('index', {
        title: 'Lista de produtos',
        products
    })
}

exports.productCreateGet = async(req, res) => {
    res.render('product');
}

exports.productCreatePost = async(req, res) => {
   const {name, description, price, url, quantity, category_id} = req.body;
   await db.insertProducts(name, description, price, url, quantity, category_id)
   res.redirect('/')
}
