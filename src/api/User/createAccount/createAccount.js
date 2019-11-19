import { prisma } from "../../../../generated/prisma-client"


export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName = "", lastName = "", bio = "" } = args;
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
                bio
            });
            return true


        }
    }
}