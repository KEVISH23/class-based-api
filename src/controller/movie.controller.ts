import {Request,Response} from 'express'
import { errorHandler } from '../handler/errorHandler'
import { movieService } from '../services'
let movieServiceObj = new movieService()
export class movieController{
    async getAllMovies(req:Request,res:Response):Promise<void>{
        try{
            await movieServiceObj.getAllMoviesService(req,res)
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
           await movieServiceObj.deleteMovieService(req,res)
        }catch(err:any){
            let message:string = errorHandler(err)
            res.json({message})
        }   
    }


    
}