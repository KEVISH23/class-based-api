export const errorHandler = (err:any):string =>{
    // console.log(err)
    let message:string = '';
    if(err.name === 'CastError'){
        message = "Invalid ID from user"
        return message;
    }
    if(err.code === 11000){
        message = "Email already exists"
        return message
    }
    if(err.name === 'ValidationError'){
        for (const key in err.errors) {
            message+=err.errors[key].message
            message+=" & "
        }
        return message.slice(0,message.length-3)
    }
    return message = err.message
}