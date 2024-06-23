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
    static obtenerTelefonoById=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const telefono = await TelefonoContacto.findById(id)
            if(!telefono){
                const error = new Error("Telefono no encontrado")
                return res.status(404).json({error:error.message})

            }
            res.json(telefono)
        } catch (error) {
            console.log(error)
        }
    }
    static actualizarTelefono=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const telefono = await TelefonoContacto.findById(id)
            if(!telefono){
                const error=new Error("Telefono no encontrado")
                return res.status(404).json({error:error.message})
            }
            telefono.telefono=req.body.telefono  
            await telefono.save()
            res.send("Telefono Actualizado")          
        } catch (error) {
            console.log(error)
        }
    }
    static eliminarTelefono=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const telefono = await TelefonoContacto.findById(id)
            if(!telefono){
                const error=new Error("Telefono no encontrado")
                return res.status(404).json({error:error.message})
            }
            await telefono.deleteOne()
            res.send("Telefono eliminado")          
        } catch (error) {
            console.log(error)
        }
    }
}