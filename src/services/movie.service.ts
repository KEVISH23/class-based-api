import { Request,Response } from "express";
import { movie,IMovies } from "../models";

export class movieService{
    async getAllMoviesService(req:Request,res:Response){
       let data = await movie.find()
       res.json({message:"Received",data})
    }
    async addMovieService(data:object):Promise<void>{
        await movie.create(data);
    }

    async deleteMovieService(req:Request,res:Response):Promise<void>{
        let {id} = req.params
        let data:IMovies|null = await movie.findByIdAndDelete(id)
        if(data){
            //todo remainig delete movie from watch later collection... 
            res.json({message:"Data Deleted Succesfully"})
        }else{
            res.json({message:"Invalid ID"})
        }
    }
}