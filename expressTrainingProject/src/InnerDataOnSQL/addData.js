const { PrismaClient } = require('.prisma/client');

const prisma = new PrismaClient();
const listOfArticles = [];

async function addUser(username, email, password, aboutMe) {

    await prisma.userAccount.create({
        data: {
            email: email,
            password: password,
            username: username
        }
    })
    await prisma.userInfo.create({
        data: {
            aboutMe: aboutMe,
            username: username
        }
    })
    
}

async function addArticle(username, title, text) {

    return ( await prisma.article.create({
        data: {
            username: username,
            title: title,
            text: text
        }
    })).id;


}

async function addComment(username, text, articleId) {

    await prisma.comment.create({
        data: {
            username: username,
            text: text,

            articleId: articleId
        }
    })
}


//addArticle('Garfield', 'Lazanja', 'It was TASTY!')
//addUser('Garfield', 'Lazanja@mail.bom', '1234', 'Lazanja');
/* addUser('Bob', '112233@mail.bom', '4321', 'Bad one');
addUser('Cat', 'meow@mail.bom', 'meow', 'meow-meow');

(async() => {
    listOfArticles.push( await addArticle('Anby', 'Last film', 'It was Great! I like it!'));
    listOfArticles.push( await addArticle('Bob', 'Boring film', 'It was so stupid! I hate it!'));
    listOfArticles.push( await addArticle('Cat', 'How to win in life', 'Just be a cat!'));
    console.log(listOfArticles[0])
    addComment('Bob', 'Nah, it was boring', listOfArticles[0]);
    addComment('Anby', 'Nah, it was good', listOfArticles[1]);
    addComment('Cat', 'meow-meow', listOfArticles[0]);
    addComment('Cat', 'meow-meow', listOfArticles[1]);
    addComment('Anby', 'meow?', listOfArticles[2]);
    addComment('Bob', 'meow-meow!?', listOfArticles[2]);
})()
 */

