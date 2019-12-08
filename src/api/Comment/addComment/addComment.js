import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        addComment: async(_,args,{request})=>{
            isAuthenticated(request);
            const {text, postId} = args;
            console.log('text',text);
            console.log('postId',postId);
            const {user} = request;
            const comment = await prisma.createComment({
                user:{
                    connect:{
                        id:user.id
                    }
                },
                post: {
                    connect:{
                        id:postId
                    }

                },
                text
            });
            return comment;
        }
    }
};