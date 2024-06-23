import { Router } from "express";
import { body, param } from 'express-validator'
import { TelefonoControlador } from "../controlador/telefonocontrolador";
import { handleInputErrors } from "../middleware/validacion";
import { PreinscripcionesControlador } from "../controlador/preinscripcionescontrolador";
import { AuthController } from '../controlador/authControlador';
import { PrestamosControlador } from "../controlador/prestamoscontrolador";
import { authenticate } from "../middleware/auth";
import { clausuraControlador } from "../controlador/clausuracontrolador";


const rutas = Router();

// Ruta para crear una cuenta
rutas.post('/create-account',
    authenticate,
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

// Reenviar token
rutas.post('/request-code',
    body('email')
        .isEmail().withMessage('Correo no válido'),
    handleInputErrors,
    AuthController.requestRecoverPassword
)

// Reestablecer contraseña
rutas.post('/forgot-password',
    body('email')
        .isEmail().withMessage('Correo no válido'),
    handleInputErrors,
    AuthController.forgotPassword
)

// Validar token
rutas.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputErrors,
   AuthController.validateToken
)

// Actualizar contraseña
rutas.post('/update-password/:token',
    param('token').isNumeric().withMessage('Token no válido'),
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden.');
        }
        return true;
    }),
    handleInputErrors,
   AuthController.updatePasswordWithToken
)

// Rutas hacia preinscripciones

rutas.get('/obtenerRequerimientos', PreinscripcionesControlador.obtenerRequerimientos)

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
    , param('id').isMongoId().withMessage('ID no valido')
    , body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
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

rutas.get('/obtenerTelefono', TelefonoControlador.obtenerTelefono)

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


//prestamos 

rutas.get('/obtenerPrestamos', PrestamosControlador.obtenerPrestamos)

rutas.get('/obtenerPrestamos/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    handleInputErrors,
    PrestamosControlador.obtenerPrestamoId
)

rutas.post('/prestamo',
    body('alumno').notEmpty().withMessage("El alumno es obligatorio"),
    body('grado').notEmpty().withMessage("El grado es obligatorio"),
    body('grupo').notEmpty().withMessage("El grupo es obligatorio"),
    body('libro').notEmpty().withMessage("El libro es obligatorio"),
    body('fechaprestamo').notEmpty().withMessage("La fecha prestamo es obligatoria"),
    body('fechadevolucion').notEmpty().withMessage("La fecha devolucion es obligatoria"),

    handleInputErrors,
    PrestamosControlador.crearPrestamo
)

rutas.put('/actualizarPrestamo/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    body('alumno').notEmpty().withMessage("El alumno es obligatorio"),
    body('grado').notEmpty().withMessage("El grado es obligatorio"),
    body('grupo').notEmpty().withMessage("El grupo es obligatorio"),
    body('libro').notEmpty().withMessage("El libro es obligatorio"),
    body('fechaprestamo').notEmpty().withMessage("La fecha prestamo es obligatoria"),
    body('fechadevolucion').notEmpty().withMessage("La fecha devolucion es obligatoria"),
    handleInputErrors,
    PrestamosControlador.actualizarPrestamos
)
rutas.delete('/eliminarPrestamo/:id',
    param('id').isMongoId().withMessage("El ID no es valido"),
    handleInputErrors,
    PrestamosControlador.eliminarPrestamo
)

rutas.get('/user',
    authenticate,
    AuthController.user
)


//clausura 

rutas.get('/obtenerClausura',
    clausuraControlador.obtenerClausura
)

rutas.get('/obtenerClausuraId/:id',
    param('id').isMongoId().withMessage("ID no es valido"),
    handleInputErrors,
    clausuraControlador.obtenerClausuraId
)

rutas.put('/actualizarClausura/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    body('titulo').notEmpty().withMessage("El titulo es obligatorio"),
    body('informacion').notEmpty().withMessage("La informacion es obligatoria"),
    handleInputErrors,
    clausuraControlador.actualizarClausura
)

rutas.post('/crearClausura',
    body('titulo').notEmpty().withMessage("El titulo es obligatorio"),
    body('informacion').notEmpty().withMessage("La informacion es obligatoria"),
    handleInputErrors,
    clausuraControlador.crearClausura
)
rutas.delete('/eliminarClausura/:id',
    param('id').isMongoId().withMessage("El ID no es valido"),
    handleInputErrors,
    clausuraControlador.eliminarClausura
)
export default rutas;