import {isAuthenticated} from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        toggleLike: async (_,args,{request})=>{
            console.log("toggle like");
            console.log(request.user);
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;
            const filterOptions = {
                AND: [
                        {
                            user: {
                            id: user.id
                            }
                        },
                        {
                            post: {
                            id: postId
                            }
                        }
                    ]
              };
            try{
                console.log("toggle like");
                const existingLike = await prisma.$exists.like(filterOptions);
                if (existingLike){
                    await prisma.deleteManyLikes(filterOptions);
                }else{
                    await prisma.createLike({
                        user: {
                            connect:{
                                id:user.id
                            }
                        },
                        post: {
                            connect:{
                                id:postId
                            }
                        }
                    });
                }
                return true;
            }catch(err){
                console.log(err);
                return false;

            }
        }
    }
}