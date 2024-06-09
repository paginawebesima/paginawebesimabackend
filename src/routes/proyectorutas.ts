import { Router } from "express";
import {body,param} from 'express-validator'
import { TelefonoControlador } from "../controlador/telefonocontrolador";
import { handleInputErrors } from "../middleware/validacion";
import { PreinscripcionesControlador } from "../controlador/preinscripcionescontrolador";

const rutas = Router();

// Rutas hacia preinscripciones

rutas.get('/obtenerRequerimientos',PreinscripcionesControlador.obtenerRequerimientos)

rutas.get('/requerimiento/:id',
    param('id').isMongoId().withMessage('ID no es valido'),
    handleInputErrors,
    PreinscripcionesControlador.obtenerRequerimientoId
)

rutas.post('/preinscripciones',
    body('titulo').notEmpty().withMessage("El titulo es obligatorio"),
    body('requerimiento1').notEmpty().withMessage("Es obligatorio un requerimiento de preinscripcion"),
    handleInputErrors,
    PreinscripcionesControlador.crearRequerimiento
)

rutas.put('/preinscripciones/:id'
    ,param('id').isMongoId().withMessage('ID no valido')
    ,body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('requerimiento1').notEmpty().withMessage('Es obligatorio')
,
handleInputErrors
,
PreinscripcionesControlador.actualizarRequerimientos)

rutas.delete('/preinscripciones/eliminar/:id',
    param('id').isMongoId().withMessage('ID no es valido'),
    handleInputErrors,
    PreinscripcionesControlador.eliminarRequerimiento)

// Rutas para actualizar el telefono

rutas.post('/crearnumero',
body('telefono').notEmpty().withMessage("El telefono es obligatorio"),
handleInputErrors,
TelefonoControlador.creartelefono)

rutas.get('/obtenerTelefono',TelefonoControlador.obtenerTelefono)

rutas.get('/obtenerTelefono/:id',
    param('id').isMongoId().withMessage("ID no es valido"),
    handleInputErrors,
    TelefonoControlador.obtenerTelefonoById
)


rutas.put('/actualizar/:id',
    param('id').isMongoId().withMessage("ID no valido"),
    body('telefono').notEmpty().withMessage("El telefono es obligatorio"),
    handleInputErrors,
    TelefonoControlador.actualizarTelefono
)

rutas.delete('/eliminarTel/:id',
    param('id').isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    TelefonoControlador.eliminarTelefono
)

export default rutas;