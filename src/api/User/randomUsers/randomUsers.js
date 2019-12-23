import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        randomUsers: async (_,args,{request,isAuthenticated})=>{
            console.log("searchRandom");
            isAuthenticated(request);
            const {user} = request;
            const {size} = args;
            let users = [];
            const allUserCount =await prisma.usersConnection().aggregate().count();
            for(let i=0; i<size;i++){
                let random = Math.floor(Math.random()*allUserCount);
                const user = await prisma.users({
                    first:1,
                    skip:random,
                    
                })
                users.push(user[0]);
            }
            return users.filter(m => m.id !== user.id);
            
        }
    }
}