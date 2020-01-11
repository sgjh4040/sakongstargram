import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        createRoom: async (_, args, { request }) => {
            isAuthenticated(request);
            const { toId } = args;
            const { user } = request;
            const room = await prisma.createRoom({
                participants: {
                    connect: [{ id: toId }, { id: user.id }]
                }
            })
            return room


        }
    }
}