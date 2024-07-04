import type {Request,Response} from 'express'
import ClausuraModelo from '../modelo/clausura'



export class clausuraControlador{
    static crearClausura=async(req:Request,res:Response)=>{
        const clausuraInformacion = new ClausuraModelo(req.body)
        try {
            await clausuraInformacion.save()
            res.send("Clausura creado correctamente")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerClausura=async(req:Request,res:Response)=>{
        try {
            const clausura = await ClausuraModelo.find({

            })      
            res.json(clausura)      
        } catch (error) {
            console.log(error)
        }
    }
    static actualizarClausura=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const clausura = await ClausuraModelo.findById(id)
            if(!clausura){
                const error = new Error("Titulo de clausura no encontrado")
                return res.status(404).json({error:error.message})
            }
            clausura.titulo=req.body.titulo
            clausura.informacion= req.body.informacion
            await clausura.save();
            res.send("Titulo clausura actualizado correctamente")
        } catch (error) {
            console.log(error)
        }

    }
    static eliminarClausura=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const clausura = await ClausuraModelo.findById(id)
            if(!clausura){
                const error = new Error("Titulo de clausura no encontrado")
                return res.status(404).json({error:error.message})
            }
            await clausura.deleteOne()
            res.send("Eliminado Correctamente")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerClausuraId = async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const clausura = await ClausuraModelo.findById(id)
            if(!clausura){
                const error = new Error("Titulo de clausura no encontrado")
                return res.status(404).json({error:error.message})
            }
            res.json(clausura)
        } catch (error) {
            console.log(error)
        }
    }
}