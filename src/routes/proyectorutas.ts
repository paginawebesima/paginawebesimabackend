import { Router } from "express";
import {body,param} from 'express-validator'
import { TelefonoControlador } from "../controlador/telefonocontrolador";
import { handleInputErrors } from "../middleware/validacion";
import { PreinscripcionesControlador } from "../controlador/preinscripcionescontrolador";
import { AuthController } from '../controlador/authControlador';


const rutas = Router();

// Ruta para crear una cuenta
rutas.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre es un campo obligatorio.'),
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden.');
        }
        return true;
    }),
    body('email')
        .isEmail().withMessage('Por favor, introduzca una dirección de correo electrónico válida.'),
    body('rol')
        .notEmpty().withMessage('El rol es un campo obligatorio.')
        .isIn(['Administrador', 'Gestor de Libros', 'Gestor de Salones']).withMessage('El rol especificado no es válido.'),
    handleInputErrors,
    AuthController.createAccount
)

// Ruta para el inicio de sesión
rutas.post('/login',
    body('email')
        .isEmail().withMessage('Por favor, introduzca una dirección de correo electrónico válida.'),
    body('password')
        .notEmpty().withMessage('La contraseña es un campo obligatorio.'),
    handleInputErrors,
    AuthController.login
)

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

export default rutas;