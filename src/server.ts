import express from "express";
import dotenv from 'dotenv'
import { conexionBaseDeDatos } from "./config/db";

import rutas from './routes/proyectorutas'

dotenv.config();

conexionBaseDeDatos();
const servidor = express();
servidor.use(express.json())
servidor.use('/api/proyecto',rutas)

export default servidor;