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
            const sizeArray = Array(allPostCount).fill().map((v, i) => i );
            
            for(let i=0; i<size;i++){
                let random = sizeArray.splice(Math.floor(Math.random() * sizeArray.length), 1)[0];
                if(random === undefined){
                    break;
                }else{
                    const post = await prisma.posts({
                        first:1,
                        skip:random,
                        
                    })
                    posts.push(post[0]);
                }
            }
            return posts;
        }
    }
}