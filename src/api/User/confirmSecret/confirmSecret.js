import {prisma} from "../../../../generated/prisma-client"
import { generateToken } from "../../../utils";


export default {
    Mutation: {
        confirmSecret: async (_, args)=>{
            const {email,secret} = args;
            const user = await prisma.user({email});
            if (user.loginSecret === secret){
                //
                return generateToken(user.id);
            }else{
                throw Error("틀린 이메일 비밀번호")
            }
        }
    }
}