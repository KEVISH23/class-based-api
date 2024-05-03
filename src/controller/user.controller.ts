import {Request,Response} from 'express'
import { userService } from '../services'
import { errorHandler } from '../handler/errorHandler'
import { IProfiles, IUsers } from '../models'
let userSerObj:userService = new userService()
export class userController{
    async getAllUsers(req:Request,res:Response):Promise<void>{
        try{
            let data = await userSerObj.getAllUsersService()
            res.json({data})
        }catch(err){
            res.status(500).json({message:"Error for the request"})
        }
    }

    async addUser(req:Request,res:Response):Promise<void>{
        try{
            if(!req.body.userPassword || !req.body.userEmail || !req.body.userName){
               res.status(422).json({message:'Email password and name must required'})
            }else{
                await userSerObj.addUserService(req.body)
                res.status(201).json({message:"User Created"})
            }
        }catch(err){
            let message:string = errorHandler(err);
            res.status(500).json({message})
        }
    }

    async loginUser(req:Request,res:Response):Promise<void>{
        try{
            let userId:string = req.body._id
            await userSerObj.loginService(userId)
           res.status(200).json({message:"Logged in successfully"})
        }catch(err){
            console.log(err)
            res.status(500).json({message:'error in login'})
        }
    }

    async logoutUser(req:Request,res:Response):Promise<void>{
        try{
            let {id} = req.params
            await userSerObj.logoutService(id)
            res.status(200).json({message:"Logged out succesfully"})
        }catch(err){
            res.status(500).json({message:'Error in logging out'})
        }
    }

    async deleteUSer(req:Request,res:Response):Promise<void>{
        try{
            let {id} = req.params
            await userSerObj.deleteUserService(id)
            res.status(200).json({message:"User Deleted Successfully"})
        }catch(err:any){
            let message:string = errorHandler(err);
            res.status(500).json({message})
        }
    }

    async viewProfiles(req:Request,res:Response):Promise<void>{
        try{
            let {id} = req.params
          let data:IProfiles[] = await userSerObj.viewProfileService(id)
            res.status(200).json({message:'data fethced sucessfully',data})
        }catch(err){
            res.status(500).json({message:"Error in view profiles"})
        }
    }
    //update user remaining..
    async updateUser(req:Request,res:Response):Promise<void>{
        try{
            let {id} = req.params
            let userObj:IUsers = req.body
            // console.log(userObj)
            if(Object.keys(req.body).some((ele)=>ele==="userName"||ele==="userEmail"||ele==="userPassword")){
                await userSerObj.updateUserService(id,userObj)
                res.status(200).json({message:"User Updated Succesfully"})
            }else{
                res.status(422).json({message:"Invalid Data Entry"})
            }
                
        }catch(err){
            let message:string = errorHandler(err);
            res.status(500).json({message})
        }
    }
}