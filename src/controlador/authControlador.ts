import type { Request, Response } from 'express'
import User from '../modelo/User'
import { checkPassword, hashPassword } from '../utils/auth'
import { Email, requestTokenEmail, sendPasswordResetToken } from '../emails/authEmail'
import Token from '../modelo/Token'
import { generateToken } from '../utils/token'
import { generateJWT } from '../utils/jwt'



export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body

            // Prevenir duplicados
            const userExist = await User.findOne({ email })
            if (userExist) {
                const error = new Error('El Usuario ya esta registrado')
                return res.status(409).json({ error: error.message })

            }

            // Crea un usuario
            const user = new User(req.body)

            // Hash password
            user.password = await hashPassword(password)

            // Enviar el email
            Email.sendEmail({
                email: user.email,
                name: user.name,
                password: password
            })

            await user.save()

            await Promise.allSettled([user.save()])
            res.send('Cuenta creada, revisa tu correo')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({ error: error.message })
            }

            // Revisar password
            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error('Contraseña incorrecta')
                return res.status(401).json({ error: error.message })
            }

            const token = generateJWT({ id: user.id })
            res.send(token)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static requestRecoverPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            // Usuario existe
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error('El Usuario no esta registrado')
                return res.status(409).json({ error: error.message })
            }

            // Generar el token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            // Enviar el email
            requestTokenEmail.sendEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            await Promise.allSettled([user.save(), token.save()])
            res.send('Se envió un nuevo token a tu correo')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            // Usuario existe
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error('El Usuario no esta registrado')
                return res.status(409).json({ error: error.message })
            }

            // Generar el token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id
            await token.save()

            // Enviar el email
            sendPasswordResetToken.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token
            })

            res.send('Revisa tu correo para reestablecer tu contraseña')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body

            const tokenExists = await Token.findOne({ token })
            if (!tokenExists) {
                const error = new Error('Token no válido')
                return res.status(401).json({ error: error.message })
            }

            res.send('Token Válido, Define tu nueva contraseña')


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params
            const { password } = req.body

            const tokenExists = await Token.findOne({ token })
            if (!tokenExists) {
                const error = new Error('Token no válido')
                return res.status(401).json({ error: error.message })
            }

            const user = await User.findById(tokenExists.user)
            user.password = await hashPassword(password)

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            await Token.deleteMany({ user: tokenExists.user });

            res.send('La contraseña se actualizó correctamente')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static user = async (req: Request, res: Response) => {
        return res.json(req.user)
    }
}