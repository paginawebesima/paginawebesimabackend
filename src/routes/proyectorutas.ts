import { Router } from "express";
import {body,param} from 'express-validator'
import { TelefonoControlador } from "../controlador/telefonocontrolador";
import { handleInputErrors } from "../middleware/validacion";

const rutas = Router();


rutas.post('/crearnumero',
body('telefono').notEmpty().withMessage("El telefono es obligatorio"),
handleInputErrors,
TelefonoControlador.creartelefono)

export default rutas;