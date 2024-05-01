// import { addMovieController, deleteMovie } from "../controllers/movie.controller";
import { movieController } from "../controller";
import movie from "../models/movie.model";
import express, { Router,Request,Response } from "express";

const route:Router = express.Router()
let mocobj = new movieController()
route.get('/getAllMovies',mocobj.getAllMovies)
route.post('/addNewMovies',mocobj.addMovieController)
route.delete('/deleteMovie/:id',mocobj.deleteMovie)

export default route