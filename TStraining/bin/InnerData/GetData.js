"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const { PrismaClient } = require('.prisma/client');
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sessionControl_1 = require("./sessionControl");
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
    (0, sessionControl_1.addNewSession)(UUID, user);
    //console.log(sessionMap)
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
    user.id = Number(user.id);
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
