import { IProfiles, IWatchLater, profile, watchLater } from "../models"
import getPdfHandler from "../handler/pdfHandler"
export class profileServices{
    async getAllProfilesService():Promise<IProfiles[]>{
        let data:IProfiles[] = await profile.find()
        return data
    }
    async addProfileService(id:string,profileName:string):Promise<void>{
        await profile.create({
           userId:id,
           profileName:profileName
        })
    }

    async deleteProfileService(profileId:string):Promise<void>{
        await profile.findByIdAndDelete({_id:profileId})
        await watchLater.deleteMany({profileId:profileId})
    }

    async addWatchLaterService(id:string,profileId:string,movieId:string):Promise<void>{
        await watchLater.create({
            profileId:profileId,
            userId:id,
            movieId:movieId
        })
    }
    async viewWatchLaterService(id:string,profileId:string):Promise<IWatchLater[]>{
        const data:IWatchLater[] = await watchLater.find({ profileId, userId: id })
        .populate({ path: "movieId"});
        return data
    }

    async removeFromWatchLaterService(watchLaterId:string):Promise<IWatchLater|null>{
        let data:IWatchLater|null = await watchLater.findByIdAndDelete({_id:watchLaterId})
        return data
    }
    async getPdfService(id:string,profileId:string):Promise<any>{
        const data:IWatchLater[] = await watchLater.find({ profileId, userId: id })
        .populate({ path: "movieId"});
        const doc = getPdfHandler(data)
        return doc
    }
}