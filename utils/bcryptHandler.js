const bcrypt=require("bcrypt")
const saltrounds=10;

export class bcrypthandler{
    getpassword=async(password)=>{
        return await bcrypt.hash(password,saltrounds)
    }
    verifyPassword=async(password,hash)=>{
        return await bcrypt.compare(password,hash)
    }
}