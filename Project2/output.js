const {AccountData, UserData, ArticleData, CommentData} = require('./Data');

function returnAllComments(inputedUser, inputedId) {
    const output = [];
     CommentData.forEach((value) =>{
        if (value.relatedTopickId == inputedId){
            let Comment = {
                username: value.username,
                text: value.text
            }
            output.push(Comment)
        }
    })
    return output;
}


function returnAllArticles(inputedUser) {
    const output = [];
     ArticleData.forEach((value) =>{
        if (value.username == inputedUser.username){
            let Article = {
                title: value.title,
                comments: returnAllComments(inputedUser, value.id)
            }
            output.push(Article)
        }
    })
    return output;
}

function returnUser(inputedUser) {
    const output = {
        email: inputedUser.email,
        articles: returnAllArticles(inputedUser)
    }
    return output;
}

function returnAllUsers() {
    const output =[]
    AccountData.forEach(element => {
        output.push(returnUser(element))
    });
    return output;
}
