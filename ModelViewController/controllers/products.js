const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product',
        {
            pageTitle: 'Add Product',
        });
}

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop'
        });
    });
}