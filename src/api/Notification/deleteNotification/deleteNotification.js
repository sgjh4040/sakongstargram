import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        deleteNotification: async (_,args,{request,isAuthenticated})=>{
            console.log("deleteNotification");
            isAuthenticated(request);
            const {id} = args;
            const notification = await prisma.deleteNotification({
                id
            });
            return notification;
        }
    }
}