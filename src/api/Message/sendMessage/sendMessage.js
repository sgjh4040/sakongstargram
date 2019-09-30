import { prisma } from "../../../../generated/prisma-client";
import {ROOM_FRAGMENT} from "../../../fragments";
export default {
    Mutation:{
        sendMessage: async (_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} =request;
            const {roomId,message,toId}= args;
            let room;
            if(roomId ===undefined){
                console.log("요기1")
                if(user.id !== toId){
                    room = await prisma.createRoom({
                        participants:{
                            connect: [{id:toId},{id:user.id}]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                }
            }else{
                console.log("요기2")
                room = await prisma.room({id:roomId}).$fragment(ROOM_FRAGMENT);
                if(!room){
                    throw Error("방을 찾지 못했습니다.")
                }
            }
            const getTo = room.participants.filter(participant => participant.id !==user.id)[0];
            return prisma.createMessage({
                text:message,
                from: {
                    connect: {id:user.id}
                },
                to:{
                    connect: {
                        id: roomId ? getTo.id: toId
                    }
                },
                room:{
                    connect:{
                        id:room.id
                    }
                }
            });

        }
    }
}