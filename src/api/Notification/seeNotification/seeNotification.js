import { prisma } from "../../../../generated/prisma-client";


export default {
    Query:{
        seeNotification: async(_, __, {request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} =request;
            
            return prisma.notifications({
                where:{
                    to:{
                        id:user.id
                    }
                },
                orderBy: "createdAt_DESC"
            })
        }
    }
}