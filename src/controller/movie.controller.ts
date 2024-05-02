import {Request,Response} from 'express'
import { errorHandler } from '../handler/errorHandler'
import { movieService } from '../services'
import { IMovies } from '../models'
import { isEmpty } from '../handler/emptyObject'
let movieServiceObj = new movieService()
export class movieController{
    async getAllMovies(req:Request,res:Response):Promise<void>{
        try{
            let data:IMovies[] = await movieServiceObj.getAllMoviesService()
            res.json({message:"Received",data})
        }catch(err:any){
            res.status(500).json({message:"Error"})
        }
    }
    async addMovieController(req:Request,res:Response):Promise<void>{
        try{
            await movieServiceObj.addMovieService(req.body)
            res.status(201).json({message:"data inserted successfully"})
        }catch(err:any){
           let message : string = errorHandler(err)
           res.status(200).json({message})
        }
    }
    deleteMovie = async(req:Request,res:Response):Promise<void>=>{
        try{
            let {id} = req.params
           let data:IMovies|null = await movieServiceObj.deleteMovieService(id)
           if(data){
               res.status(200).json({message:"Data Deleted Succesfully"})
           }else{
            res.status(400).json({message:"Already deleted!!!"})
           }
        }catch(err:any){
            let message:string = errorHandler(err)
            res.status(500).json({message})
        }   
    }

    updateMovie =  async(req:Request,res:Response):Promise<void>=>{
        try{
            let {id} = req.params
            let movieObj:IMovies = req.body
            const { userEmail = ""} = req.body;
            
            // if(!isEmpty(movieObj)){

                let data:any = await movieServiceObj.updateMovieService(id,movieObj)
                 if(data.acknowledged){
                     res.status(200).json({message:"Data Updated Succesfully"})
                 }else{
                  res.status(401).json({message:"Invalid Data Entry"})
                 }
            // }else{
            //     res.status(400).json({message:"Nothing provided to update"})
            // }
           
        }catch(err:any){
            let message:string = errorHandler(err)
            res.status(500).json({message})
        }   
    }
}