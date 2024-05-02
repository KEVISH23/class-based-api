import { movieController } from "../controller";
import express, { Router } from "express";

const route:Router = express.Router()
let mocobj = new movieController()
route.get('/getAllMovies',mocobj.getAllMovies)
route.post('/addNewMovies',mocobj.addMovieController)
route.delete('/deleteMovie/:id',mocobj.deleteMovie)
route.put('/updateMovie/:id',mocobj.updateMovie)
export default route