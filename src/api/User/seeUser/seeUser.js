import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    seeUser: async (_, args) => {
      console.log("seeUser");
      const { username } = args;
      
      return prisma.user({ username });
    }
  }
};