import type {Request,Response} from 'express'
import PrestamosModelo from '../modelo/prestamos'
import InventarioModelo from '../modelo/inventario'


export class PrestamosControlador{
    static crearPrestamo = async (req: Request, res: Response) => {
        const { libro: libroTitulo, ...prestamoData } = req.body;
        try {
            const inventario = await InventarioModelo.findOne({ titulo: libroTitulo });
            if (!inventario) {
                return res.status(404).json({ error: "Libro no encontrado en inventario" });
            }

            if (inventario.cantidad_disponible === 0) {
                return res.status(400).json({ error: "No hay suficientes libros disponibles" });
            }

            const prestamo = new PrestamosModelo({ ...prestamoData, libro: inventario._id });
            await prestamo.save();

            inventario.cantidad_disponible -= 1;
            await inventario.save();

            res.send("Préstamo creado correctamente");
        } catch (error) {
            console.log("Ha sucedido un error", error);
            res.status(500).send("Error al crear el préstamo");
        }
    }
    static obtenerPrestamos = async (req: Request, res: Response) => {
        try {
            const prestamos = await PrestamosModelo.find({}).populate('libro', 'titulo');
            res.json(prestamos);
        } catch (error) {
            console.log(error);
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
    static eliminarPrestamo = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const prestamos = await PrestamosModelo.findById(id)
            if (!prestamos) {
                const error = new Error("Préstamo no encontrado")
                return res.status(404).json({ error: error.message })
            }
    
            const inventario = await InventarioModelo.findById(prestamos.libro)
            if (inventario) {
                inventario.cantidad_disponible += 1
                await inventario.save()
            }
    
            await prestamos.deleteOne()
            res.send("Información del préstamo eliminada")
        } catch (error) {
            console.log(error)
            res.status(500).send("Error al eliminar el préstamo")
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