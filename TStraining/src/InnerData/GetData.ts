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
    user.role = 1;
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

    await prisma.userInGroups.create({

        data: {
            userId: userId,
            groupId: groupId,
            isBanned: false,
            isAdmin: false
        }
    })

}

async function leaveGroup(userId: number, groupId: number) {

    await prisma.userInGroups.delete({

        where: {
            userId_groupId: {userId, groupId}
        }
    })

}

async function banInGroup(userId: number, groupId: number) {

    await prisma.userInGroups.upsert({
        where: {
            userId: userId,
            groupId: groupId
        },
        update: {
            isBanned: true
        },
        create: {
            isBanned: true
        }
    })

}


async function unBanInGroup(userId: number, groupId: number) {

    await prisma.userInGroups.updade({
        where: {
            userId: userId,
            groupId: groupId
        },
        data: {
            isBanned: false
        }
    })

}

async function setAdmin(userId: number, groupId: number) {

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



export { getMessageGroupId, createSession, checkSession, renewSession, getUser, getChat, getMessage, getGroup, createUser, createChat, createGroup, createMessage, joinGroup, setAdmin, banInGroup, leaveGroup, unBanInGroup, deleteAdmin }