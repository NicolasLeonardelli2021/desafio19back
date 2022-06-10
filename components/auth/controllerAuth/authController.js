let authService = require("../servicesAuth/serviceAuth")
let winston = require("../../../utils/loggers/winston")
class Auth {
    async login(req,res,next){
        winston.info(" get /login")
        let {name,password} = req.body;
        let response = await authService.check(name,password);

        if(response != ""){
            req.session.nombre = response[0].name
            req.session.email = response[0].email
            res.redirect("/");
        }else{
            res.render("error",{})
        }
    }
    async register(req,res,next){
        winston.info(" post /register")
        let datos = req.body
            console.log(datos)
             await authService.createUser(datos)
             res.redirect("/auth")

    }

    async olvidar(req,res,next){
        winston.info(" get /olvidar")
        let name = req.session.nombre;
        req.session.destroy(err =>{
            if(err) res.json({error: JSON.stringify(err) });
            res.render("logout", {name});      
        })
    }

}

module.exports= new Auth();