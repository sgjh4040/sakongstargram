import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addComment: async (_, args, { request }) => {
            isAuthenticated(request);
            const { text, postId } = args;
            console.log('text', text);
            console.log('postId', postId);
            const { user } = request;
            const comment = await prisma.createComment({
                user: {
                    connect: {
                        id: user.id
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }

                },
                text
            }).$fragment(`
            fragment CommentParts on Comment {
                id
                text
                post{
                    id
                    user{
                        id
                    }
                }
            }
        `);
            const notification = await prisma.createNotification({
                from: {
                    connect: {
                        id: user.id
                    }
                },
                to: {
                    connect: {
                        id: comment.post.user.id
                    }
                },
                post: {
                    connect: {
                        id: comment.post.id
                    }
                },
                message: `${user.username}님이 댓글을 남겼습니다.`

            })

            console.log("comment", comment);

            return comment;
        }
    }
};