let infoService = require("../serviceInfo/infoService");

class informacion{
    async info(req,res){

        let response = await infoService.info();
        if(response){
            res.render("info",{response})
        }else{
            res.render("error",{})
        }
    }
}
  
    

module.exports= new informacion;