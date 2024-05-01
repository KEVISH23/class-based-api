import mongoose, { Model, Schema } from "mongoose";
export interface IMovies{
    movieName:string,
    movieSynopsis:string,
    runTime:number,
    releaseDate:Date,
    ratings:number,
    genre:string,
    cast:string[],
};

const movieSchema:Schema = new Schema<IMovies>({
    movieName:{
        type:String,
        required:[true,'Movie name is required']
    },
    movieSynopsis:{
        type:String,
        required:[true,"Synopsis required"],
        maxLength:[300,"Description length exceed can be upto 300 characters"]
    },
    runTime:{
        type:Number,
        required:[true,"Runtime required"]
    },
    releaseDate:{
        type:Date,
        required:[true,'Release Date Required']
    },
    ratings:{
        type:Number,
        required:[true,'Ratings Required'],
        min:[1,"Minimum 1 rating"],
        max:[10,"Maximum 10 ratings"]
    },
    genre:{
        type:String,
        enum:['Action','Comedy','Romance','Thriller','Drama','Mysterious','Horror','Biopic','Crime'],
        required:[true,"Should have a genre"]
    },
    cast:[String]
})

const movie:Model<IMovies> = mongoose.model<IMovies>('movie',movieSchema)

export default movie