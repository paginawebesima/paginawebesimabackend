import mogoose,{Schema,Document} from 'mongoose'

export type Prestamos = Document&{
    alumno:string,
    grado:string,
    grupo:string,
    libro:string,
    fechaprestamo:string,
    fechadevolucion:string
}

const PrestamosShema:Schema=new Schema({
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
    }

})


const PrestamosModelo=mogoose.model<Prestamos>('Prestamos',PrestamosShema)


export default PrestamosModelo