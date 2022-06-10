let {mongoose} = require("../../config/mongoDB")

let {Schema, model} = mongoose;

const usuarioSchema = new Schema({
    email:{type:String},
    name:{type:String},
    imagen:{type:String},
    password:{type:String}

});

let OperacionModel= new model('Usuarios', usuarioSchema)


class MongoDB {
    async readUser(obj){
        try {
            
            let res = await OperacionModel.find({name:obj.username,password:obj.password})
           return res
        } catch (error) {
            console.log(error)
    }
}
async createUser(obj){
    try {
        let res = await OperacionModel.create(obj);
        return res;
    } catch (error) {
        console.log(error);
    }
}
}

module.exports = new MongoDB();