import { Request,Response } from "express";
import { IProfiles, IWatchLater } from "../models";
import { profileServices } from "../services";
import { errorHandler } from "../handler/errorHandler";
import getPdfHandler from "../handler/pdfHandler";
let pServObj = new profileServices()
export class profileController{
    async getAllProfiles(req:Request,res:Response):Promise<void>{
        try{
            let data:IProfiles[] =  await pServObj.getAllProfilesService()
            res.status(200).json(data)
        }catch(err:any){
            res.status(500).json({message:'error'})
        }
    }

    async addProfile(req:Request,res:Response):Promise<void>{
        try{
            let {id} = req.params
            await pServObj.addProfileService(id,req.body.profileName)
            res.status(201).json({message:'User profile created'})
            
         }catch(err:any){
             let message:string = errorHandler(err)
             res.status(400).json({message})
         }
    }
    async deleteProfile(req:Request,res:Response):Promise<void>{
        try{
            const {profileId} = req.params
           await pServObj.deleteProfileService(profileId)
            res.status(200).json({message:"Profile Deleted"})
            
        }catch(err:any){
            let message:string = errorHandler(err)
            if(message!=''){
                res.status(400).json({message})
            }else{
                res.status(500).json({message:"Error in deleting profile"})
            }
        }
    }

    addWatchLater = async(req:Request,res:Response):Promise<void>=>{
        try{
            const {id,profileId} = req.params
            const {movieId} = req.body
            await pServObj.addWatchLaterService(id,profileId,movieId)
            res.status(201).json({message:"Movie added to watch list"})
        }catch(err:any){
            console.log(err)
            let message:string = errorHandler(err)
            res.status(400).json({message})
        }
    }

    viewWatchLater = async(req:Request,res:Response):Promise<void>=>{
        try{
            // console.log(req.user)
            const {id,profileId} = req.params
            const data:IWatchLater[] = await pServObj.viewWatchLaterService(id,profileId)
            res.status(200).json({message:"Received data",data})
           
        }catch(err:any){
            console.log(err)
            let message:string = errorHandler(err)
            res.status(400).json({message})
        }
    }

    removeFromWatchLater = async(req:Request,res:Response):Promise<void>=>{
        try{
            const {watchLaterId} = req.params
            let data:IWatchLater|null = await pServObj.removeFromWatchLaterService(watchLaterId)
            if(!data){
                res.status(400).json({message:"Already removed or Invalid data passed!!"})
            }else{
                res.status(200).json({message:"Remove from watch later"})
            }
        }catch(err:any){
            let message:string = errorHandler(err)
            if(message!=''){
                res.status(400).json({message})
            }else{
                res.status(500).json({message:"Error in removing watch later"})
            }
        }
    }
    
    getPDFOfWatchLater = async(req:Request,res:Response):Promise<void>=>{
        try{
            const {id,profileId} = req.params
            const doc = await pServObj.getPdfService(id,profileId)
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
            doc.pipe(res)
            doc.end()
        }catch(err){
            console.log(err)
            let message = errorHandler(err)
            res.status(500).json({message})
        }
    }
}