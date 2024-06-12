import {transporter} from '../config/nodemailer'

interface IEmail {
    email: string
    name: string
    token: string
}
export class AuthEmail {
    static sendConfirmationEmail = async ( user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'ESIMA <admin@esima.com>',
            to: user.email,
            subject: 'ESIMA - Confirma tu cuenta',
            text: 'ESIMA - Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, se ha creado tu cuenta en ESIMA, ya casi esta
            todo listo, solo debes confirmar tu cuenta</p>
                <p>Visita el siguiente enlace</p>
                <a href="">Confirmar Cuenta</a>
                <p>E ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>`
        })

        console.log('Mensaje enviado', info.messageId)
    }
}