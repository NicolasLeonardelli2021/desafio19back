const numCPUs = require('os').cpus().length

class informacion{
    async info(){

const memoria =  process.memoryUsage();
const  memoUsada = memoria.rss
let datos={
    
    SO: process.platform,
    versionNode: process.version,
    memoriaUsada: memoUsada,
    ejecutable: process.execPath,
    processId: process.pid,
    carpetaProy: process.cwd(),
    numeroCPU: numCPUs

}
return datos;
    }
}
module.exports = new informacion();