import mongoose, { Schema, Document } from 'mongoose'

export type Inventario = Document & {
    titulo: string,
    autor: string,
    genero: string,
    cantidad_total: number,
    cantidad_disponible: number,
}

const InventarioSchema: Schema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    autor: {
        type: String,
        required: true,
        trim: true
    },
    genero: {
        type: String,
        required: true,
        trim: true
    },
    cantidad_total: {
        type: Number,
        required: true,
        trim: true
    },
    cantidad_disponible: {
        type: Number,
        trim: true
    },
})

const InventarioModelo = mongoose.model<Inventario>('Inventario', InventarioSchema)

export default InventarioModelo