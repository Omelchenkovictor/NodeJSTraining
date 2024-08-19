const {AccountData, UserData, ArticleData, CommentData} = require('./Data');
const UserAccount = require('./UserAccount');
const UserInfo = require('./UserInfo');
const Comment = require('./Comment');
const Article = require('./Article');

function CreateUser(username, email, password)  {
        let Obj = new UserAccount(username, email, password);
        Obj.addToData();
        return Obj;
}

function AddPersonalData(Obj1, FIO, dateofbirth){
    let Obj2 = new UserInfo(FIO, dateofbirth);
    Obj2.username = Obj1.username;
    Obj2.addToData();
    console.log("Added personal data to", Obj2.username);
    return Obj2;
}

function CommentSmt(Obj1, text, commentUp) {
    let Obj2 = new Comment(Obj1.username, text, commentUp);
    Obj2.addToData();
    return Obj2;
}

function WriteArticle(Obj1, title, text) {
    let Obj2 = new Article(Obj1.username, title, text);
    Obj2.addToData();
    return Obj2;
}



let AnbyD
let AnbyInfo
let AnbyComment
let AnbyComment2
let AnbyArticle

AnbyD = CreateUser( "Anby", "555@AccountData.com", 1234);
//console.log(AnbyD)

AnbyInfo = AddPersonalData(AnbyD, 'AD', 1);
AnbyInfo.ChangeAboutMe("Hamburger");
//console.log(AnbyInfo)

AnbyArticle = WriteArticle(AnbyD,  "Last Film", "It was great. Ending especially");
AnbyComment = CommentSmt(AnbyD, "Doubles", AnbyArticle);




let Bob
let BobArticle
let BobComment
Bob = CreateUser( "Bob", "678@AccountData.com", 4321);
BobArticle = WriteArticle(Bob, "Bed film", "It was boring. Ending especially")
BobComment = CommentSmt(Bob, "Never!", AnbyArticle);
AnbyComment2 = CommentSmt(AnbyD, "Nah, it was good!", BobArticle);
//console.log(UserData.get("Anby"))
//console.log(ArticleData.get(1))
//console.log(CommentData.get(1))

//AnbyD.readUserAccount()
//AnbyD.readUserInfo()
//AnbyComment.readComment()

//AnbyD.readAllArticles()
//Bob.readAllArticles()
//AnbyArticle.readAllComments()

AnbyD.userSummary()
  