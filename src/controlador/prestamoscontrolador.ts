import type {Request,Response} from 'express'
import PrestamosModelo from '../modelo/prestamos'


export class PrestamosControlador{
    static crearPrestamo=async(req:Request,res:Response)=>{
        const prestamos = new PrestamosModelo(req.body)
        try {
            await prestamos.save()
            res.send("Prestamo creado correctamente")            
        } catch (error) {
            console.log("Ha sucedido un error")
        }
    }
    static obtenerPrestamos=async(req:Request,res:Response)=>{
        try {
            const prestamos = await PrestamosModelo.find({

            })     
            res.json(prestamos)       
        } catch (error) {
            console.log(error)
        }
    }
    static actualizarPrestamos=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const prestamo = await PrestamosModelo.findById(id) 
            if(!prestamo){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            }     
            prestamo.alumno=req.body.alumno    
            prestamo.grado=req.body.grado
            prestamo.grupo=req.body.grupo
            prestamo.libro=req.body.libro
            prestamo.fechaprestamo=req.body.fechaprestamo
            prestamo.fechadevolucion=req.body.fechadevolucion
            await prestamo.save()
            res.send("Informacion prestamo actualizado")
        } catch (error) {
            console.log(error)
        }
    }
    static eliminarPrestamo=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const prestamo = await PrestamosModelo.findById(id) 
            if(!prestamo){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            } 
            await prestamo.deleteOne()
            res.send("Informacion prestamo eliminado")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerPrestamoId=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const prestamo = await PrestamosModelo.findById(id) 
            if(!prestamo){
                const error = new Error("Prestamo no encontrado")
                return res.status(404).json({error:error.message})
            } 
            res.json(prestamo)
        } catch (error) {
            console.log(error)
        }
    }
}