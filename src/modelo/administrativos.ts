import mogoose, {Schema,Document} from 'mongoose'

export type Administrativos = Document &{
    directivo:string,
    cargo:string
}
const AdministrativosSchema:Schema= new Schema({
    directivo:{
        type:String,
        require:true,
        trim:true
    },
    cargo:{
        type:String,
        require:true,
        trim:true
    }
})

const AdministrativosModelo = mogoose.model<Administrativos>('Administrativos',AdministrativosSchema)

export default AdministrativosModelo