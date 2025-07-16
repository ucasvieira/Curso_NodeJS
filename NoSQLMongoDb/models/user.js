const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, required: true }
        }]
    }
})

userSchema.methods.addToCart = function (product) {
    const cartProduct = this.cart.items.findIndex(cp => {
        return cp.product.toString() == product._id.toString();
    })
    let newQuantity = 1;

    const updatedCartItems = [...this.cart.items];
    if (cartProduct >= 0) {
        newQuantity = this.cart.items[cartProduct].quantity + 1;
        this.cart.items[cartProduct].quantity = newQuantity;
        updatedCartItems[cartProduct].quantity = newQuantity;
    } else {
        updatedCartItems.push({ product: product._id, quantity: newQuantity });
    }


    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save()
}

userSchema.methods.deleteItemFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.product.toString() !== productId.toString();
    })
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
}

module.exports = mongoose.model('User', userSchema);