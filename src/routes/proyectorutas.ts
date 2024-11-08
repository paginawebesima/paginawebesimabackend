import { Router } from "express";
import { body, param } from 'express-validator'
import { TelefonoControlador } from "../controlador/telefonocontrolador";
import { handleInputErrors } from "../middleware/validacion";
import { PreinscripcionesControlador } from "../controlador/preinscripcionescontrolador";
import { AuthController } from '../controlador/authControlador';
import { PrestamosControlador } from "../controlador/prestamoscontrolador";
import { authenticate } from "../middleware/auth";
import { clausuraControlador } from "../controlador/clausuracontrolador";
import { Prestamos_Controlador_Vespertino } from "../controlador/prestamos_vespertino";
import { Proceso_Controlador } from "../controlador/procesoControlador";
import { administrativosControlador } from "../controlador/administrativoscontrolador";
import { UsuariosControlador } from "../controlador/usuarioscontrolador";
import { InventarioControlador } from "../controlador/inventariocontrolador";
import { TareaControlador } from "../controlador/tareacontrolador";
import { administracionsaloncontrolador } from "../controlador/administracionsalones";


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

// Usuarios
rutas.get('/obtenerUsuarios', UsuariosControlador.obtenerUsuarios)

rutas.get('/obtenerUsuarios/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    handleInputErrors,
    UsuariosControlador.obtenerUsuariosId
)

rutas.post('/crearUsuarios',
    body('name').notEmpty().withMessage("El nombre es obligatorio"),
    body('email').notEmpty().withMessage("El correo es obligatorio"),
    body('rol').notEmpty().withMessage("El rol es obligatorio"),
    handleInputErrors,
    UsuariosControlador.crearUsuarios
)

