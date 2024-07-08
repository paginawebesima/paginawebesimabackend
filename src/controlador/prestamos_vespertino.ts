import type { Request,Response } from "express";
import Prestamos_Vespertino_modelo from "../modelo/prestamos_verpertino";
import InventarioModelo from "../modelo/inventario";


export class Prestamos_Controlador_Vespertino{
    static crearPrestamoVespertino=async(req:Request,res:Response)=>{
        const { libro: libroTitulo, ...prestamoData } = req.body
        try {
            const inventario = await InventarioModelo.findOne({ titulo: libroTitulo })
            if (!inventario) {
                return res.status(404).json({ error: "Libro no encontrado en inventario" })
            }

            if (inventario.cantidad_disponible === 0) {
                return res.status(400).json({ error: "No hay suficientes libros disponibles" })
            }

            const prestamo = new Prestamos_Vespertino_modelo({ ...prestamoData, libro: inventario._id });
            await prestamo.save();

            inventario.cantidad_disponible -= 1
            await inventario.save()

            res.send("Prestamo creado correctamente")
        } catch (error) {
            console.log("Ha sucedido un error", error)
            res.status(500).send("Error al crear el préstamo")
        }
    }
    static obtenerPrestamos_vespertino=async(req:Request,res:Response)=>{
        try {
            const prestamos_vespertino=await Prestamos_Vespertino_modelo.find({}).populate('libro', 'titulo');
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

            const inventario = await InventarioModelo.findById(prestamos_verpertino.libro)
            if (inventario) {
                inventario.cantidad_disponible += 1
                await inventario.save()
            }

            await prestamos_verpertino.deleteOne();
            res.send("Informacion del prestamo eliminada")
        } catch (error) {
            console.log(error)
            res.status(500).send("Error al eliminar el préstamo")
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