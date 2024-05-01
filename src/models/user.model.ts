import mongoose,{Model, Schema} from "mongoose";
export interface IUsers{
    userEmail:string,
    userName:string,
    userPassword:string,
    token:string,
}
const userSchema = new Schema<IUsers>({
    userEmail:{
        type:String,
        required:[true,"Sorry but we cant let you in without email"],
        unique:true
    },
    userName:{
        type:String,
        required:[true,'Persons without name are not allowed'],
        maxLength:[40,'Wow what a big name but sorry not allowed more than 40 characters']
    },
    userPassword:{
        type:String,
        required:[true,'Without passowrd anyone can access your things kindly secure it !!']
    },
    token:{
        type:String,
        default:''
    }
},{
    timestamps:true
})

const user:Model<IUsers> = mongoose.model<IUsers>('user',userSchema)
export default user