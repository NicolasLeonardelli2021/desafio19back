const res = require("express/lib/response");
const apiAut = require("../components/auth")
const info = require("../components/info");
const faker = require("../components/faker");
const passport = require("passport");

function auth(req,res,next){
    if(req.session?.nombre){
        return next();
    }
    res.redirect('/auth')
} 
//const {isauth} = require("../utils/authenticated")

 

module.exports = app => {
    apiAut(app);
    info(app);
    app.get("/auth", (req, res)=> res.render("login",{}));
    app.get("/registro",(req,res)=> res.render("registro",{}))
    app.get("/info", (req,res)=> res.render("info",{}))
    app.get("/",(req,res)=>{
      
        if(req.user !== undefined){
            req.session.nombre = req.user.displayName;
        }
        let name = req.session.nombre;
        const email = req.session.email;
        
        faker.test()
        .then(array => {
            res.render("index",{name,email,array});
        })
        .catch(error => console.log(error));
    } )
    


    app.all("*", function(req,res,next){
        //winston.warn(`GET ${req.path}`);
        res.send("La ruta no existe");
    })


}
