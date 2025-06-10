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
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        console.log('Created Product');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts({ where: { id: prodId } })
        // Product.findByPk(prodId)
        .then(products => {
            const product = products[0];
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product',
                {
                    pageTitle: "Edit Product",
                    editing: editMode,
                    product: product
                });
        }).catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    Product.findByPk(prodId)
        .then(product => {
            product.title = title;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            return product.save()
        })
        .then(result => {
            console.log('Updated Product')
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });

}

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products'
            });
        }).catch(err => {
            console.log(err);
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => console.log('Destroyed Product'))
        .catch(err => {
            console.log(err);
        })
    res.redirect('/admin/products');
}