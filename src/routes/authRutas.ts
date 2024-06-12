import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controlador/authControlador';
import { handleInputErrors } from '../middleware/validacion';

const router = Router();

router.post('/create-account',
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

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio.'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('Por favor, introduzca una dirección de correo electrónico válida.'),
    body('password')
        .notEmpty().withMessage('La contraseña es un campo obligatorio.'),
    handleInputErrors,
    AuthController.login
)

export default router;
