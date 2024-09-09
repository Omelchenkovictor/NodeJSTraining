const { PrismaClient } = require('.prisma/client');
import bcryptjs from "bcryptjs";
import { Request } from "express";
import { addNewSession } from "./sessionControl";

const prisma = new PrismaClient();


async function createSession(sessionId: string, user: any, date: Date) {

    await prisma.Session.create({
        data: {
            sessionId: sessionId,
            username: user.username,
            role: user.role,
            date: date
        }
    })

}

async function renewSession(UUID: string, username: string,) {
    const user = await prisma.userAccount.findFirst({
        where: {
            username: username
        },
        include: {
            groups: {
                include: {
                    group: {
                        include: {
                            chats: {
                                select: {
                                    id: true
                                }
                            }
                        }
                    },

                },
                where: {
                    OR: [
                        { isBanned: false },
                        { isAdmin: true }
                    ]

                }
            }
        },
    })
    //console.log(user.groups[0])

    /* data.userId = (await getUser(req.cookies.user)).id,
        data.role = req.cookies.role,
        data.adminIn = await prisma.userInGroups.findMany({
            where: {
                userId: data.userId,
                isAdmin: true
            },
            select: {
                groupId: true,
            }
        })
    data.bannedIn = await prisma.userInGroups.findMany({
        where: {
            userId: data.userId,
            isBanned: true
        },
        select: {
            groupId: true,
        }
    }) */



    addNewSession(UUID, user)
    //console.log(sessionMap)
}

async function checkSession(req: Request) {

    return await prisma.Session.findFirst({
        where: {
            sessionId: req.cookies.sessionId,
            username: req.cookies.username,
            role: req.cookies.role,
            date: req.cookies.date
        }
    })

}



async function createUser(user: any) {

    user.password = await bcryptjs.hash(user.password, 10)
    user.role = 'user';
    await prisma.userAccount.create({
        data: user
    })

}

async function createGroup(group: any) {
    console.log(group.adminId)
    if (group.adminId) {
        group.adminId = Number(group.adminId)
    }
    await prisma.group.create({
        data: group
    })

}

async function createChat(chat: any) {
    chat.groupId = Number(chat.groupId)
    await prisma.chat.create({

        data: chat
    })

}

async function createMessage(message: any) {
    message.chatId = Number(message.chatId);
    message.userId = Number(message.userId);
    await prisma.message.create({

        data: message
    })

}

async function joinGroup(userId: number, groupId: number) {
    userId = Number(userId);
    groupId = Number(groupId);
    await prisma.userInGroups.create({

        data: {
            userId: Number(userId),
            groupId: Number(groupId),
            isBanned: false,
            isAdmin: false
        }
    })

}

async function leaveGroup(userId: number, groupId: number) {
    userId = Number(userId);
    groupId = Number(groupId);
    await prisma.userInGroups.delete({

        where: {
            userId_groupId: { userId, groupId }
        }
    })

}

async function banInGroup(userId: number, groupId: number) {
    userId = Number(userId);
    groupId = Number(groupId);
    await prisma.userInGroups.upsert({
        where: {
            userId_groupId: { userId, groupId }
        },
        update: {
            isBanned: true
        },
        create: {
            user: {
                connect: {

                    id: userId

                }
            },
            group: {
                connect: {

                    id: groupId

                }
            },
            isBanned: true
        }
    })

}


async function banInChat(userId: number, chatId: number) {
    userId = Number(userId);
    chatId = Number(chatId);
    await prisma.userInChats.upsert({
        where: {
            userId_chatId: { userId: userId, chatId: chatId }
        },
        update: {
            isBanned: true
        },
        create: {
            // userAndGroup: {
            //     connectOrCreate: { 
            //         where: {userId_groupId: {
            //         userId: userId,
            //         groupId: await getMessageGroupId(chatId)
            //         } },
            //         create: {
            //             userId_groupId: {
            //                 userId: userId,
            //                 groupId: await getMessageGroupId(chatId)
            //                 }
            //         }

            //     }
            //     /* userId_groupId: {
            //         userId: userId,
            //         groupId: await getMessageGroupId(chatId)
            //     } */
            // },
            // chat: {
            //     connect: { id: chatId }
            // },

            user: {
                connect: {

                    id: userId

                }
            },
            chat: {
                connect: {

                    id: chatId

                }
            },
            isBanned: true
        }
    })

}

async function unBanInChat(userId: number, chatId: number) {
    userId = Number(userId);
    chatId = Number(chatId);
    await prisma.userInChats.upsert({
        where: {
            userId_chatId: { userId, chatId }
        },
        update: {
            isBanned: false
        },
        create: {
            isBanned: false
        }
    })

}

async function isChatBanned(userId: number, chatId: number) {
    userId = Number(userId);
    chatId = Number(chatId);
    return (await prisma.userInChats.findFirst({
        where: {
            userId: userId,
            chatId: chatId
        }
    }))
}


async function unBanInGroup(userId: number, groupId: number) {
    userId = Number(userId);
    groupId = Number(groupId);
    await prisma.userInGroups.updade({
        where: {
            userId_groupId: { userId, groupId }
        },
        data: {
            isBanned: false
        }
    })

}

async function setAdmin(userId: number, groupId: number) {
    userId = Number(userId);
    groupId = Number(groupId);
    await prisma.userInGroups.upsert({
        where: {
            userId_groupId: { userId, groupId }
        },
        update: {
            isAdmin: true
        },
        create: {
            userId: userId,
            groupId: groupId,
            isAdmin: true,
            isBanned: false
        }
    })

}

async function deleteAdmin(userId: number, groupId: number) {
    userId = Number(userId);
    groupId = Number(groupId);
    await prisma.userInGroups.update({
        where: {
            userId: userId,
            groupId: groupId
        },
        data: {
            isAdmin: false
        },
    })

}




async function getUser(username: string) {

    return (await prisma.userAccount.findFirst({
        where: {
            username: username,
        },

    }))
}

async function getMessage(id: number) {

    return (await prisma.message.findFirst({
        where: {
            id: Number(id),
        },
    }))
}

async function getMessageGroupId(id: number) {
    return (await prisma.chat.findFirst({
        where: {
            id: Number(id),
        }
    })).groupId
}

async function getChat(id: number) {

    return (await prisma.chat.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            messages: true,
        }
    }))
}

async function getGroup(id: number) {

    return (await prisma.group.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            members: true,
            chats: true
        }
    }))
}



export { banInChat, unBanInChat, isChatBanned, getMessageGroupId, createSession, checkSession, renewSession, getUser, getChat, getMessage, getGroup, createUser, createChat, createGroup, createMessage, joinGroup, setAdmin, banInGroup, leaveGroup, unBanInGroup, deleteAdmin }