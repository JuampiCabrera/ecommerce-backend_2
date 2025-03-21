import "dotenv/config"
import jwt from "jsonwebtoken"


const generateToken = (user) => {
    //parametro1: objeto a almacenar, parametro2: contraseña, parametro3: TTL tiempo de vida
    const token = jwt.sign({_id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, age: user.age, rol: user.rol}, process.env.SECRET_JWT, {expiresIn: '24h'})
    return token
}

export default generateToken