const Product = require('../models/product');
const Cart = require('../models/cart');



exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Products'
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product =>{
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Product Not Found' });
        }
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title
        });
    })
}

exports.getIndex = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop'
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart'
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout'
    });
}