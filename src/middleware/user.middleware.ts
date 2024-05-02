import {Request,Response,NextFunction} from 'express'
import { user,IUsers } from '../models'
import bcrypt from 'bcrypt'
import { errorHandler } from '../handler/errorHandler'
export class userMiddlewares{
    async userLoginMiddleware(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            if(!req.body.userEmail || !req.body.userPassword){
                res.json({message:'Must have email, password'})
            }else{
                const {userEmail,userPassword} = req.body
                let isUser:IUsers|null = await user.findOne({userEmail:userEmail,$expr:{$gt:[{$strLenCP:"$token"},0]}})//$expr:{$gt:[{$strLenCP:"$token"},0]}
                if(isUser){
                    // res.json({here:"here"})
                   res.status(400).json({message:'User already Logged in'})
                }else{ 
                    let dbuser:IUsers|null = await user.findOne({userEmail})
                    if(!dbuser){
                        res.status(400).json({message:"Please register before login"})
                    }else{
                        bcrypt.compare(userPassword,dbuser.userPassword,(err,result)=>{
                            if(result){
                                req.body = dbuser
                                next()
                            }else{
                                res.status(401).json({message:"Invalid Credentials"})
                            }
                        })
                    }
                }
            }
        }catch(err:any){
            console.log(err)
            res.json({message:"Error in server"})
        }
    }

    async isLoggedIn(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            let {id} = req.params
            let isUser:IUsers|null = await user.findOne({_id:id,$expr:{$gt:[{$strLenCP:"$token"},0]}})//$expr:{$gt:[{$strLenCP:"$token"},0]}
            if(isUser){
                // res.json({here:"here"})
                next()
            }else{
                res.status(401).json({message:"User not LoggedIn"})
            }
        }catch(err){
            let message:string = errorHandler(err);
            res.status(500).json({message})
        }
    }
}