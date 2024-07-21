import mongoose from 'mongoose'
import colors from 'colors'
import {exit} from 'node:process'
export const conexionBaseDeDatos=async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        console.log(colors.magenta.yellow(`Base de datos conectado ${connection.port} ${connection.host}`))        
    } catch (error) {
        console.log('Error al conectar la base de datos')
        exit(1)
    }
}