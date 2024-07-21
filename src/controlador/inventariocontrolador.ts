import type { Request, Response } from 'express'
import InventarioModelo from '../modelo/inventario'
import PrestamosModelo from '../modelo/prestamos';
import Prestamos_Vespertino_modelo from '../modelo/prestamos_verpertino';

export class InventarioControlador {
    static crearLibros = async (req: Request, res: Response) => {
        const { titulo, autor, genero, cantidad_total } = req.body;
    
        try {
            const nuevoLibro = new InventarioModelo({
                titulo,
                autor,
                genero,
                cantidad_total,
                cantidad_disponible: cantidad_total
            });
    
            await nuevoLibro.save();
            res.send("Libro creado correctamente");
        } catch (error) {
            console.log("Ha sucedido un error", error);
            res.status(500).send("Error al crear el libro");
        }
    }

    static obtenerLibros = async (req: Request, res: Response) => {
        try {
            const inventario = await InventarioModelo.find({})
            res.json(inventario)
        } catch (error) {
            console.log(error)
        }
    }

    static obtenerLibrosDisponibles = async (req: Request, res: Response) => {
        try {
            const inventario = await InventarioModelo.find({ cantidad_disponible: { $gt: 0 } });
            res.json(inventario);
        } catch (error) {
            console.log(error)
        }
    }

    static async actualizarLibros(req: Request, res: Response) {
        const { id } = req.params;
        const { titulo, autor, genero, cantidad_total } = req.body;

        try {
            const libro = await InventarioModelo.findById(id);
            if (!libro) {
                return res.status(404).json({ error: "Libro no encontrado" });
            }

            libro.titulo = titulo;
            libro.autor = autor;
            libro.genero = genero;
            libro.cantidad_total = cantidad_total;

            const prestamosMatutinos = await PrestamosModelo.find({ libro: id }).countDocuments();
            const prestamosVespertinos = await Prestamos_Vespertino_modelo.find({ libro: id }).countDocuments();

            libro.cantidad_disponible = libro.cantidad_total - (prestamosMatutinos + prestamosVespertinos);

            await libro.save();
            res.send("Información de libro actualizada");
        } catch (error) {
            console.log(error);
            res.status(400).send("Error al actualizar el libro");
        }
    }    

    static eliminarLibros = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const inventario = await InventarioModelo.findById(id)
            if (!inventario) {
                const error = new Error("Libro no encontrado")
                return res.status(404).json({ error: error.message })
            }
            await inventario.deleteOne()
            res.send("Información de libro eliminada")
        } catch (error) {
            console.log(error)
        }
    }

    static obtenerLibrosId = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const inventario = await InventarioModelo.findById(id)
            if (!inventario) {
                const error = new Error("Libro no encontrado")
                return res.status(404).json({ error: error.message })
            }
            res.json(inventario)
        } catch (error) {
            console.log(error)
        }
    }
}