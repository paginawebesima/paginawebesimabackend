import servidor from "./server";

import colors from 'colors'

const puerto = process.env.PORT || 4000 

servidor.listen(puerto,()=>{
    console.log(colors.blue.bold(`Servidor funcionando correctamente en el puerto ${puerto} `))
})