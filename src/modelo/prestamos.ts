import mongoose, { Schema, Document } from 'mongoose';

export type Prestamos = Document & {
    alumno: string,
    grado: string,
    grupo: string,
    libro: mongoose.Schema.Types.ObjectId,
    fechaprestamo: string,
    fechadevolucion: string,
    personaAutorizacion: string
}

const PrestamosSchema: Schema = new Schema({
    alumno: {
        type: String,
        required: true,
        trim: true
    },
    grado: {
        type: String,
        required: true,
        trim: true
    },
    grupo: {
        type: String,
        required: true,
        trim: true
    },
    libro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventario',
        required: true
    },
    fechaprestamo: {
        type: String,
        required: true,
        trim: true
    },
    fechadevolucion: {
        type: String,
        required: true,
        trim: true
    },
    personaAutorizacion: {
        type: String
    }
});

const PrestamosModelo = mongoose.model<Prestamos>('Prestamos', PrestamosSchema);

export default PrestamosModelo;