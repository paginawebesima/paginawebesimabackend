import mogoose,{Schema,Document} from 'mongoose'


export type Proceso = Document &{
    boolean:string
}

const SchemaProceso:Schema=new Schema({
    boolean:{
        type:String,
        require:true,
        trim:true
    }
})


const Modelo_Proceso = mogoose.model<Proceso>('Proceso',SchemaProceso)

export default Modelo_Proceso