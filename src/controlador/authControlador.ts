import type { Request, Response } from 'express'
import User from '../modelo/User'
import { checkPassword, hashPassword } from '../utils/auth'
import { Email } from '../emails/authEmail'



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
            res.send('Cuenta creada, revisa tu email')

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
            if(!isPasswordCorrect){
                const error = new Error('Contraseña incorrecta')
                return res.status(401).json({ error: error.message })
            }

            res.send('Autenticado...')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }

    }
}