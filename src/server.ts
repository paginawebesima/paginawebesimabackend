import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { conexionBaseDeDatos } from "./config/db";

import rutas from './routes/proyectorutas'
import authRutas from './routes/authRutas'
import { configuracionCors } from "./config/cors";

dotenv.config();

conexionBaseDeDatos();
const servidor = express();
servidor.use(cors(configuracionCors))
servidor.use(express.json())
servidor.use('/api/proyecto',rutas)
servidor.use('/api/auth', authRutas)


export default servidor;