import 'dotenv/config'
import { user,IUsers, IProfiles, profile, watchLater } from "../models";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class userService{
    async getAllUsersService():Promise<IUsers[]>{
        let data:IUsers[] = await user.find()
        return data;
    }

    async addUserService(userObj:IUsers):Promise<void>{
        let plainText = userObj.userPassword
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(plainText,salt)
        userObj.userPassword = hash
        await user.create(userObj)
    }

    async loginService(userId:string):Promise<void>{
       
        let tooken:string = jwt.sign({userId},"ZindagiEkSafarHaiSuhaNa")
        await user.findByIdAndUpdate(userId,{
            $set:{token:tooken}
        })
        
    }

    async logoutService(id:string):Promise<void>{
        
        await user.findByIdAndUpdate(id,{
            $set:{token:''}
        })
    }

    async deleteUserService(id:string):Promise<void>{
        await user.findByIdAndDelete(id)
        await profile.deleteMany({userId:id})
        await watchLater.deleteMany({userId:id})
    }

    async viewProfileService(id:string):Promise<IProfiles[]>{
       
        let data:IProfiles[] = await profile.find({userId:id})
        return data
    }

    async updateUserService(id:string,userObj:IUsers):Promise<object>{
        console.log(userObj);
        let data:object = await user.updateOne({_id:id},{userObj})
        console.log(data)
        return data
    }
}