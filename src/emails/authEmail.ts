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