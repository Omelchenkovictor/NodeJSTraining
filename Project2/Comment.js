let {AccountData, UserData, ArticleData, CommentData, commentCounter, articleCounter, ArticleIndex, CommentIndex, CommentIndexByUser} = require('./Data')
const UserAccount = require('./UserAccount')


class Comment {
    //id = undefined
    constructor(username, text, relatedTopickId){
        this.username = username,
        this.text = text,
        this.relatedTopickId = relatedTopickId
    }

    CommentIndexAdd(article, user){
        if (!CommentIndex[article.id]){
            CommentIndex[article.id] = [];
        }
        CommentIndex[article.id].push(this.id);

        if (!CommentIndexByUser[user.username]){
            CommentIndexByUser[user.username] = [];
        }
        CommentIndexByUser[user.username].push(this.id);
    };

    addToData(){
        this.id = commentCounter++;
        CommentData.set(this.id, this);
        this.CommentIndexAdd(ArticleData.get(this.relatedTopickId), AccountData.get(this.username))
    }

    getUsername(){
        return this.username;
    }
    getText(){
        return this.text;
    }
    getCommentUp(){
        return this.relatedTopickId;
    }

    readComment(){
        console.log(this.username, ":", this.text);
    }
}

module.exports = Comment;