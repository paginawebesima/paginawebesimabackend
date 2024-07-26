import type { Request, Response } from 'express';
import Tarea from '../modelo/Tarea';

export class TareaControlador {
    static async crearTarea(req: Request, res: Response) {
        try {
            const { nombre, descripcion } = req.body;
            const usuarioId = req.user!._id;
            const nuevaTarea = new Tarea({ nombre, descripcion, usuario: usuarioId });
            await nuevaTarea.save();
            res.status(201).json({ mensaje: 'Tarea creada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la tarea' });
        }
    }

    static obtenerTareas = async (req: Request, res: Response) => {
        try {
            const usuarioId = req.user!._id;
            const tareas = await Tarea.find({ usuario: usuarioId });
            res.json(tareas);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static obtenerTareaById = async (req: Request, res: Response) => {
        try {
            const tarea = await Tarea.findById(req.params.id);
            res.json(tarea);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static async actualizarTarea(req: Request, res: Response) {
        try {
            const tarea = await Tarea.findById(req.params.id);
            if (!tarea) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            tarea.nombre = req.body.nombre;
            tarea.descripcion = req.body.descripcion;
            tarea.estado = req.body.estado;
            await tarea.save();
            res.status(200).json({ mensaje: 'Tarea actualizada correctamente', refrescar: true });
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static eliminarTarea = async (req: Request, res: Response) => {
        try {
            const tarea = await Tarea.findById(req.params.id);
            if (!tarea) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            await tarea.deleteOne();
            res.send("Tarea Eliminada Correctamente");
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static actualizarEstado = async (req: Request, res: Response) => {
        try {
            const { estado } = req.body;
            const tarea = await Tarea.findById(req.params.id);
            if (!tarea) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            tarea.estado = estado;

            const cambio = {
                estado: estado,
                fecha: new Date()
            };

            tarea.historialCambios.push(cambio);
            await tarea.save();
            res.send('Tarea Actualizada');
        } catch (error) {
            console.log('Error al actualizar estado de tarea:', error);
            res.status(500).json({ error: 'Hubo un error' });
        }
    }
}