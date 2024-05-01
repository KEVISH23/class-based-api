import mongoose from "mongoose"
import localConfig from '../config/local'

export const connectDB = () => {
    mongoose.connect(localConfig.CONNECTION_STRING).then(() => {
        console.log("connected db")
    }).catch(err => {
        console.log(err)
    })
}