import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        seeMessages: async (_,__,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user}= request;
            return prisma.messages({
                where:{
                    to:{
                        id: user.id
                    },
                    readYn: false
                },
                orderBy: "updatedAt_DESC"
            });
        }
    }
}