import {Router} from 'express'
import { profileController } from '../controller'
import { userMiddlewares,profileMiddleWare } from '../middleware'
const profileRouter:Router = Router()
let profileControllerObj = new profileController()
let userMiddlewaresObj = new userMiddlewares()
let profileMiddleWareObj = new profileMiddleWare()
profileRouter.get('/getProfiles',profileControllerObj.getAllProfiles)

profileRouter.post('/addProfile/:id',userMiddlewaresObj.isLoggedIn,profileControllerObj.addProfile)

profileRouter.delete('/deleteProfile/:id/:profileId',userMiddlewaresObj.isLoggedIn,profileMiddleWareObj.matchUserAndProfile,profileControllerObj.deleteProfile)

profileRouter.post('/addWatchLater/:id/:profileId',userMiddlewaresObj.isLoggedIn,profileMiddleWareObj.matchUserAndProfile,profileMiddleWareObj.isMovieAdded,profileControllerObj.addWatchLater)

profileRouter.get('/viewWatchLater/:id/:profileId',userMiddlewaresObj.isLoggedIn,profileMiddleWareObj.matchUserAndProfile,profileControllerObj.viewWatchLater)

profileRouter.delete('/removeFromWatchLater/:id/:watchLaterId',userMiddlewaresObj.isLoggedIn,profileControllerObj.removeFromWatchLater)

profileRouter.get('/getPDFOfWatchLater/:id/:profileId',userMiddlewaresObj.isLoggedIn,profileMiddleWareObj.matchUserAndProfile,profileControllerObj.getPDFOfWatchLater)
export default profileRouter