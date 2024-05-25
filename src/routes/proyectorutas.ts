import { Router } from "express";
import { TelefonoControlador } from "../controlador/telefonocontrolador";

const rutas = Router();


rutas.post('/crearnumero',TelefonoControlador.creartelefono)

export default rutas;