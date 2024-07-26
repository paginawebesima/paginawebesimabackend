import mongoose, { Schema, Document } from 'mongoose';

const tareaEstado = {
    PENDIENTE: 'pendiente',
    EN_ESPERA: 'enEspera',
    EN_PROCESO: 'enProceso',
    EN_REVISION: 'enRevision',
    COMPLETADO: 'completado'
} as const;

export type TareaEstado = typeof tareaEstado[keyof typeof tareaEstado];

export interface ITarea extends Document {
    nombre: string;
    descripcion: string;
    estado: TareaEstado;
    historialCambios: {
        estado: TareaEstado;
        fecha: Date;
    }[];
    usuario: mongoose.Types.ObjectId;
}

export const TareaSchema: Schema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    estado: {
        type: String,
        enum: Object.values(tareaEstado),
        default: tareaEstado.PENDIENTE
    },
    historialCambios: [
        {
            estado: {
                type: String,
                enum: Object.values(tareaEstado)
            },
            fecha: {
                type: Date,
                default: Date.now
            }
        }
    ],
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, { timestamps: true });

const Tarea = mongoose.model<ITarea>('Tarea', TareaSchema);
export default Tarea;