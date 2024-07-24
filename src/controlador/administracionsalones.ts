import type { Request,Response} from 'express'
import AdministracionSalon from '../modelo/administracion_salon'



export class administracionsaloncontrolador{
    static crearAdministracion=async(req:Request,res:Response)=>{
        const administracion = new AdministracionSalon(req.body)
        try {
            await administracion.save()
            res.send("Prestamo de salon creado")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerAdministracion=async(req:Request,res:Response)=>{
        try {
            const administracion= await AdministracionSalon.find({

            })
            res.json(administracion)
        } catch (error) {
            console.log(error)
        }
    }
    static actualizarAdministracion=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const administracion = await AdministracionSalon.findById(id)
            if(!administracion){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            }
            administracion.persona=req.body.persona
            administracion.grupo=req.body.grupo
            administracion.fecha=req.body.fecha
            administracion.hora_inicio=req.body.hora_inicio
            administracion.hora_final=req.body.hora_final
            administracion.motivo=req.body.motivo
            await administracion.save()
            res.send("Prestamo de salon actualizado")
        } catch (error) {
            console.log(error)
        }
    }
    static eliminarAdministracion =async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const administracion = await AdministracionSalon.findById(id)
            if(!administracion){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            }
            await administracion.deleteOne()
            res.send("Prestamo de salon eliminado")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerAdministracionById=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const administracion = await AdministracionSalon.findById(id)
            if(!administracion){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            }
            res.json(administracion)
        } catch (error) {
            console.log(error)
        }
    }
}