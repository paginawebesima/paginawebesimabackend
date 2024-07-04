import type { Request,Response } from "express";
import Prestamos_Vespertino_modelo from "../modelo/prestamos_verpertino";


export class Prestamos_Controlador_Vespertino{
    static crearPrestamoVespertino=async(req:Request,res:Response)=>{
        const prestamosInformacion_vespertino= new Prestamos_Vespertino_modelo(req.body)
        try {
            await prestamosInformacion_vespertino.save();
            res.send("Prestamo creado correctamente")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerPrestamos_vespertino=async(req:Request,res:Response)=>{
        try {
            const prestamos_vespertino=await Prestamos_Vespertino_modelo.find({

            })
            res.json(prestamos_vespertino)
        } catch (error) {
            console.log(error)
        }
    }
    static actualizarPrestamos_Vespertino=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const prestamos_verpertino = await Prestamos_Vespertino_modelo.findById(id)
            if(!prestamos_verpertino){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            }
            prestamos_verpertino.alumno=req.body.alumno
            prestamos_verpertino.grado=req.body.grado
            prestamos_verpertino.grupo=req.body.grupo
            prestamos_verpertino.libro=req.body.libro
            prestamos_verpertino.fechaprestamo=req.body.fechaprestamo
            prestamos_verpertino.fechadevolucion=req.body.fechadevolucion
            await prestamos_verpertino.save()
            res.send("Informacion prestamo actualizado")
        } catch (error) {
            console.log(error)
        }
    }
    static eliminarPrestamo_Vespertino=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const prestamos_verpertino = await Prestamos_Vespertino_modelo.findById(id)
            if(!prestamos_verpertino){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            }
            await prestamos_verpertino.deleteOne();
            res.send("Informacion prestamo eliminada")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerPrestamoId_Vespertino=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const prestamos_verpertino=await Prestamos_Vespertino_modelo.findById(id)
            if(!prestamos_verpertino){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            }
            res.json(prestamos_verpertino)          
        } catch (error) {
            console.log(error)
        }
    }
}