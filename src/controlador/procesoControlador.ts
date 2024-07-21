import type { Request,Response } from "express";
import Modelo_Proceso from "../modelo/proceso";


export class Proceso_Controlador{
    static crearProceso=async(req:Request,res:Response)=>{
        const proceso = new Modelo_Proceso(req.body)
        try {
            await proceso.save()
            res.send("Proceso creado")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerProceso=async(req:Request,res:Response)=>{
        try {
            const proceso = await Modelo_Proceso.find({

            })
            res.json(proceso)
        } catch (error) {
            console.log(error)
        }
    }
    static activarProceso=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const proceso = await Modelo_Proceso.findById(id)
            if(!proceso){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            }
            proceso.boolean="true"
            await proceso.save();
            res.send("Proceso activo correctamente") 
        } catch (error) {
            console.log
        }
    }
    static desactivarProceso=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const proceso = await Modelo_Proceso.findById(id)
            if(!proceso){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            }
            proceso.boolean="false"
            await proceso.save();
            res.send("Proceso desactivado correctamente") 
        } catch (error) {
            console.log
        }
    }
}