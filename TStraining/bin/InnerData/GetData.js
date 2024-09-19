"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringParser = void 0;
exports.banInChat = banInChat;
exports.unBanInChat = unBanInChat;
exports.isChatBanned = isChatBanned;
exports.getMessageGroupId = getMessageGroupId;
exports.createSession = createSession;
exports.checkSession = checkSession;
exports.renewSession = renewSession;
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
exports.unBanInGroup = unBanInGroup;
exports.deleteAdmin = deleteAdmin;
exports.chatHistory = chatHistory;
exports.getUsername = getUsername;
const { PrismaClient } = require('.prisma/client');
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sessionControl_1 = require("./sessionControl");
const prisma = new PrismaClient();
const StringParser = (data) => {
    let reader = data.split('/?');
    let map = {};
    reader.forEach((element, index) => {
        if (index != 0) {
            let data = element.split('=');
            map[data[0]] = data[1];
        }
    });
    return map;
};
exports.StringParser = StringParser;
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
async function renewSession(UUID, username) {
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
    });
    (0, sessionControl_1.addNewSession)(UUID, user);
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
    user.role = 'user';
    await prisma.userAccount.create({
        data: user
    });
}
async function createGroup(group) {
    group.id = Number(group.id);
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
    userId = Number(userId);
    groupId = Number(groupId);
    await prisma.userInGroups.create({
        data: {
            userId: Number(userId),
            groupId: Number(groupId),
            isBanned: false,
            isAdmin: false
        }
    });
}
async function leaveGroup(userId, groupId) {
    userId = Number(userId);
    groupId = Number(groupId);
    await prisma.userInGroups.delete({
        where: {
            userId_groupId: { userId, groupId }
        }
    });
}
async function banInGroup(userId, groupId) {
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
    });
}
async function banInChat(userId, chatId) {
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
    });
}
async function unBanInChat(userId, chatId) {
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
    });
}
async function isChatBanned(userId, chatId) {
    userId = Number(userId);
    chatId = Number(chatId);
    return (await prisma.userInChats.findFirst({
        where: {
            userId: userId,
            chatId: chatId
        }
    }));
}
async function unBanInGroup(userId, groupId) {
    userId = Number(userId);
    groupId = Number(groupId);
    await prisma.userInGroups.updade({
        where: {
            userId_groupId: { userId, groupId }
        },
        data: {
            isBanned: false
        }
    });
}
async function setAdmin(userId, groupId) {
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
    });
    await prisma.userAccount.update({
        where: {
            id: userId
        },
        data: {
            role: 'admin'
        }
    });
}
async function deleteAdmin(userId, groupId) {
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
async function getMessageGroupId(id) {
    return (await prisma.chat.findFirst({
        where: {
            id: Number(id),
        }
    })).groupId;
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
async function chatHistory(id) {
    return (await prisma.chat.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            messages: {
                orderBy: {
                    id: 'desc',
                },
                take: 5
            },
        }
    }));
}
async function getUsername(id) {
    return await (await prisma.userAccount.findFirst({
        where: {
            id: id,
        },
    })).username;
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
