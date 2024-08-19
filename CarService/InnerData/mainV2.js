const {AccountData, UserData, ArticleData, CommentData, commentCounter, articleCounter, ArticleIndex, CommentIndex, CommentIndexByUser} = require('./Data');
const UserAccount = require('./UserAccount');
const UserInfo = require('./UserInfo');
const Comment = require('./Comment');
const Article = require('./Article');


function CreateUser(username, email, password)  {
        let Obj = new UserAccount(username, email, password);
        Obj.addToData();
}

function AddPersonalData(Obj1, FIO, dateofbirth){
    let Obj2 = new UserInfo(FIO, dateofbirth);
    Obj2.username = Obj1.username;
    Obj2.addToData();
    console.log("Added personal data to", Obj2.username);
}

function CommentSmt(Obj1, text, relatedTopickId) {
    let Obj2 = new Comment(Obj1.username, text, relatedTopickId);
    Obj2.addToData();
}

function WriteArticle(Obj1, title, text) {
    let Obj2 = new Article(Obj1.username, title, text);
    Obj2.addToData();
}



CreateUser( "Anby", "555@AccountData.com", 1234);
//console.log(AnbyD)

AddPersonalData(AccountData.get("Anby"), 'AD', 20);
UserData.get("Anby").ChangeAboutMe("Hamburger");
//console.log(AnbyInfo)

WriteArticle(AccountData.get("Anby"),  "Last Film", "It was great. Ending especially");

//console.log(ArticleData)
CommentSmt(AccountData.get("Anby"), "Doubles", 0);






CreateUser( "Bob", "678@AccountData.com", 4321);
AddPersonalData(AccountData.get("Bob"), 'BB', 100);
WriteArticle(AccountData.get("Bob"), "Bed film", "It was boring. Ending especially");



/* ArticleData.forEach((value) =>{
    if (value.username == "Anby" && value.title == "Last Film"){
        article1 = value.id;
    }
    if (value.username == "Bob" && value.title == "bed Film"){
        article2 = value.id;
    }
}) */

function FindId(username, title) {
    let articleid 
    articleid = ArticleIndex[username].find((value) =>{ 
        return ArticleData.get(value).title == title    
    })
    return articleid
}

let article1 = FindId('Anby', "Last Film");

let article2 = FindId('Bob', "Bed film");

//console.log(article1)
//console.log(article2)

CommentSmt(AccountData.get("Bob"), "Never!", article1);
CommentSmt(AccountData.get("Anby"), "Nah, it was good!", article2);

CommentSmt(AccountData.get("Bob"), "2!", article2);
CommentSmt(AccountData.get("Anby"), "1!", article1);
CommentSmt(AccountData.get("Bob"), "1!", article1);
CommentSmt(AccountData.get("Anby"), "2", article2);
CommentSmt(AccountData.get("Bob"), "2!", article2);
CommentSmt(AccountData.get("Anby"), "11!", article1);

CommentSmt(AccountData.get("Anby"), "1!", article1);
CommentSmt(AccountData.get("Anby"), "2", article2);
CommentSmt(AccountData.get("Bob"), "2!", article2);
CommentSmt(AccountData.get("Bob"), "1!", article1);

//console.log(UserData.get("Anby"))
//console.log(ArticleData.get(1))
//console.log(CommentData.get(1))

//AnbyD.readUserAccount()
//AnbyD.readUserInfo()
//AnbyComment.readComment()

//AnbyD.readAllArticles()
//Bob.readAllArticles()
//AnbyArticle.readAllComments()

//AccountData.get("Anby").userSummary()
//AccountData.get("Bob").userSummary()

//ArticleData.get(1).readAllComments()
//console.log({AccountData, UserData, ArticleData, CommentData})




function returnAllComments(inputedId) {
    const output = [];
    CommentIndex[inputedId].forEach((value) =>{
        let Comment = {
            username: CommentData.get(value).username,
            text: CommentData.get(value).text
        }
        output.push(Comment)
    }
    )
    return output;
}


function returnAllArticles(inputedUser) {
    const output = [];
    console.log(ArticleIndex[inputedUser.username])
    ArticleIndex[inputedUser.username].forEach((value) =>{
        let Article = {
            username: inputedUser.username,
            title: ArticleData.get(value).title,
            text: ArticleData.get(value).text,
            comments: returnAllComments(ArticleData.get(value).id)
        }
        output.push(Article)
    }
    )
    return output;
}

function returnUser(inputedUser) {
    const output = {
        username: inputedUser.username,
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

//let tryer = returnUser(AccountData.get("Anby"))

//.log(tryer, '\n')
//console.log(tryer.articles, '\n')
//console.log(tryer.articles[0].comments)

//console.log(returnUser(AccountData.get("Anby")))
//console.log(returnAllUsers())

module.exports = {CreateUser, AddPersonalData, WriteArticle, CommentSmt, FindId, returnAllComments, returnUser,returnAllArticles, returnAllUsers}