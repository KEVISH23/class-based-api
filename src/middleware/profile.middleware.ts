import { NextFunction, Request, Response } from "express";
import { IProfiles, IWatchLater, profile, watchLater } from "../models";
import { errorHandler } from "../handler/errorHandler";

export class profileMiddleWare{
    async matchUserAndProfile(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {id,profileId} = req.params
            let data:IProfiles|null = await profile.findOne({_id:profileId,userId:id})
            if(data){
                next()
            }else{
                res.status(401).json({message:"Invalid Profile Id with user id"})
            }
        }catch(err:any){
            let message:string = errorHandler(err)
            res.status(500).json({message})
        }
    }

    async isMovieAdded(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {id,profileId} = req.params
            const {movieId} = req.body
            let data:IWatchLater|null = await watchLater.findOne({profileId:profileId,userId:id,movieId:movieId})
            if(!data){
                next()
            }else{
                res.status(409).json({message:"Movie Already in watch later"})
            }
        }catch(err:any){
            let message:string = errorHandler(err)
            res.status(500).json({message})
        }
    }
}