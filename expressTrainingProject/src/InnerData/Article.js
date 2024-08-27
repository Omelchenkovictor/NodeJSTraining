let {AccountData, UserData, ArticleData, CommentData, commentCounter, articleCounter, ArticleIndex, CommentIndex, CommentIndexByUser} = require('./Data')
const UserAccount = require('./UserAccount')



class Article {
    //id = undefined
    constructor(username, title, text){
        this.username = username,
        this.text = text,
        this.title = title
    }

    ArticleIndexAdd(user){
        if (!ArticleIndex[user.username]){
            ArticleIndex[user.username] = [];
        }
        ArticleIndex[user.username].push(this.id);
    };

    addToData(){
        this.id = articleCounter++;
        ArticleData.set(this.id, this);
        this.ArticleIndexAdd(AccountData.get(this.username))
    }

    getUsername(){
        return this.username;
    }
    getText(){
        return this.text;
    }
    getTitle(){
        return this.title;
    }
    readArticle(){
        console.log(this.title, "\n", this.text, "\n by", this.username);
    }

    readAllComments() {
        this.readArticle();
        let article = this.id;
        CommentIndex[this.id].forEach((value) =>{
            CommentData.get(value).readComment();
        })
    }
}

module.exports = Article;