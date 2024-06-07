import type {Request,Response} from 'express'
import TelefonoContacto from '../modelo/telefono'

export class TelefonoControlador{
    static creartelefono=async(req:Request,res:Response)=>{
        const telefono1 = new TelefonoContacto(req.body);
        try {
            await telefono1.save();
            res.send("Telefono Creado Correctamente")
        } catch (error) {
            console.log(error)
        }
        
    }
    static obtenerTelefono=async(req:Request,res:Response)=>{
        try {
            const telefono= await TelefonoContacto.find({

            })
            res.json(telefono)
        } catch (error) {
            console.log(error)
        }
    }
    
}