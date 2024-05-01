import mongoose,{Model, Schema} from "mongoose";
export interface IEMP{
    employeeName:string,
    designation:string,
    salary:number,
    joinDate:Date,
    experience:number
}

const employeeSchema = new Schema<IEMP>({
    employeeName:{
        type:String,
        required:[true,"Employee should have a name"],
        trim:true
    },
    designation:{
        type:String,
        required:[true,"Designatin is required"],
        trim:true
    },
    salary:{
        type:Number,
        required:[true,"Please pay something to your employee"],
        trim:true
    },
    joinDate:{
        type:Date,
        required:[true,"Must have a joining date"],
        trim:true
    },
    experience:{
        type:Number,
        required:[true,"Experience hone ko mangta"],
        min:[0,"Isse kam mein nahi parvadega"],
        trim:true
    }
})

const employee:Model<IEMP> = mongoose.model<IEMP>("employee",employeeSchema)
export default employee