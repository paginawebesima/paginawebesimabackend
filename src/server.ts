import express from "express";
import dotenv from 'dotenv'
<<<<<<< HEAD
import { conexionBaseDeDatos } from "./config/db";

=======
import cors from 'cors'
import { conexionBaseDeDatos } from "./config/db";

import rutas from './routes/proyectorutas'
import { configuracionCors } from "./config/cors";

>>>>>>> be040ec9ebf69f00fd4001870f9dd305d75f8150
dotenv.config();

conexionBaseDeDatos();
const servidor = express();
<<<<<<< HEAD

=======
servidor.use(cors(configuracionCors))
servidor.use(express.json())
servidor.use('/api/proyecto',rutas)
>>>>>>> be040ec9ebf69f00fd4001870f9dd305d75f8150

export default servidor;