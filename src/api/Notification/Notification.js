import { prisma } from "../../../generated/prisma-client";

export default {
    Notification: {
        from: ({ id }) => prisma.notification({id}).from(),
        to: ({ id }) => prisma.notification({id}).to(),
        post: ({ id }) => prisma.notification({id}).post()
    }
}