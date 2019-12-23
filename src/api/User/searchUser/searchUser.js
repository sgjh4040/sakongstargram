import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchUser: async (_,args,{ request, isAuthenticated })=>{
            console.log("searchUser")
            console.log(args.term);
            isAuthenticated(request);
            const { user } = request;
            const users= await prisma.users({
                where:{
                    OR:[
                        {username_contains: args.term},
                        {firstName_contains: args.term},
                        {lastName_contains: args.term}
                    ]
                }
            });
            const result = users.filter(m => m.id !== user.id);
            return result;


        }
    }
};