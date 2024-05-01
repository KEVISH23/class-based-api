import express,{Express} from 'express'
import { connectDB } from '../config/db'
import 'dotenv/config'
// import router from './routes/employee.router'
import { route } from './routes'
const app:Express = express()
app.use(express.json())
connectDB()

// app.use('/employees',router)
app.use('/api/v1',route)
app.listen(process.env.PORT,()=>{
    console.log('Port is activated')
})