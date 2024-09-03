const { PrismaClient } = require('.prisma/client');
import bcryptjs from "bcryptjs";
import { Request } from "express";

const prisma = new PrismaClient();


async function createSession(sessionId: number, user: any, date: Date) {

    await prisma.Session.create({
        data: {
            sessionId: sessionId,
            username: user.username,
            role: user.role,
            date: date
        }
    })

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
    if(group.adminId) {
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
            groupId: groupId
        }
    })

}

async function leaveGroup(userId: number, groupId: number) {

    await prisma.userInGroups.delete({

        where: {
            userId: userId,
            groupId: groupId
        }
    })

}

async function banInGroup(userId: number, groupId: number) {

    await prisma.banList.create({

        data: {
            userId: userId,
            groupId: groupId
        }
    })

}

async function setAdmin(userId: number, groupId: number) {

    await prisma.adminList.create({

        data: {
            userId: userId,
            groupId: groupId
        }
    })

    await prisma.userAccount.updade({
        where: {
            userId: userId
        },
        data: {
            role: 'admin'
        }
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



export { createSession, checkSession, getUser, getChat, getMessage, getGroup, createUser, createChat, createGroup, createMessage, joinGroup, setAdmin, banInGroup, leaveGroup }