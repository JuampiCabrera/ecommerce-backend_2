import cartModel from "../models/cartModels.js";
import productModel from "../models/productModels.js";

export const getCart = async(req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({_id: cartId})
        if(cart){
            res.status(200).send(cart)
        }else{
            res.status(404).send("el carrito no existe")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}
export const insertProductCart = async(req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const {quanity} = req.body
        const cart = await cartModel.findOne({_id:cartId})
        if(cart){
            const product = await productModel.findById(productId)
            if(product){
                if(product.stock >= quantity){
                    const indice = cart.products.findIndex(prod => prod._id == productId)

                        if(indice != -1){
                            cart.products[indice].quantity = quantity
                        }else{
                            cart.products.push({id_prod: productId, quantity: quantity})
                        }
                    await cartModel.findByIdAndUpdate(cartId, cart)
                    res.status(200).send("Carrito actualizado correctamente")
                } else {
                    res.status(400).send("no hay stock disponible")
                }
            }else{
                res.status(404).send("el producto no existe")
            }
        }else {
            res.status(404).send("el carrito no existe")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}
export const deleteProductCart = async(req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const cart = await cartModel.findOne({_id: cartId})
            if(cart){
                const indice = await cart.products.findIndex(prod => prod._id == productId)
                if(indice != -1){
                    cart.products.splice(indice, 1)
                    cart.save()
                    res.status(200).send(cart)
                }else{
                    res.status(404).send("el producto no existe en el carrito")
                }
            }else{
                res.status(404).send("el carrito no existe")
            } 
    } catch (e) {
        res.status(500).send(e)
    }
}

export const deleteCart = async(req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({_id: cartId})
        if(cart){
            cart.products = []
            cart.save()
            res.status(200).send(cart)
        }else{
            res.status(404).send("el carrito no existe")
        } 
    } catch (e) {
        res.status(500).send(e)
    }
}