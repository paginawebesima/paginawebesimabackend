import mogoose,{Schema,Document} from 'mongoose'

export type IPreinscripciones=Document&{
    titulo:string,
    requerimiento1:string,
    requerimiento2:string,
    requerimiento3:string,
    requerimiento4:string,
    requerimiento5:string
}

const PreinscripcionesShema:Schema=new Schema({
    titulo:{
        type:String,
        require:true,
        trim:true 
    },
    requerimiento1:{
        type:String,
        require:true,
        trim:true
    },
    requerimiento2:{
        type:String,
        trim:true
    },
    requerimiento3:{
        type:String,
        trim:true
    },
    requerimiento4:{
        type:String,
        trim:true
    },
    requerimiento5:{
        type:String,
        trim:true
    }
})

const Preinscripciones=mogoose.model<IPreinscripciones>('Preinscripciones',PreinscripcionesShema)


export default Preinscripciones