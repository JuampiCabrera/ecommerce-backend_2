import generateToken from "../utils/jwt.js"

export const register = async (req, res) => {
    try {
        if(!req.user._id)
            return res.status(400).json({message: "Todos los atributos son necesarios"})
        return res.status(201).json({message: "Usuario creado correctamente"})
    } catch (e) {
        res.status(500).json({message: e})
    }
}

export const login = async (req, res) => {
    try {
        if(!req.user._id)
            return res.status(400).json({message:"Usuario o contraseña no son validos"})

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        return res.status(200).cookie('coderSession', generateToken(req.user),{
            httpOnly: true,
            secure: false,
            maxAge: 8640000 
        }).json({message:"Usuario logeado correctamente"})
    } catch (e) {
        req.status(500).json({message: e})
    }
}

export const githubLogin = (req, res) => {
    try {
        if(!req.user){
            res.status(400).send("Usuario ya registrado")
        }else{
            req.session.user = {
                email: req.user.email,
                first_name: req.user.first_name
            }
            res.status(200).cookie('coderSession', generateToken(req.user),{
                httpOnly: true,
                secure: false,
                maxAge: 8640000 
            }).send("Usuario logeado correctamente")
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

export const viewLogin = (req, res) => {
    res.status(200).render('templates/login', {
        title: "Inicio de Sesion de Registro de Usuario",
        url_js: "/js/login.js",
        url_css: "/css/main.css"
    })
}

export const viewRegister = (req, res) => {
    res.status(200).render('templates/register', {
        title: "Registro de Usuario",
        url_js: "/js/register.js",
        url_css: "/css/main.css"
    })
}