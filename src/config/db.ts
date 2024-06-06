import mongoose from 'mongoose'
import colors from 'colors'
<<<<<<< HEAD
import { exit } from 'node:process'

export const connection = mongoose.connection;

export const conexionBaseDeDatos = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log(colors.magenta.yellow(`Base de datos conectado ${connection.port} ${connection.host}`));
    } catch (error) {
        console.log('Error al conectar la base de datos');
        exit(1);
    }
};
=======
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
>>>>>>> be040ec9ebf69f00fd4001870f9dd305d75f8150
