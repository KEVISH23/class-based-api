import { Router } from "express";
import { userController } from "../controller";
import { userMiddlewares } from "../middleware";
const userRouter:Router = Router()
let userControllerObj = new userController()
let userMiddlewareObj = new userMiddlewares()
userRouter.get('/getAllUsers',userControllerObj.getAllUsers)
userRouter.post('/addUser',userControllerObj.addUser)
userRouter.post('/loginUser',userMiddlewareObj.userLoginMiddleware,userControllerObj.loginUser)
userRouter.post('/logoutUser/:id',userMiddlewareObj.isLoggedIn,userControllerObj.logoutUser)
userRouter.delete('/deleteUser/:id',userMiddlewareObj.isLoggedIn,userControllerObj.deleteUSer)
userRouter.get('/viewProfiles/:id',userMiddlewareObj.isLoggedIn,userControllerObj.viewProfiles)

userRouter.put('/updateUser/:id',userMiddlewareObj.isLoggedIn,userControllerObj.updateUser)
export default userRouter