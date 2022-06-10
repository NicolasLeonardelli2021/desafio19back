let {Router} = require("express");
let authController = require("./controllerAuth/authController");

module.exports = app =>{
    let router = new Router();

     app.use("/auth", router);
    //router.get("/login",)
    router.post("/login",authController.login);
    router.post("/registro",authController.register);
    router.get("/olvidar", authController.olvidar);

   
    
}