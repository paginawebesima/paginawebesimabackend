import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    rol: "Administrador" | "Gestor de Libros" | "Gestor de Salones";
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ["Administrador", "Gestor de Libros", "Gestor de Salones"]
    },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
