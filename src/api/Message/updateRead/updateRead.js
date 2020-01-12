import {isAuthenticated} from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        updateRead: async (_,args,{request})=>{
            console.log(request.user);
            isAuthenticated(request);
            const {roomId} = args;
            const {user} = request;
            const filterOptions = {
                AND: [
                        {
                            to: {
                            id: user.id
                            }
                        },
                        {
                            room: {
                            id: roomId
                            }
                        },
                        {
                            readYn:false
                        }
                    ]
              };
              try{
                  console.log("updateReadYn");
                  const result=await prisma.updateManyMessages({
                      where: filterOptions,
                      data:{readYn:true}
                  })
                  if(result){
                      return true;
                  }
                  return false;

              }catch{

              }

            return false;
        }
    }

}