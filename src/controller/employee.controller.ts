import { errorHandler } from "../handler/errorHandler"
import { employeeServices } from "../services/employee.services"
import { Request,Response } from "express"
let obj = new employeeServices()
export const getAllEmployee= (req:Request,res:Response)=>{
    obj.getAllEmployees(req,res)
}

export const addEmployee = async(req:Request,res:Response)=>{
    try{
       await obj.addEmployee(req,res)
    }catch(err:any){
        // console.log(err)
        let messgae:string = errorHandler(err)
        res.status(500).json({message:messgae})
    }
}