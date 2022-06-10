let {mongoose} = require("../../config/mongoDB")
let {Schema, model} = mongoose;

const mensajeSchema = new Schema({
        mail:{type:String},
        nombre:{type:String},
        apellido:{type:String},
        edad:{type:Number},
        alias: {type:String},
        avatar:{type:String},
        text:{type:String},
        hora:{type:String} 
})

let mensajeModel = new model('mensajes', mensajeSchema)

class ChatMongo{
    async readChat(){
        try {
            let res = await mensajeModel.find({});
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async createChat(obj){
        try {
            let res = await mensajeModel.create(obj);
            return res;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new ChatMongo();