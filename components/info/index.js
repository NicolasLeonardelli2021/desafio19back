let {Router} = require("express");
let infoController = require("./controllerInfo/infoController");

module.exports = app =>{
    let router = new Router();

     app.use("/", router);
    //router.get("/login",)
    router.get("/info",infoController.info);
    
    
}