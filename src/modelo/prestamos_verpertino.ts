import mogoose,{Schema,Document} from 'mongoose'

export type Prestamos_Verpertino=Document &{
    alumno:string,
    grado:string,
    grupo:string,
    libro:string,
    fechaprestamo:string,
    fechadevolucion:string,
    personaAutorizacion:string
}

const Prestamos_Schema_Vespertino:Schema=new Schema({
    alumno:{
        type:String,
        require:true,
        trim:true
    },
    grado:{
        type:String,
        require:true,
        trim:true
    },
    grupo:{
        type:String,
        require:true,
        trim:true
    },
    libro:{
        type:String,
        require:true,
        trim:true
    },
    fechaprestamo:{
        type:String,
        require:true,
        trim:true
    },
    fechadevolucion:{
        type:String,
        require:true,
        trim:true
    },
    personaAutorizacion:{
        type:String
    }

})


const Prestamos_Vespertino_modelo=mogoose.model<Prestamos_Verpertino>('Prestamos_Vespertino',Prestamos_Schema_Vespertino)


export default Prestamos_Vespertino_modelo