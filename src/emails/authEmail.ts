import {transporter} from '../config/nodemailer'

interface IEmail {
    email: string
    name: string
    password: string
}
export class Email {
    static sendEmail = async ( user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'ESIMA <admin@esima.com>',
            to: user.email,
            subject: 'ESIMA - Credenciales',
            text: 'ESIMA - Credenciales',
            html: `<p>Hola: ${user.name}, se ha creado tu cuenta en ESIMA, estas son tus credenciales para iniciar sesión</p>
                <p><b>Correo: ${user.email}</b></p>
                <p>Contraseña: ${user.password}</p>`
        })

        console.log('Mensaje enviado', info.messageId)
    }
}

interface IRequestEmail {
    email: string
    name: string
    token: string
}
export class requestTokenEmail {
    static sendEmail = async ( user: IRequestEmail) => {
        const info = await transporter.sendMail({
            from: 'ESIMA <admin@esima.com>',
            to: user.email,
            subject: 'Nuevo Token de Recuperación de Contraseña - ESIMA',
            html: `
                <p>Hola: ${user.name}, has solicitado un nuevo código.</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/new-password">Reestablecer Contraseña</a>
                <p>e ingresa el código:<b>${user.token}</b></p>
                <p>Este código expira en 10 minutos,</p>`
        })

        console.log('Mensaje enviado', info.messageId)
    }
}

interface IRequestEmail {
    email: string
    name: string
    token: string
}
export class sendPasswordResetToken {
    static sendPasswordResetToken = async ( user: IRequestEmail) => {
        const info = await transporter.sendMail({
            from: 'ESIMA <admin@esima.com>',
            to: user.email,
            subject: 'ESIMA - Reestablece tu password',
            html: `
                <p>Hola: ${user.name}, has solicitado reestablecer tu contraseña.</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/new-password">Reestablecer Contraseña</a>
                <p>e ingresa el código:<b>${user.token}</b></p>
                <p>Este código expira en 10 minutos,</p>`
        })

        console.log('Mensaje enviado', info.messageId)
    }
}