rutas.put('/actualizarUsuarios/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    body('name').notEmpty().withMessage("El nombre es obligatorio"),
    body('email').notEmpty().withMessage("El email es obligatorio"),
    body('rol').notEmpty().withMessage("El rol es obligatorio"),
    handleInputErrors,
    UsuariosControlador.actualizarUsuarios
)
rutas.delete('/eliminarUsuarios/:id',
    param('id').isMongoId().withMessage("El ID no es valido"),
    handleInputErrors,
    UsuariosControlador.eliminarUsuarios
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
    body('personaAutorizacion').notEmpty().withMessage("La persona quien autoriza es obligatoria"),
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

//inventario
rutas.get('/obtenerLibros', InventarioControlador.obtenerLibros)
rutas.get('/obtenerLibrosDisponibles', InventarioControlador.obtenerLibrosDisponibles)

rutas.get('/obtenerLibros/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    handleInputErrors,
    InventarioControlador.obtenerLibrosId
)

rutas.post('/inventario',
    body('titulo').notEmpty().withMessage("El titulo es obligatorio"),
    body('autor').notEmpty().withMessage("El autor es obligatorio"),
    body('genero').notEmpty().withMessage("El género es obligatorio"),
    body('cantidad_total').notEmpty().withMessage("La cantidad total es obligatoria"),
    handleInputErrors,
    InventarioControlador.crearLibros
)

rutas.put('/actualizarLibros/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    body('titulo').notEmpty().withMessage("El titulo es obligatorio"),
    body('autor').notEmpty().withMessage("El autor es obligatorio"),
    body('genero').notEmpty().withMessage("El género es obligatorio"),
    body('cantidad_total').notEmpty().withMessage("La cantidad es obligatoria"),
    handleInputErrors,
    InventarioControlador.actualizarLibros
)
rutas.delete('/eliminarLibros/:id',
    param('id').isMongoId().withMessage("El ID no es valido"),
    handleInputErrors,
    InventarioControlador.eliminarLibros
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

//administrativos

rutas.get('/obtenerAdministrativos',
    administrativosControlador.obtenerAdministrativos
)

rutas.get('/obtenerAdministrativosId/:id',
    param('id').isMongoId().withMessage("ID no es valido"),
    handleInputErrors,
    administrativosControlador.obtenerAdministrativosId
)

rutas.put('/actualizarAdministrativos/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    body('directivo').notEmpty().withMessage("El nombre del directivo es obligatorio"),
    body('cargo').notEmpty().withMessage("El cargo del directivo es obligatorio"),
    handleInputErrors,
    administrativosControlador.actualizarAdministrativos
)

rutas.post('/crearAdministrativos',
    body('directivo').notEmpty().withMessage("El nombre del directivo es obligatorio"),
    body('cargo').notEmpty().withMessage("El cargo del directivo es obligatorio"),
    handleInputErrors,
    administrativosControlador.crearAdministrativos
)
rutas.delete('/eliminarAdministrativos/:id',
    param('id').isMongoId().withMessage("El ID no es valido"),
    handleInputErrors,
    administrativosControlador.eliminarAdministrativos
)

rutas.get('/obtenerPrestamosVespertino',Prestamos_Controlador_Vespertino.obtenerPrestamos_vespertino)

rutas.get('/obtenerPrestamos_Vespertino/:id',
    param('id').isMongoId().withMessage("ID no es valido"),
    handleInputErrors,
    Prestamos_Controlador_Vespertino.obtenerPrestamoId_Vespertino
)

rutas.post('/crearPrestamoVerpertino',
    body('alumno').notEmpty().withMessage("El alumno es obligatorio"),
    body('grado').notEmpty().withMessage("El grado es obligatorio"),
    body('grupo').notEmpty().withMessage("El grupo es obligatorio"),
    body('libro').notEmpty().withMessage("El libro es obligatorio"),
    body('fechaprestamo').notEmpty().withMessage("La fecha prestamo es obligatoria"),
    body('fechadevolucion').notEmpty().withMessage("La fecha devolucion es obligatoria"),
    body('personaAutorizacion').notEmpty().withMessage("La persona quien autoriza es obligatoria"),
    handleInputErrors,
    Prestamos_Controlador_Vespertino.crearPrestamoVespertino
)

rutas.put('/actualizarPrestamos_Vespertino/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    body('alumno').notEmpty().withMessage("El alumno es obligatorio"),
    body('grado').notEmpty().withMessage("El grado es obligatorio"),
    body('grupo').notEmpty().withMessage("El grupo es obligatorio"),
    body('libro').notEmpty().withMessage("El libro es obligatorio"),
    body('fechaprestamo').notEmpty().withMessage("La fecha prestamo es obligatoria"),
    body('fechadevolucion').notEmpty().withMessage("La fecha devolucion es obligatoria"),
    handleInputErrors,
    Prestamos_Controlador_Vespertino.actualizarPrestamos_Vespertino
)

rutas.delete('/eliminarPrestamos_Vespertino/:id',
    param('id').isMongoId().withMessage("El ID no es valido"),
    handleInputErrors,
    Prestamos_Controlador_Vespertino.eliminarPrestamo_Vespertino
)

rutas.get('/obtenerProceso',
    Proceso_Controlador.obtenerProceso
)

rutas.post('/crearProceso',
    body('boolean').notEmpty().withMessage("Es obligatorio"),
    handleInputErrors,
    Proceso_Controlador.crearProceso
)

rutas.put('/activarProceso/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    handleInputErrors,
    Proceso_Controlador.activarProceso
)
rutas.put('/desactivarProceso/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    handleInputErrors,
    Proceso_Controlador.desactivarProceso
)

//tareas
rutas.post('/crearTareas', 
    authenticate,
    body('nombre').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    TareaControlador.crearTarea
);

rutas.get('/obtenerTareas', 
    authenticate,
    TareaControlador.obtenerTareas
);

rutas.get('/obtenerTareas/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TareaControlador.obtenerTareaById
);

rutas.put('/actualizarTareas/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    body('nombre').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    TareaControlador.actualizarTarea
);

rutas.delete('/eliminarTareas/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TareaControlador.eliminarTarea
);

rutas.post('/actualizarTareas/:id/estado', 
    param('id').isMongoId().withMessage('ID no válido'),
    body('estado').notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TareaControlador.actualizarEstado
);

rutas.get('/obtenerAdministracion',
    administracionsaloncontrolador.obtenerAdministracion
)

rutas.get('/obtenerAdministracionSalon/:id',
    param('id').isMongoId().withMessage("ID no es valido"),
    handleInputErrors,
    administracionsaloncontrolador.obtenerAdministracionById
)

rutas.delete('/eliminarAdministracion/:id',
    param('id').isMongoId().withMessage("El ID no es valido"),
    handleInputErrors,
    administracionsaloncontrolador.eliminarAdministracion
)

rutas.put('/actualizarAdministracion/:id',
    param('id').isMongoId().withMessage("El id no es valido"),
    body('persona').notEmpty().withMessage("La persona es obligatoria"),
    body('fecha').notEmpty().withMessage("La fecha es obligatoria"),
    body('hora_inicio').notEmpty().withMessage("La hora inicio es obligatoria"),
    body('hora_final').notEmpty().withMessage("La hora final es obligatoria"),
    body('motivo').notEmpty().withMessage("El motivo es obligatorio"),
    handleInputErrors,
    administracionsaloncontrolador.actualizarAdministracion
)

rutas.post('/crearPrestamoSalon',
    body('persona').notEmpty().withMessage("La persona es obligatoria"),
    body('fecha').notEmpty().withMessage("La fecha es obligatoria"),
    body('hora_inicio').notEmpty().withMessage("La hora inicio es obligatoria"),
    body('hora_final').notEmpty().withMessage("La hora final es obligatoria"),
    body('motivo').notEmpty().withMessage("El motivo es obligatorio"),
    handleInputErrors,
    administracionsaloncontrolador.crearAdministracion
)

export default rutas;