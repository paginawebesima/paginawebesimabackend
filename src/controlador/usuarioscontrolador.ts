import type {Request,Response} from 'express'
import User from '../modelo/User'


export class UsuariosControlador{
    static crearUsuarios=async(req:Request,res:Response)=>{
        const usuarios = new User(req.body)
        try {
            await usuarios.save()
            res.send("Usuario creado correctamente")            
        } catch (error) {
            console.log("Ha sucedido un error")
        }
    }
    static obtenerUsuarios=async(req:Request,res:Response)=>{
        try {
            const usuarios = await User.find({

            })     
            res.json(usuarios)       
        } catch (error) {
            console.log(error)
        }
    }
    static actualizarUsuarios=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const usuarios = await User.findById(id) 
            if(!usuarios){
                const error = new Error("Usuario no encontrado")
                return res.status(404).json({error:error.message})
            }     
            usuarios.name=req.body.name  
            usuarios.email=req.body.email
            usuarios.rol=req.body.rol
            await usuarios.save()
            res.send("Información de usuario actualizada")
        } catch (error) {
            console.log(error)
        }
    }
    static eliminarUsuarios=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const usuario = await User.findById(id) 
            if(!usuario){
                const error = new Error("Usuario no encontrado")
                return res.status(404).json({error:error.message})
            } 
            await usuario.deleteOne()
            res.send("Usuario eliminado correctamente")
        } catch (error) {
            console.log(error)
        }
    }
    static obtenerUsuariosId=async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const usuario = await User.findById(id) 
            if(!usuario){
                const error = new Error("Usuario no encontrado")
                return res.status(404).json({error:error.message})
            } 
            res.json(usuario)
        } catch (error) {
            console.log(error)
        }
    }
}