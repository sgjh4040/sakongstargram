import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        randomPosts : async (_,args,{request,isAuthenticated})=>{
            console.log("searchRandomPost");
            isAuthenticated(request);
            const {user} = request;
            const {size} = args;
            let posts = [];
            const allPostCount = await prisma.postsConnection().aggregate().count();
            for(let i=0; i<size;i++){
                let random = Math.floor(Math.random()*allPostCount);
                const post = await prisma.posts({
                    first:1,
                    skip:random,
                    
                })
                posts.push(post[0]);
            }
            return posts;
        }
    }
}