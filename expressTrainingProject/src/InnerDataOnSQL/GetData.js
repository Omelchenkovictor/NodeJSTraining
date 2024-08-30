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

module.exports = { logArticle, logUser }