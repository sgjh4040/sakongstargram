import { prisma } from "../../../../generated/prisma-client";


export default {
    Query:{
        seeRoom: async (_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user}= request;
            const {id} = args;
            const canSee = await prisma.$exists.room({
                participants_some:{
                    id:user.id
                }
            });
            if (canSee){
                return prisma.room({id});

            }else{
                throw Error("방 접근권한이 없습니다.")
            }
        }
    }
}