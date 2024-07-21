import type {Request,Response} from 'express'
import AdministrativosModelo from '../modelo/administrativos'



export class administrativosControlador{
    static crearAdministrativos=async(req:Request,res:Response)=>{
        const administrativosInformacion = new AdministrativosModelo(req.body)
        try {
            await administrativosInformacion.save()
            res.send("Administrativo creado correctamente")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerAdministrativos=async(req:Request,res:Response)=>{
        try {
            const administrativos = await AdministrativosModelo.find({

            })      
            res.json(administrativos)      
        } catch (error) {
            console.log(error)
        }
    }
    static actualizarAdministrativos=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const administrativos = await AdministrativosModelo.findById(id)
            if(!administrativos){
                const error = new Error("Directivo no encontrado")
                return res.status(404).json({error:error.message})
            }
            administrativos.directivo=req.body.directivo
            administrativos.cargo= req.body.cargo
            await administrativos.save();
            res.send("Administrativo actualizado correctamente")
        } catch (error) {
            console.log(error)
        }

    }
    static eliminarAdministrativos=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const administrativos = await AdministrativosModelo.findById(id)
            if(!administrativos){
                const error = new Error("Administrativo no encontrado")
                return res.status(404).json({error:error.message})
            }
            await administrativos.deleteOne()
            res.send("Administrativo eliminado Correctamente")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerAdministrativosId = async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const administrativos = await AdministrativosModelo.findById(id)
            if(!administrativos){
                const error = new Error("Administrativo no encontrado")
                return res.status(404).json({error:error.message})
            }
            res.json(administrativos)
        } catch (error) {
            console.log(error)
        }
    }
}