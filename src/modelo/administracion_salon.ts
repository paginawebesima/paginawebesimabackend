import mogoose,{Schema,Document} from 'mongoose'

export type Administracion_Salones = Document &{
    persona:string,
    grupo:string,
    fecha:string,
    hora_inicio:string,
    hora_final:string,
    motivo:string
}

const Administracion_Salones_Schema:Schema=new Schema({
    persona:{
        type:String,
        require:true,
        trim:true
    },
    grupo:{
        type:String
    },
    fecha:{
        type:String,
        require:true,
        trim:true
    },
    hora_inicio:{
        type:String,
        require:true,
        trim:true
    },
    hora_final:{
        type:String,
        require:true,
        trim:true
    },
    motivo:{
        type:String,
        require:true,
        trim:true
    }

})

const AdministracionSalon = mogoose.model<Administracion_Salones>('Biblioteca',Administracion_Salones_Schema)

export default AdministracionSalon