import { prisma } from "../../../../generated/prisma-client"


export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName = "", lastName = "", bio = "",avatar="https://bootdey.com/img/Content/avatar/avatar7.png" } = args;
            const exist = await prisma.$exists.user({
                OR:[
                    {
                        username
                    },
                    {
                        email
                    }
                ]
            });
            if(exist){
                throw Error("이름 또는 이메일이 이미 존재합니다.")
            }
            await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                avatar,
                bio,
                following:{
                    connect:{
                        id:'ck4vke3xm002n0774xixbdid1'
                    }
                }
            });
            return true


        }
    }
}