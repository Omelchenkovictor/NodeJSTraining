"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.checkSession = checkSession;
exports.getUser = getUser;
exports.getChat = getChat;
exports.getMessage = getMessage;
exports.getGroup = getGroup;
exports.createUser = createUser;
exports.createChat = createChat;
exports.createGroup = createGroup;
exports.createMessage = createMessage;
exports.joinGroup = joinGroup;
exports.setAdmin = setAdmin;
exports.banInGroup = banInGroup;
exports.leaveGroup = leaveGroup;
const { PrismaClient } = require('.prisma/client');
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new PrismaClient();
async function createSession(sessionId, user, date) {
    await prisma.Session.create({
        data: {
            sessionId: sessionId,
            username: user.username,
            role: user.role,
            date: date
        }
    });
}
async function checkSession(req) {
    return await prisma.Session.findFirst({
        where: {
            sessionId: req.cookies.sessionId,
            username: req.cookies.username,
            role: req.cookies.role,
            date: req.cookies.date
        }
    });
}
async function createUser(user) {
    user.password = await bcryptjs_1.default.hash(user.password, 10);
    user.role = 1;
    await prisma.userAccount.create({
        data: user
    });
}
async function createGroup(group) {
    console.log(group.adminId);
    if (group.adminId) {
        group.adminId = Number(group.adminId);
    }
    await prisma.group.create({
        data: group
    });
}
async function createChat(chat) {
    chat.groupId = Number(chat.groupId);
    await prisma.chat.create({
        data: chat
    });
}
async function createMessage(message) {
    message.chatId = Number(message.chatId);
    message.userId = Number(message.userId);
    await prisma.message.create({
        data: message
    });
}
async function joinGroup(userId, groupId) {
    await prisma.userInGroups.create({
        data: {
            userId: userId,
            groupId: groupId
        }
    });
}
async function leaveGroup(userId, groupId) {
    await prisma.userInGroups.delete({
        where: {
            userId: userId,
            groupId: groupId
        }
    });
}
async function banInGroup(userId, groupId) {
    await prisma.banList.create({
        data: {
            userId: userId,
            groupId: groupId
        }
    });
}
async function setAdmin(userId, groupId) {
    await prisma.adminList.create({
        data: {
            userId: userId,
            groupId: groupId
        }
    });
    await prisma.userAccount.updade({
        where: {
            userId: userId
        },
        data: {
            role: 'admin'
        }
    });
}
async function getUser(username) {
    return (await prisma.userAccount.findFirst({
        where: {
            username: username,
        },
    }));
}
async function getMessage(id) {
    return (await prisma.message.findFirst({
        where: {
            id: Number(id),
        },
    }));
}
async function getChat(id) {
    return (await prisma.chat.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            messages: true,
        }
    }));
}
async function getGroup(id) {
    return (await prisma.group.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            members: true,
            chats: true
        }
    }));
}
