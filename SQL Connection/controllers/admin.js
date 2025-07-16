const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',
        {
            pageTitle: 'Add Product',
            editing: false
        });
}



exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, imageUrl, description, price);
    product.save()
    .then(() => {
        res.redirect('/')
    })
    .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product',
            {
                pageTitle: "Edit Product",
                editing: editMode,
                product: product
            });
    })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(prodId, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products'
        });
    });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}