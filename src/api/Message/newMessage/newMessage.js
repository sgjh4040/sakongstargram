import { prisma } from "../../../../generated/prisma-client";

export default {
    Subscription:{
        newMessage: {
            subscribe:(_,args,ctx,info)=>{
                const {roomId} = args;
                console.log(roomId);
                return prisma.$subscribe.message({
                    where:{
                        mutation_in:['CREATED', 'UPDATED']
                    }
                },info).node();
                // return prisma.$subscribe.message({
                //     AND:[
                //         {mutation_in:"CREATED"},
                //         {
                //             node:{
                //                 room:{id:roomId}
                //             }
                //         }
                //     ]
                // },info).node();
                
            },
            resolver: payload => {
                console.log("resolver");
                return payload.node()
            }
        }
    }
};