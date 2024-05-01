import mongoose from "mongoose"

export const connectDB = () =>{
    mongoose.connect('mongodb+srv://kevishshaligram:uC9FWxPJhRl1vjMC@employeedb.bqzltn8.mongodb.net/test1').then(()=>{
        console.log("connected db")
    }).catch(err=>{
        console.log(err)
    })
}