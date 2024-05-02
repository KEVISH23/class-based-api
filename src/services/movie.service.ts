import { movie,IMovies, watchLater } from "../models";

export class movieService{
    async getAllMoviesService():Promise<IMovies[]>{
       let data:IMovies[] = await movie.find()
      return data
    }

    async addMovieService(data:object):Promise<void>{
        await movie.create(data);
    }

    async deleteMovieService(id:string):Promise<IMovies|null>{
      
        let data:IMovies|null = await movie.findByIdAndDelete(id)
        if(data){
            //todo remainig delete movie from watch later collection...
            await watchLater.deleteMany({movieId:id}) 
        }
        return data
    }
    async updateMovieService(id:string,data:IMovies):Promise<object>{
        // let dummy:IMovies|null = null
        let dataUpdated:object =  await movie.updateOne({_id:id},data)
        console.log(dataUpdated)
        return dataUpdated
        // return dummy
    }
}