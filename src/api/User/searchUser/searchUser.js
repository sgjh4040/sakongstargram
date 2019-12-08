import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchUser: async (_,args)=>{
            console.log("searchUser")
            console.log(args.term);
            return await prisma.users({
                where:{
                    OR:[
                        {username_contains: args.term},
                        {firstName_contains: args.term},
                        {lastName_contains: args.term}
                    ]
                }
            })
        }
    }
};