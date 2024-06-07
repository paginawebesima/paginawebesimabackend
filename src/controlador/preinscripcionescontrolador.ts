import type {Request,Response} from 'express'
import Preinscripciones from '../modelo/preinscripciones'


export class PreinscripcionesControlador{
    static crearRequerimiento=async(req:Request,res:Response)=>{
        const requerimientos = new Preinscripciones(req.body);
        try {
            await requerimientos.save()
            res.send("Creado Correctamente")
        } catch (error) {
            console.log("Ha sucedido un error")
        }
    }
    static obtenerRequerimientos=async(req:Request,res:Response)=>{
        try {
            const requerimientos= await Preinscripciones.find({

            })
            res.json(requerimientos)
        } catch (error) {
            console.log(error)
        }
    }
    static actualizarRequerimientos=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const requerimiento = await Preinscripciones.findById(id)
            if(!requerimiento){
                const error = new Error("Requerimiento no encontrado")
                return res.status(404).json({error:error.message})
            }
            requerimiento.titulo=req.body.titulo
            requerimiento.requerimiento1=req.body.requerimiento1
            requerimiento.requerimiento2=req.body.requerimiento2
            requerimiento.requerimiento3=req.body.requerimiento3
            requerimiento.requerimiento4=req.body.requerimiento4
            requerimiento.requerimiento5=req.body.requerimiento5
            await requerimiento.save();
            res.send("Requerimiento Actualizado");
        } catch (error) {
            console.log(error)
        }
        }
    static eliminarRequerimiento=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const requerimiento = await Preinscripciones.findById(id)
            if(!requerimiento){
                const error = new Error("Requerimiento no encontrado")
                return res.status(404).json({error:error.message})
            }
            await requerimiento.deleteOne()
            res.send("Requerimiento Eliminado")
        } catch (error) {
            console.log(error)
        }
    }
}