let moment = require("moment")
let DAOS = require("../../models/DAOS")
let winston = require("../loggers/winston")
module.exports = io =>{
    io.on("connection", socket =>{
        winston.info("Nuevo cliente conectado:", socket.id)
        leerBase();
       
        socket.on("nuevoChat",data =>{
            try {
                let datos={
                    ...data,
                    hora: moment().format("YYYY-MM-DD HH:mm:ss")
                    }
                    DAOS.createChat(datos)
                    .then(()=>console.log("mensaje insertado"));
                    io.sockets.emit("mensaje",datos)
            } catch (error) {
                winston.error("error al insertar el mensaje",error)
            }      
        })
        async function leerBase(){
            try{ 
                DAOS.readChat()
                .then((data)=> socket.emit("iniciarChat",data));
                //.then((data)=>console.log(data));
                
           }catch(error){
            winston.error("No se puede leer la base de datos",error)
           }
        } 
    })
}



