import { Request,Response } from "express";
import employee, { IEMP } from "../models/employee.model";
import { Document } from "mongoose";
import { errorHandler } from "../handler/errorHandler";
export class employeeServices{
    async getAllEmployees(req:Request,res:Response):Promise<void>{
        let data:Document[] = await employee.find()
        res.status(200).json({data})
    }

    async addEmployee(req:Request,res:Response):Promise<void>{
        await employee.create(req.body)
        res.status(201).json({message:"User Added successfully"})
    }

    // async deleteEmployeeById(req:Request,res:Response):Promise<void>{
    //     try{

    //     }catch(err:any){
    //         let message = errorHandler(err)
    //         if(message!=""){
    //             res.status(500).json({message:message})
    //         }else{
    //             res.status(500).json({message:"Error In Deleting stuff"})
    //         }
    //     }
    // }
}