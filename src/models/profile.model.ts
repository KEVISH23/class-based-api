import mongoose,{Model, Schema} from "mongoose";

export interface IProfiles{
    userId:mongoose.Schema.Types.ObjectId,
    profileName:string
}

const profileModel = new Schema<IProfiles>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    profileName:{
        type:String,
        required:[true,'Profile without name very bad choice!!!']
    }
},{
   timestamps:true 
})

const profile:Model<IProfiles> = mongoose.model<IProfiles>('profile',profileModel)
export default profile
