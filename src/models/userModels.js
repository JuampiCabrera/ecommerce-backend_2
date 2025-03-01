import {model, Schema} from "mongoose"
import cartModel from "./cartModels.js"

const userSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    rol: {
        type: String,
        default: "user",
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    }

})

userSchema.post("save", async function(doc) {
    try {
        if(!doc.cart) {
            const newCart = await cartModel.create({products: []})
            await model("users").findByIdAndUpdate(doc._id, {cart: newCart._id})
        }
    } catch (e) {
        console.log(e);
        
    }
})

const userModel = model("users", userSchema)

export default userModel