//let {config} = require("../config");
let mongo = require("./dbs/mongodb");
let chat = require("./dbChat/mongoChat")

class DAOS{
    constructor(){
        this.db = mongo;
        this.chat = chat;
    }

    async checkUser(obj){
        try {
            
            return this.db.readUser(obj);
        } catch (error) {
            console.log(error)
        }
    }
    async createUser(obj){
        try {
            return this.db.createUser(obj);
        } catch (error) {
            console.log(error);
        }
    }

    async readChat(){
        try {
            return this.chat.readChat();
        } catch (error) {
            console.log(error)
        }
    }

    async createChat(obj){
        try {
            return this.chat.createChat(obj);
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new DAOS();