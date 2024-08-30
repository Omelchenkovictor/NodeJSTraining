const { PrismaClient } = require('.prisma/client');

const prisma = new PrismaClient();


async function logUser(username) {

    let user = (await prisma.userAccount.findFirst({
        where: {
            username: username,
        },
    }))

    if (user == null) {
        return {alive: "no", user: null, articles: [], comments: []}
    }

    let articles = (await prisma.article.findMany({
        where: {
            username: username,
        },
    }))

    

    let comments =(await prisma.comment.findMany({
        where: {
            username: username,
        },
    }))


    //let resJSON = (JSON.stringify({user, articles, comments}, null, ' '))
    //res.write(resJSON)
    
    return {user, articles, comments}
}


async function logArticle(id) {
    let article = (await prisma.article.findUnique({
        where: {
            id: id,
        },
    }))
    
    if (article == null) {
        return {alive: "no", user: null, articles: [], comments: []}
    }

    let comments = (await prisma.comment.findMany({
        where: {
            articleId: id,
        },
    }))

    //let resJSON = (JSON.stringify({article, comments}, null, ' '))
    //res.write(resJSON)
    
    return {article, comments}
}


async function changeArticle(id, text) {

    await prisma.article.update({
        where: {
          id: Number(id),
        },
        data: {
          text: text,
          updatedAt: new Date
        }
    })
    
}

async function deleteElement(type, id) {
    switch (type) {
        case 'user':
            await prisma.userAccount.delete({
                where: {
                  username: id,
                },
            })
            break;
        case 'article':
            await prisma.article.delete({
                where: {
                  id: Number(id),
                },
            })
            break;
        case 'comment':
            await prisma.comment.delete({
                where: {
                  id: Number(id),
                },
            })
            break;
        default:
            break;
    }
    
}


module.exports = { logArticle, logUser, changeArticle, deleteElement };