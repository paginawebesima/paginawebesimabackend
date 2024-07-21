import mogoose, {Schema,Document} from 'mongoose'

export type Clausura = Document &{
    titulo:string,
    informacion:string
}
const ClausuraSchema:Schema= new Schema({
    titulo:{
        type:String,
        require:true,
        trim:true
    },
    informacion:{
        type:String,
        require:true,
        trim:true
    }
})

const ClausuraModelo = mogoose.model<Clausura>('Clausura',ClausuraSchema)

export default ClausuraModelo