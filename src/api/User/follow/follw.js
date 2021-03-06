import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation: {
        follow: async (_,args, {request})=>{
            console.log("follow")
            isAuthenticated(request);
            const {id} = args;
            const {user} = request;
            try{
                await prisma.updateUser({
                    where:{id:user.id},
                    data:{
                        following:{
                            connect:{
                                id
                            }
                        }
                    }
                })
                return true;
            }catch(err){
                return false;
            }
        }
    }
}