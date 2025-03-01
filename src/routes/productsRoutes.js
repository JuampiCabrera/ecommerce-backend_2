import { Router } from "express";
import passport from "passport";
import { authorization } from "../config/middlewares.js";
import { getProducts, getProduct, createProducts, updateProduct, deleteProduct } from "../controllers/productsController.js";

const productsRouter = Router()

productsRouter.get('/', passport.authenticate("jwt"), getProducts)
productsRouter.get('/:pid', passport.authenticate("jwt"), getProduct)
productsRouter.post('/', passport.authenticate("jwt"), authorization('Admin'),createProducts)
productsRouter.put('/:pid', passport.authenticate("jwt"), authorization('Admin'),updateProduct)
productsRouter.delete('/:pid', passport.authenticate("jwt"), authorization('Admin'),deleteProduct)


export default productsRouter