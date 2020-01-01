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
            const sizeArray = Array(allUserCount).fill().map((v, i) => i );
            for(let i=0; i<size;i++){
                let random = sizeArray.splice(Math.floor(Math.random() * sizeArray.length), 1)[0];
                if(random === undefined){
                    break;
                }else{
                    const user = await prisma.users({
                        first:1,
                        skip:random,
                        
                    })
                    users.push(user[0]);
                }
            }
            return users.filter(m => m.id !== user.id);
            
        }
    }
}