let DAOS = require("../../../models/DAOS");
let faker = require("../../faker")
class Auth {
    async check(name,password){
        try {
            let rees = {
                username: name,
                password: password
            }
           
            return await DAOS.checkUser(rees);
           
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(obj){
        try {
            return await DAOS.createUser(obj)
            }
         catch (error) {
            console.log(error)
        }
    }

    }

    module.exports= new Auth();