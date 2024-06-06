import mongoose,{Schema,Document,PopulatedDoc,Types}  from 'mongoose';

export type ITelefono =Document &{
    telefono:string
}

const TelefonoShema:Schema=new Schema({
    telefono:{
        type:String,
        require:true,
        trim:true
    }
},{timestamps:true})


const TelefonoContacto=mongoose.model<ITelefono>('Telefono',TelefonoShema)

export default TelefonoContacto